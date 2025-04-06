
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

interface LocationState {
  email?: string;
}

export default function VerifyEmail() {
  const location = useLocation();
  const { email } = (location.state as LocationState) || {};
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MailCheck className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Verifique seu email</CardTitle>
          <CardDescription className="text-center mt-2">
            Enviamos um link de confirmação para
            {email ? (
              <span className="font-semibold block mt-1">{email}</span>
            ) : (
              " seu endereço de email"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Clique no link de verificação que enviamos para ativar sua conta e começar a acessar os cursos.
          </p>
          <p className="text-sm text-gray-500">
            Se não encontrar o email, verifique sua pasta de spam.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/sign-in">Voltar para o login</Link>
          </Button>
          <div className="text-center text-sm">
            Não recebeu o email?{" "}
            <button className="text-Excel-blue hover:underline font-semibold">
              Reenviar email
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
