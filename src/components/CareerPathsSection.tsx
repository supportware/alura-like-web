import React, { useState, useEffect, useCallback } from 'react';
import { careerPathCategories } from '@/data/careerPathsData';
import CareerCategory from './career-paths/CareerCategory';
import { fetchActiveCareerPaths, CareerPath } from '@/services/supabase';
import { Loader2, Code, PenTool, BarChart, Users, Briefcase, Cloud, Smartphone, Shield, Server } from 'lucide-react';

const CareerPathsSection = () => {
  const [tracks, setTracks] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTracks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchActiveCareerPaths();
      // Ordenar as trilhas por ordem
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setTracks(sortedData);
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
        image: track.image_path || `/trilhas/Trilhas${Math.floor(Math.random() * 18) + 1}-1024x340-essencial.webp`
      }))
    };
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <img 
            src="/trilhas/Trilhas-Evolua.webp.png" 
            alt="Trilhas de Cursos por Carreira" 
            className="max-w-full h-auto"
            style={{ maxHeight: '150px' }}
          />
        </div>
        
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
