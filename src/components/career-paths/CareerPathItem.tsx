
import React, { useState } from 'react';
import { CarouselItem } from "@/components/ui/carousel";

interface CareerPathItemProps {
  image: string;
  title: string;
  index: number;
}

const CareerPathItem = ({ image, title, index }: CareerPathItemProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image for "${title}": ${image}`);
    setImageError(true);
  };

  return (
    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
      <div className="overflow-hidden rounded-lg shadow-lg h-full cursor-pointer transition-transform duration-300 hover:scale-105">
        {!imageError ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            style={{ aspectRatio: '16/9' }}
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 w-full h-full" style={{ aspectRatio: '16/9' }}>
            <p className="text-gray-600 font-medium text-center p-4">{title}</p>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
          <h3 className="text-white font-medium text-sm md:text-base">{title}</h3>
        </div>
      </div>
    </CarouselItem>
  );
};

export default CareerPathItem;
