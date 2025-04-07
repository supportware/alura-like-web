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
        image: 'lovable-uploads/05197587-8a90-4957-933b-a82fa93c8014.png'
      },
      {
        title: 'Planilhas',
        icon: FileSpreadsheet,
        color: 'bg-yellow-100',
        image: 'lovable-uploads/239b6a9e-b89b-4525-b510-275c558d40de.png'
      },
      {
        title: 'Jogos Educativos',
        icon: Blocks,
        color: 'bg-orange-100',
        image: 'lovable-uploads/fb8f16fe-f31d-4c40-b982-538cc387d56e.png'
      },
      {
        title: 'Matemática',
        icon: Calculator,
        color: 'bg-red-100',
        image: 'lovable-uploads/3216ab7a-0ca1-4040-a598-07fec8ba8fa4.png'
      },
      {
        title: 'Idiomas',
        icon: Languages,
        color: 'bg-blue-100',
        image: 'lovable-uploads/f7b54e08-5975-481c-900f-be9dd1abddc7.png'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'lovable-uploads/93b9581f-ac4d-487e-9edf-613303560780.png'
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
        image: 'lovable-uploads/6fe84a5a-232f-4744-b143-895b6fb89228.png'
      },
      {
        title: 'Games',
        icon: Gamepad2,
        color: 'bg-yellow-100',
        image: 'lovable-uploads/4facc3ff-4a86-4058-b5d1-50f8fe07f172.png'
      },
      {
        title: 'UI/UX & Design',
        icon: Figma,
        color: 'bg-blue-100',
        image: 'lovable-uploads/427b11a1-7f1b-414a-bc12-d094defed121.png'
      },
      {
        title: 'Mobile',
        icon: Smartphone,
        color: 'bg-purple-100',
        image: 'lovable-uploads/c675d8a6-8ac9-41ac-b5ec-ca0408124b8b.png'
      },
      {
        title: 'Inteligência Artificial',
        icon: BrainCircuit,
        color: 'bg-pink-100',
        image: 'lovable-uploads/485396f3-f7c4-4db8-9e34-095aad9e245c.png'
      },
      {
        title: 'Robótica',
        icon: Bot,
        color: 'bg-indigo-100',
        image: 'lovable-uploads/29f4e556-43a9-4aae-9e6b-59bdfe1fe1db.png'
      },
      {
        title: 'Modelagem 3D',
        icon: Blocks,
        color: 'bg-green-100',
        image: 'lovable-uploads/46caaada-c1df-4fd9-9587-d3ca4bd4b829.png'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'lovable-uploads/93b9581f-ac4d-487e-9edf-613303560780.png'
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
        image: 'lovable-uploads/d6306b74-5efa-4eb7-bec2-9366d8e8d6c2.png'
      },
      {
        title: 'Marketing Digital',
        icon: BarChart3,
        color: 'bg-red-100',
        image: 'lovable-uploads/511154ec-20e2-4e08-a6fd-accbc64d1942.png'
      },
      {
        title: 'Atendimento',
        icon: HeadphonesIcon,
        color: 'bg-orange-100',
        image: 'lovable-uploads/fdb8bfd1-b524-457b-8f65-0a0aaeca5da3.png'
      },
      {
        title: 'Análise de dados',
        icon: AreaChart,
        color: 'bg-blue-100',
        image: 'lovable-uploads/7610a6fd-f9a3-4699-a75d-c286453efa74.png'
      },
      {
        title: 'Produção de Conteúdo',
        icon: Pen,
        color: 'bg-pink-100',
        image: 'lovable-uploads/373230be-78bc-4695-87c9-fe422269d1f7.png'
      },
      {
        title: 'Finanças',
        icon: Cog,
        color: 'bg-green-100',
        image: 'lovable-uploads/8a95dc8b-6141-41c9-bdc3-570ddf7b97f2.png'
      },
      {
        title: 'Videomaker',
        icon: Video,
        color: 'bg-blue-100',
        image: 'lovable-uploads/fdb8bfd1-b524-457b-8f65-0a0aaeca5da3.png'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: 'lovable-uploads/93b9581f-ac4d-487e-9edf-613303560780.png'
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
              
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: 1
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {category.paths.map((path, pathIndex) => (
                    <CarouselItem key={pathIndex} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="overflow-hidden rounded-lg shadow-lg h-full cursor-pointer transition-transform duration-300 hover:scale-105">
                        <img 
                          src={path.image} 
                          alt={path.title}
                          className="w-full h-full object-cover"
                          style={{ aspectRatio: '16/9' }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900/50 text-white hover:bg-gray-900/80 border-none" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-gray-900/50 text-white hover:bg-gray-900/80 border-none" />
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
