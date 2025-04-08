import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { fetchCareerPaths, CareerPath } from '@/services/supabase';
import { Loader2, Code, PenTool, BarChart, Users, Briefcase, Cloud, Smartphone, Shield, Server } from 'lucide-react';

const TracksSection = () => {
  const [tracks, setTracks] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTracks = useCallback(async () => {
    setLoading(true);
    const data = await fetchCareerPaths();
    setTracks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  const getIconComponent = (iconName: string) => {
    const size = 36;
    switch (iconName) {
      case 'code': return <Code size={size} />;
      case 'pen-tool': return <PenTool size={size} />;
      case 'bar-chart': return <BarChart size={size} />;
      case 'users': return <Users size={size} />;
      case 'briefcase': return <Briefcase size={size} />;
      case 'cloud': return <Cloud size={size} />;
      case 'smartphone': return <Smartphone size={size} />;
      case 'shield': return <Shield size={size} />;
      case 'server': return <Server size={size} />;
      default: return <Code size={size} />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-Excel-black mb-4">Trilhas de Carreira</h2>
          <p className="text-Excel-darkgray max-w-2xl mx-auto">
            Escolha uma das nossas trilhas de aprendizado e avance sua carreira com um caminho estruturado para o sucesso.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-Excel-blue" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <Card key={track.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary mb-4">
                      {getIconComponent(track.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{track.title}</h3>
                    <p className="text-Excel-darkgray">{track.description}</p>
                    <a 
                      href={`/tracks/${track.id}`} 
                      className="mt-4 inline-flex items-center text-Excel-blue hover:text-Excel-darkblue"
                    >
                      Explorar trilha
                      <svg 
                        className="ml-2 w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TracksSection;
