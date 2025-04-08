import React, { useState, useEffect, useCallback } from 'react';
import { careerPathCategories } from '@/data/careerPathsData';
import CareerCategory from './career-paths/CareerCategory';
import { fetchCareerPaths, CareerPath } from '@/services/supabase';
import { Loader2, Code, PenTool, BarChart, Users, Briefcase, Cloud, Smartphone, Shield, Server } from 'lucide-react';

const CareerPathsSection = () => {
  const [tracks, setTracks] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTracks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCareerPaths();
      setTracks(data);
    } catch (error) {
      console.error('Error loading career paths:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  // Função auxiliar para obter o componente de ícone correto
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code;
      case 'pen-tool': return PenTool;
      case 'bar-chart': return BarChart;
      case 'users': return Users;
      case 'briefcase': return Briefcase;
      case 'cloud': return Cloud;
      case 'smartphone': return Smartphone;
      case 'shield': return Shield;
      case 'server': return Server;
      default: return Code;
    }
  };

  // Formatar dados para o formato esperado pelo componente CareerCategory
  const formatTracksForDisplay = () => {
    return {
      category: "Trilhas de Carreira",
      paths: tracks.map(track => ({
        title: track.title,
        icon: getIconComponent(track.icon),
        color: 'bg-green-100',
        image: `/trilhas/Trilhas${Math.floor(Math.random() * 18) + 1}-1024x340-essencial.webp`
      }))
    };
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Trilhas de Cursos por Carreira
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        ) : (
          <div className="space-y-12">
            {tracks.length > 0 ? (
              <CareerCategory 
                category={formatTracksForDisplay().category}
                paths={formatTracksForDisplay().paths}
              />
            ) : (
              // Fallback para os dados estáticos se não houver trilhas no banco de dados
              careerPathCategories.map((category, catIndex) => (
                <CareerCategory
                  key={catIndex}
                  category={category.category}
                  paths={category.paths}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerPathsSection;
