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
  // 4. Novo estado para controlar o dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function fetchTransactions() {
    try {
      // Chamada para o nosso handler GET do MSW
      const response = await axios.get("/api/transactions");
      setTransactions(response.data); // Armazena os dados no nosso estado
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  }

  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  // 4. Usar useEffect para buscar os dados quando o componente montar
  useEffect(() => {
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <TransactionForm
                onTransactionCreated={fetchTransactions}
                onCloseDialog={() => setIsDialogOpen(false)}
              />{" "}
              {/* <<< O formulário de verdade! */}
            </DialogContent>
          </Dialog>
          {/* --- Fim da Alteração do Dialog --- */}
        </header>

        {/* 2. DASHBOARD */}
        <main className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Receitas</CardTitle>
                {/* Ícone de Seta para cima */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-emerald-500"
                >
                  <path d="M12 5v14" />
                  <path d="m17 10-5-5-5 5" />
                </svg>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {totals.income.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Despesas</CardTitle>
                {/* Ícone de Seta para baixo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-red-500"
                >
                  <path d="M12 19V5" />
                  <path d="m5 14 7 7 7-7" />
                </svg>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {totals.expense.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saldo</CardTitle>
                {/* Ícone de Saldo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-zinc-500"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {balance.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
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
