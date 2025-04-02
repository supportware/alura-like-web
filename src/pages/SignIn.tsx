
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
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export default function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here we would normally connect to an authentication API
    // For demo, we'll just simulate a successful login
    console.log(values);
    
    setTimeout(() => {
      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para a página inicial.",
      });
      
      // Store user state in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({ email: values.email, isLoggedIn: true }));
      
      // Redirect to home page
      navigate('/');
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          <CardDescription className="text-center">
            Acesse sua conta para começar a aprender
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link to="/forgot-password" className="text-alura-blue hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/sign-up" className="text-alura-blue hover:underline">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
