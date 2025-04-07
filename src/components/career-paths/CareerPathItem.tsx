
import React from 'react';
import { CarouselItem } from "@/components/ui/carousel";

interface CareerPathItemProps {
  image: string;
  title: string;
  index: number;
}

const CareerPathItem = ({ image, title, index }: CareerPathItemProps) => {
  return (
    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
      <div className="overflow-hidden rounded-lg shadow-lg h-full cursor-pointer transition-transform duration-300 hover:scale-105">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          style={{ aspectRatio: '16/9' }}
        />
      </div>
    </CarouselItem>
  );
};

export default CareerPathItem;
