// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Um handler de exemplo. Se a gente pedir a URL /test, ele responde com uma mensagem.
  http.get('/test', () => {
    return HttpResponse.json({ message: 'MSW is working!' })
  }),
]