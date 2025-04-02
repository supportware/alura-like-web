
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Gamepad2, 
  BarChart3, 
  Figma, 
  BrainCircuit, 
  Terminal, 
  Languages, 
  Calculator, 
  Heart, 
  Bot, 
  BarChartHorizontal, 
  AreaChart, 
  Smartphone, 
  Cog 
} from 'lucide-react';

const careerPaths = [
  {
    title: 'Essencial',
    icon: BarChart3,
    color: 'bg-blue-100'
  },
  {
    title: 'Game',
    icon: Gamepad2,
    color: 'bg-purple-100'
  },
  {
    title: 'Administração',
    icon: BarChartHorizontal,
    color: 'bg-green-100'
  },
  {
    title: 'UI UX & Design',
    icon: Figma,
    color: 'bg-pink-100'
  },
  {
    title: 'Inteligência Artificial',
    icon: BrainCircuit,
    color: 'bg-indigo-100'
  },
  {
    title: 'Programação',
    icon: Terminal,
    color: 'bg-yellow-100'
  },
  {
    title: 'Idiomas',
    icon: Languages,
    color: 'bg-blue-100'
  },
  {
    title: 'Matemática',
    icon: Calculator,
    color: 'bg-red-100'
  },
  {
    title: 'Inteligência Emocional',
    icon: Heart,
    color: 'bg-rose-100'
  },
  {
    title: 'Robótica',
    icon: Bot,
    color: 'bg-gray-100'
  },
  {
    title: 'Marketing Digital',
    icon: BarChart3,
    color: 'bg-orange-100'
  },
  {
    title: 'Análise de dados',
    icon: AreaChart,
    color: 'bg-cyan-100'
  },
  {
    title: 'SmartPhones',
    icon: Smartphone,
    color: 'bg-teal-100'
  },
  {
    title: 'Automações',
    icon: Cog,
    color: 'bg-slate-100'
  }
];

const CareerPathsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Trilhas de Cursos por Carreira
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {careerPaths.map((path, index) => (
            <Card key={index} className="category-card border hover:cursor-pointer">
              <CardContent className="p-6 flex items-start">
                <div className={`${path.color} p-3 rounded-full mr-4`}>
                  <path.icon className="h-6 w-6 text-alura-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{path.title}</h3>
                  <p className="text-alura-darkgray text-sm mt-1">Explore a trilha</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
