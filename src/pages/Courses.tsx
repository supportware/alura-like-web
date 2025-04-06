
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from 'lucide-react';
import { fetchCourses, Course } from '@/services/supabase';

const categories = ['Todos', 'Front-end', 'Data Science', 'UX & Design', 'Programação', 'Administração', 'Marketing Digital', 'Idiomas'];
const levels = ['Iniciante', 'Intermediário', 'Avançado'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [maxHours, setMaxHours] = useState(20);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
      setLoading(false);
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    // Filter by search term
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    
    // Filter by level
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    
    // Filter by hours
    const matchesHours = course.hours <= maxHours;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesHours;
  });

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(item => item !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-alura-gray py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-alura-black">Todos os cursos</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="lg:w-1/4 bg-white p-6 rounded-lg h-fit">
                <h2 className="font-bold text-xl mb-6">Filtros</h2>
                
                <div className="mb-6">
                  <p className="font-medium mb-3">Categoria</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="text-sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-medium mb-3">Nível</p>
                  <div className="space-y-2">
                    {levels.map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`level-${level}`} 
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => handleLevelChange(level)}
                        />
                        <Label htmlFor={`level-${level}`}>{level}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-medium mb-3">Carga horária máxima: {maxHours}h</p>
                  <Slider 
                    value={[maxHours]} 
                    min={1} 
                    max={20} 
                    step={1} 
                    onValueChange={(value) => setMaxHours(value[0])}
                  />
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:w-3/4">
                <div className="bg-white p-4 rounded-lg mb-6 flex items-center gap-3">
                  <Input 
                    placeholder="Buscar por título ou instrutor..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                  <Button className="bg-alura-blue">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-alura-blue" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <Card key={course.id} className="course-card overflow-hidden border-none">
                          <div className="relative">
                            <img 
                              src={course.image_url} 
                              alt={course.title} 
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <CardContent className="p-5">
                            <Badge className={`mb-3 font-normal ${course.badge_color}`}>
                              {course.category}
                            </Badge>
                            <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                            <p className="text-alura-darkgray text-sm">{course.instructor}</p>
                          </CardContent>
                          <CardFooter className="px-5 pb-5 pt-0 flex justify-between text-sm text-alura-darkgray">
                            <span>{course.level}</span>
                            <span>{course.hours}h</span>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full py-10 text-center">
                        <p className="text-alura-darkgray text-lg">Nenhum curso encontrado com os filtros selecionados.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
