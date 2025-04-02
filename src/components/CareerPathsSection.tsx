
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

// Reorganized career paths with Innovation paths distributed to other categories
const careerPathCategories = [
  {
    category: "Educação",
    paths: [
      {
        title: 'Essencial',
        icon: BarChart3,
        color: 'bg-blue-100',
        image: 'photo-1509316975850-ff9c5deb0cd9'
      },
      {
        title: 'Matemática',
        icon: Calculator,
        color: 'bg-red-100',
        image: 'photo-1518495973542-4542c06a5843'
      },
      {
        title: 'Idiomas',
        icon: Languages,
        color: 'bg-blue-100',
        image: 'photo-1469474968028-56623f02e42e'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'photo-1470071459604-3b5ec3a7fe05'
      }
    ]
  },
  {
    category: "Tecnologia",
    paths: [
      {
        title: 'Programação',
        icon: Terminal,
        color: 'bg-yellow-100',
        image: 'photo-1498050108023-c5249f4df085'
      },
      {
        title: 'Game',
        icon: Gamepad2,
        color: 'bg-purple-100',
        image: 'photo-1487887235947-a955ef187fcc'
      },
      {
        title: 'UI UX & Design',
        icon: Figma,
        color: 'bg-pink-100',
        image: 'photo-1460574283810-2aab119d8511'
      },
      {
        title: 'SmartPhones',
        icon: Smartphone,
        color: 'bg-teal-100',
        image: 'photo-1434494878577-86c23bcb06b9'
      },
      {
        title: 'Inteligência Artificial',
        icon: BrainCircuit,
        color: 'bg-indigo-100',
        image: 'photo-1485827404703-89b55fcc595e'
      },
      {
        title: 'Robótica',
        icon: Bot,
        color: 'bg-gray-100',
        image: 'photo-1581091226825-a6a2a5aee158'
      },
      {
        title: 'Automações',
        icon: Cog,
        color: 'bg-slate-100',
        image: 'photo-1526374965328-7f61d4dc18c5'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'photo-1470071459604-3b5ec3a7fe05'
      }
    ]
  },
  {
    category: "Negócios",
    paths: [
      {
        title: 'Administração',
        icon: BarChartHorizontal,
        color: 'bg-green-100',
        image: 'photo-1486312338219-ce68d2c6f44d'
      },
      {
        title: 'Marketing Digital',
        icon: BarChart3,
        color: 'bg-orange-100',
        image: 'photo-1581090464777-f3220bbe1b8b'
      },
      {
        title: 'Análise de dados',
        icon: AreaChart,
        color: 'bg-cyan-100',
        image: 'photo-1488590528505-98d2b5aba04b'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'photo-1470071459604-3b5ec3a7fe05'
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
                        <CardContent className="p-0">
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={`https://images.unsplash.com/${path.image}`} 
                              alt={path.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className={`${path.color} p-3 rounded-full mr-4`}>
                                <path.icon className="h-6 w-6 text-alura-blue" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{path.title}</h3>
                                <p className="text-alura-darkgray text-sm mt-1">Explore a trilha</p>
                              </div>
                            </div>
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
