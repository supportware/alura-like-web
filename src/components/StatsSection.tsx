
import React from 'react';
import { BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award } from 'lucide-react';

const stats = [
  {
    title: 'Cursos',
    value: '1.500+',
    icon: BookOpen,
    description: 'cursos disponíveis'
  },
  {
    title: 'Alunos',
    value: '850K+',
    icon: Users,
    description: 'alunos formados'
  },
  {
    title: 'Avaliações',
    value: '95%',
    icon: ThumbsUp,
    description: 'avaliações positivas'
  },
  {
    title: 'Prêmios',
    value: '32',
    icon: Trophy,
    description: 'prêmios recebidos'
  },
  {
    title: 'Bolsas',
    value: '5.000+',
    icon: GraduationCap,
    description: 'bolsas integrais'
  },
  {
    title: 'Parcerias',
    value: '250+',
    icon: Award,
    description: 'bolsas parciais'
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-alura-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Alura em números
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center">
              <div className="bg-alura-blue rounded-full p-4 mr-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-alura-black">{stat.value}</h3>
                <p className="text-alura-darkgray">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
