import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { TransactionForm } from "./components/TransactionForm";
import { useState, useEffect } from "react"; // 1. Importar hooks
import axios from "axios"; // 2. Importar axios

// Vamos definir o formato de uma transação para usar com o TypeScript
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
}

function App() {
  // 3. Criar o estado para armazenar as transações
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 4. Usar useEffect para buscar os dados quando o componente montar
  useEffect(() => {
    async function fetchTransactions() {
      try {
        // Chamada para o nosso handler GET do MSW
        const response = await axios.get("/api/transactions");
        setTransactions(response.data); // Armazena os dados no nosso estado
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, []); // O array vazio [] garante que esta função rode APENAS UMA VEZ

  return (
    // Container pricipal com fundo escuro e texto branco
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      {/* Usamos um container com largura máxima para centralizar o conteúdo */}
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 1. HEADER */}
        <header className=" flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-50">FinanZero</h1>
          {/* --- Início da Alteração do Dialog --- */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Nova Transação</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
                <DialogDescription>
                  Adicione uma nova receita ou despesa.
                </DialogDescription>
              </DialogHeader>
              <TransactionForm /> {/* <<< O formulário de verdade! */}
            </DialogContent>
          </Dialog>
          {/* --- Fim da Alteração do Dialog --- */}
        </header>

        {/* 2. DASHBOARD */}
        <main className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ 5.000,00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ 1.250,50</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ 3.749,50</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Transações */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell
                        className={
                          transaction.type === "income"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell className="capitalize">
                        {transaction.type === "income" ? "receita" : "despesa"}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default App;
