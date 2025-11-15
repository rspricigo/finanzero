// src/components/TransactionForm.tsx
"use client"; // Diretiva necessária para o React Hook Form

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/transactionSchema";

import type { FormValues } from "@/schemas/transactionSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TransactionForm() {
  // 1. O useForm usa o FormValues (onde amount é string)
  const form = useForm<FormValues>({
    // 2. O resolver usa o formSchema (o que valida strings)
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0, // << Agora 100% compatível
      type: undefined,
    },
  });

  // 3. O onSubmit recebe os dados FINAIS E TRANSFORMADOS
  async function onSubmit(data: FormValues) {
    try {
      // Nós explicitamente rodamos a transformação aqui
      // const finalData: TransactionFormData = transactionSchema.parse(data);

      console.log("DADOS FINAIS E PRONTOS:", data);
      console.log("Tipo do amount:", typeof data.amount); // Vai ser "number"
      console.log("Enviando para a API:", data);

      await axios.post("/api/transactions", data);

      alert("Transação salva com sucesso!");
    } catch (error) {
      console.error("Erro na transformação final:", error);
      alert("Ops! Algo deu errado. Tente novamente.");
    }
  }

  return (
    // O componente <Form> do Shadcn já faz toda a conexão
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Campo Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Salário"
                  {...field}
                  value={field.value === undefined ? "" : String(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Valor */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 5000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Tipo */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar Transação</Button>
      </form>
    </Form>
  );
}
