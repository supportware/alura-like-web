
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: 1,
    title: 'React: desenvolvendo com JavaScript',
    instructor: 'Paulo Silveira',
    level: 'Intermediário',
    hours: 16,
    image: 'https://via.placeholder.com/300x180?text=React+JS',
    category: 'Front-end',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    title: 'Python para Data Science',
    instructor: 'Guilherme Lima',
    level: 'Iniciante',
    hours: 12,
    image: 'https://via.placeholder.com/300x180?text=Python',
    category: 'Data Science',
    badgeColor: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    title: 'UX Design: pesquisa com usuários',
    instructor: 'Natan Santos',
    level: 'Avançado',
    hours: 20,
    image: 'https://via.placeholder.com/300x180?text=UX+Design',
    category: 'UX & Design',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 4,
    title: 'Java: Orientação a Objetos',
    instructor: 'Paulo Silveira',
    level: 'Intermediário',
    hours: 16,
    image: 'https://via.placeholder.com/300x180?text=Java+OO',
    category: 'Programação',
    badgeColor: 'bg-red-100 text-red-800'
  }
];

const CoursesSection = () => {
  return (
    <section className="py-16 bg-alura-gray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-alura-black">Cursos em destaque</h2>
          <a href="#" className="text-alura-blue hover:underline">Ver todos os cursos</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="course-card overflow-hidden border-none">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-5">
                <Badge className={`mb-3 font-normal ${course.badgeColor}`}>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
