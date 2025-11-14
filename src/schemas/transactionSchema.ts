// src/schemas/transactionSchema.ts
import { z } from 'zod';

// 1. Schema para o formulário (o que o usuário digita)
export const formSchema = z.object({
    description: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres."),
    // Validamos como string, garantindo que pode ser convertido para número
    amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "O valor deve ser um número.",
    }),
    type: z.enum(['income', 'expense'], {error: (issue) => issue.input === undefined 
    ? "This field is required" 
    : "Not a string"}),
});

// 2. Schema final com a transformação
export const transactionSchema = formSchema.transform((data) => ({
    ...data,
    amount: parseFloat(data.amount),
}));


// 3. O tipo para a NOSSA APLICAÇÃO será o tipo final, transformado
export type TransactionFormData = z.infer<typeof transactionSchema>;

// 4. (Opcional, mas útil) O tipo para o FORMULÁRIO
export type FormValues = z.infer<typeof formSchema>;