
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import CareerPathItem from './CareerPathItem';
import { LucideIcon } from 'lucide-react';

interface CareerPath {
  title: string;
  icon: LucideIcon;
  color: string;
  image: string;
}

interface CareerCategoryProps {
  category: string;
  paths: CareerPath[];
}

const CareerCategory = ({ category, paths }: CareerCategoryProps) => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-6 text-white">{category}</h3>
      
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {paths.map((path, pathIndex) => (
            <CareerPathItem 
              key={pathIndex}
              image={path.image}
              title={path.title}
              index={pathIndex}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900/50 text-white hover:bg-gray-900/80 border-none" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-gray-900/50 text-white hover:bg-gray-900/80 border-none" />
      </Carousel>
    </div>
  );
};

export default CareerCategory;
