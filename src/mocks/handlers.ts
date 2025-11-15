// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

// Simulando um banco de dados em memória
const transactions = [
  { id: '1', description: 'Salário Mensal', amount: 5000, type: 'income' },
  { id: '2', description: 'Aluguel', amount: 1250, type: 'expense' },
]

export const handlers = [
  // Um handler de exemplo. Se a gente pedir a URL /test, ele responde com uma mensagem.
  http.get('/test', () => {
    return HttpResponse.json({ message: 'MSW is working!' })
  }),

    // Handler para obter transações
    http.get('/api/transactions', () => {
      return HttpResponse.json(transactions)
    }),

    // Handler para adicionar uma nova transação
    http.post('/api/transactions', async ({ request }) => {
      const newTransaction = await request.json()

      console.log('[MSW] Dados recebidos no servidor mock:', newTransaction)

      transactions.push({ 
      id: crypto.randomUUID(),
      ...newTransaction as any 
      })

      return new HttpResponse(null, { status: 201 })
    }),
]