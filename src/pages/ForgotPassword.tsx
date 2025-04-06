
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }),
});

export default function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here we would normally connect to an authentication API
    console.log(values);
    
    // Simulate password reset email
    setTimeout(() => {
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      
      // Redirect to login page after a brief delay
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Recuperar senha</CardTitle>
          <CardDescription className="text-center">
            Enviaremos um link para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Enviar link de recuperação</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Lembrou sua senha?{" "}
            <Link to="/sign-in" className="text-Excel-blue hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
