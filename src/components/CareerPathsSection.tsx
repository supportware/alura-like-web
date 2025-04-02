
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
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

// Agrupando as trilhas de carreira por categoria para criar carrosséis
const careerPathCategories = [
  {
    category: "Educação",
    paths: [
      {
        title: 'Essencial',
        icon: BarChart3,
        color: 'bg-blue-100'
      },
      {
        title: 'Matemática',
        icon: Calculator,
        color: 'bg-red-100'
      },
      {
        title: 'Idiomas',
        icon: Languages,
        color: 'bg-blue-100'
      }
    ]
  },
  {
    category: "Tecnologia",
    paths: [
      {
        title: 'Programação',
        icon: Terminal,
        color: 'bg-yellow-100'
      },
      {
        title: 'Game',
        icon: Gamepad2,
        color: 'bg-purple-100'
      },
      {
        title: 'UI UX & Design',
        icon: Figma,
        color: 'bg-pink-100'
      },
      {
        title: 'SmartPhones',
        icon: Smartphone,
        color: 'bg-teal-100'
      }
    ]
  },
  {
    category: "Negócios",
    paths: [
      {
        title: 'Administração',
        icon: BarChartHorizontal,
        color: 'bg-green-100'
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
      }
    ]
  },
  {
    category: "Inovação",
    paths: [
      {
        title: 'Inteligência Artificial',
        icon: BrainCircuit,
        color: 'bg-indigo-100'
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
        title: 'Automações',
        icon: Cog,
        color: 'bg-slate-100'
      }
    ]
  }
];

const CareerPathsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Trilhas de Cursos por Carreira
        </h2>
        
        <div className="space-y-12">
          {careerPathCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-alura-black">{category.category}</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {category.paths.map((path, pathIndex) => (
                    <CarouselItem key={pathIndex} className="md:basis-1/3 lg:basis-1/4">
                      <Card className="category-card border hover:cursor-pointer h-full">
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
