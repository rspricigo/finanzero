// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
// 1. Importamos o faker
import { faker } from '@faker-js/faker'

// --- Nosso Gerador de Banco de Dados Dinâmico ---

// Primeiro, vamos definir o formato de uma transação
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: Date;
}

// Criamos uma função que gera uma única transação aleatória
function createRandomTransaction(): Transaction {
  const type = faker.helpers.arrayElement(['income', 'expense'] as const);
  return {
    id: faker.string.uuid(), // Gera um ID único
    description: faker.finance.transactionDescription(), // Descrição realista
    amount: parseFloat(faker.finance.amount()), // Valor financeiro aleatório
    type: type,
    createdAt: faker.date.recent({ days: 30 }), // Data nos últimos 30 dias
  }
}

// 2. Criamos uma lista com 50 transações aleatórias
const transactions: Transaction[] = faker.helpers.multiple(createRandomTransaction, {
  count: 50,
})

// Ordenamos por data, da mais recente para a mais antiga
transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
// --- Fim do Gerador de Banco de Dados ---

export const handlers = [
  // Um handler de exemplo. Se a gente pedir a URL /test, ele responde com uma mensagem.
  http.get('/test', () => {
    return HttpResponse.json({ message: 'MSW is working!' })
  }),

  // Handler para obter transações
  http.get('/api/transactions', () => {
    return HttpResponse.json(transactions)
  }),

  // Handles para deletar transação
  http.delete('/api/transactions/:id', ({ params }) => {
    const { id } = params as { id: string }
    console.log(`[MSW] Deletando transação com ID: ${id}`);
    // Encontra o índice da transação a ser deletada
    const indexToDelete = transactions.findIndex(t => t.id === id);

    // Se não encontrar, retorna um erro
    if (indexToDelete === -1) {
      return new HttpResponse(null, { status: 404 }); // Not Found
    }
    // Remove a transação do nosso "banco de dados"
    transactions.splice(indexToDelete, 1);

    // Retorna uma resposta de sucesso sem conteúdo
    return new HttpResponse(null, { status: 204 }); // No Content
  }),

  // Handler para adicionar uma nova transação
  http.post('/api/transactions', async ({ request }) => {
    const newTransaction = await request.json() as Omit<Transaction, 'id' | 'createdAt'>

    console.log('[MSW] Dados recebidos no servidor mock:', newTransaction)

    const transactionWithId: Transaction = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      ...newTransaction
    }

    // Adiciona a nova transação no topo da lista
    transactions.unshift(transactionWithId)

    return new HttpResponse(null, { status: 201 })
  }),
]