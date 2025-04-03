
import React from 'react';
import { CheckCircle, Clock, PenTool, Monitor, Shield, School } from 'lucide-react';

const reasons = [
  {
    title: 'Escola com 28 anos de experiência',
    description: 'Mais de 28 anos de atuação no mercado educacional, com expertise comprovada.',
    icon: School
  },
  {
    title: 'Treinamento Individualizado',
    description: 'Conteúdo forjado por pedagogos e especialistas em cada área, com atenção personalizada.',
    icon: CheckCircle
  },
  {
    title: 'Acesso multiplataforma',
    description: 'Assista às aulas em qualquer dispositivo, quantas vezes quiser',
    icon: Monitor
  },
  {
    title: 'Certificados válidos',
    description: 'Certificados reconhecidos pelo mercado de trabalho para impulsionar sua carreira',
    icon: Shield
  },
  {
    title: 'Professores especialistas',
    description: 'Aprenda com profissionais que atuam no mercado e conhecem as demandas reais',
    icon: PenTool
  },
  {
    title: 'Garantia de Aprendizado',
    description: 'Aulas e exercícios interativos, NÃO SÃO VÍDEO-AULAS. Metodologia prática e eficiente.',
    icon: Clock
  }
];

const WhyStudyWithUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-alura-black">
          Por que estudar conosco
        </h2>
        <p className="text-alura-darkgray text-lg text-center max-w-3xl mx-auto mb-12">
          Descubra como a Alura pode ajudar você a alcançar seus objetivos 
          de carreira e desenvolvimento profissional
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-alura-gray p-8 rounded-lg">
              <div className="text-alura-blue mb-4">
                <reason.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-alura-black">{reason.title}</h3>
              <p className="text-alura-darkgray">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudyWithUsSection;
