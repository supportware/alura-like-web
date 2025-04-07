
import React from 'react';
import { careerPathCategories } from '@/data/careerPathsData';
import CareerCategory from './career-paths/CareerCategory';

const CareerPathsSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Trilhas de Cursos por Carreira
        </h2>
        
        <div className="space-y-12">
          {careerPathCategories.map((category, catIndex) => (
            <CareerCategory
              key={catIndex}
              category={category.category}
              paths={category.paths}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
