
import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="hero-gradient text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Comece sua jornada de aprendizado hoje
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Acesso ilimitado a mais de 80 cursos, formações e projetos práticos para desenvolver suas habilidades e competências.
        </p>
        <Button className="bg-white text-Excel-blue hover:bg-gray-100 text-lg py-6 px-8">
          Comece agora
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
