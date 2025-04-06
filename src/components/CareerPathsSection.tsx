
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
  Cog,
  FileSpreadsheet,
  BookOpen,
  Video,
  Pen,
  HeadphonesIcon,
  Network,
  Blocks
} from 'lucide-react';

// Reorganized career paths with uploaded images
const careerPathCategories = [
  {
    category: "Educação",
    paths: [
      {
        title: 'Alfabetização',
        icon: BookOpen,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas3-1024x340-tecnologia-fundamental.webp'
      },
      {
        title: 'Planilhas',
        icon: FileSpreadsheet,
        color: 'bg-yellow-100',
        image: '/trilhas/Trilhas7-1024x340-contabel.webp'
      },
      {
        title: 'Jogos Educativos',
        icon: Blocks,
        color: 'bg-orange-100',
        image: '/trilhas/Trilhas4-1024x340-game1.webp'
      },
      {
        title: 'Matemática',
        icon: Calculator,
        color: 'bg-red-100',
        image: '/trilhas/Trilhas9-1024x340-finanças.webp'
      },
      {
        title: 'Idiomas',
        icon: Languages,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas18-1024x340-inglês.webp'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas1-1024x340-essencial.webp'
      }
    ]
  },
  {
    category: "Tecnologia",
    paths: [
      {
        title: 'Programação',
        icon: Terminal,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas15-1024x340-programacao.webp'
      },
      {
        title: 'Games',
        icon: Gamepad2,
        color: 'bg-yellow-100',
        image: '/trilhas/Trilhas5-1024x340-game2.webp'
      },
      {
        title: 'UI/UX & Design',
        icon: Figma,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas10-1024x340-designer.webp'
      },
      {
        title: 'Mobile',
        icon: Smartphone,
        color: 'bg-purple-100',
        image: '/trilhas/Trilhas14-1024x340-dev-apps.webp'
      },
      {
        title: 'Inteligência Artificial',
        icon: BrainCircuit,
        color: 'bg-pink-100',
        image: '/trilhas/Trilhas-Evolua.webp.png'
      },
      {
        title: 'Robótica',
        icon: Bot,
        color: 'bg-indigo-100',
        image: '/trilhas/Trilhas6-1024x340-game3d.webp'
      },
      {
        title: 'Modelagem 3D',
        icon: Blocks,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas12-1024x340-designer3d.webp'
      },
      {
        title: 'Web',
        icon: Network,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas13-1024x340-web.webp'
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
        image: '/trilhas/Trilhas-1024x310-workspace.webp'
      },
      {
        title: 'Marketing Digital',
        icon: BarChart3,
        color: 'bg-red-100',
        image: '/trilhas/Trilhas3-1024x340-tecnologia-fundamental.webp'
      },
      {
        title: 'Atendimento',
        icon: HeadphonesIcon,
        color: 'bg-orange-100',
        image: '/trilhas/Trilhas8-1024x340-rh.webp'
      },
      {
        title: 'Análise de dados',
        icon: AreaChart,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas9-1024x340-finanças.webp'
      },
      {
        title: 'Produção de Conteúdo',
        icon: Pen,
        color: 'bg-pink-100',
        image: '/trilhas/Trilhas11-1024x340-edicao-video.webp'
      },
      {
        title: 'Finanças',
        icon: Cog,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas9-1024x340-finanças.webp'
      },
      {
        title: 'Videomaker',
        icon: Video,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas11-1024x340-edicao-video.webp'
      },
      {
        title: 'Recursos Humanos',
        icon: Heart,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas8-1024x340-rh.webp'
      }
    ]
  }
];

const CareerPathsSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Trilhas de Cursos por Carreira
        </h2>
        
        <div className="space-y-12">
          {careerPathCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-white">{category.category}</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {category.paths.map((path, pathIndex) => (
                    <CarouselItem key={pathIndex} className="md:basis-1/3 lg:basis-1/4">
                      <Card className="hover:cursor-pointer h-full bg-black border-gray-800 hover:border-gray-600 transition-colors duration-300">
                        <CardContent className="p-0">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={path.image} 
                              alt={path.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/10 hover:bg-white/20 text-white border-gray-600" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/10 hover:bg-white/20 text-white border-gray-600" />
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
