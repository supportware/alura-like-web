
import React, { useEffect, useState } from 'react';
import { BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, Loader2 } from 'lucide-react';
import { fetchStats, Stat } from '@/services/supabase';

const StatsSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map icon strings to components
  const iconMap: Record<string, React.FC<any>> = {
    BookOpen: BookOpen,
    Users: Users,
    ThumbsUp: ThumbsUp,
    Trophy: Trophy,
    GraduationCap: GraduationCap,
    Award: Award,
  };

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const data = await fetchStats();
        console.log('Stats loaded:', data);
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Não foi possível carregar as estatísticas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const defaultStats = [
    {
      id: '1',
      title: 'Cursos',
      value: '1.500+',
      icon: 'BookOpen',
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      title: 'Alunos',
      value: '850K+',
      icon: 'Users',
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      title: 'Avaliações',
      value: '95%',
      icon: 'ThumbsUp',
      created_at: '',
      updated_at: ''
    },
    {
      id: '4',
      title: 'Prêmios',
      value: '32',
      icon: 'Trophy',
      created_at: '',
      updated_at: ''
    },
    {
      id: '5',
      title: 'Bolsas',
      value: '5.000+',
      icon: 'GraduationCap',
      created_at: '',
      updated_at: ''
    },
    {
      id: '6',
      title: 'Parcerias',
      value: '250+',
      icon: 'Award',
      created_at: '',
      updated_at: ''
    }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-16 bg-alura-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Alura em números
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center p-6 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayStats.map((stat) => {
              const IconComponent = iconMap[stat.icon] || BookOpen;
              
              return (
                <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                  <div className="bg-alura-blue rounded-full p-4 mr-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-alura-black">{stat.value}</h3>
                    <p className="text-alura-darkgray">{stat.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
