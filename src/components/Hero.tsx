
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Aprenda tecnologia com cursos online
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Comece com programação, UX, data science e muito mais. Evolua sua carreira com mais de 1.500 cursos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-Excel-blue hover:bg-gray-100 text-lg py-6 px-8">
              Conheça nossos cursos
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
              Para empresas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
