
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { fetchCourses, Course } from '@/services/supabase';
import { Loader2 } from 'lucide-react';

const CoursesSection = () => {
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

  return (
    <section className="py-16 bg-Excel-gray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-Excel-black">Cursos em destaque</h2>
          <a href="/courses" className="text-Excel-blue hover:underline">Ver todos os cursos</a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-Excel-blue" />
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {courses.map((course) => (
                <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <Card className="course-card overflow-hidden border-none h-full">
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
                      <p className="text-Excel-darkgray text-sm">{course.instructor}</p>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-0 flex justify-between text-sm text-Excel-darkgray">
                      <span>{course.level}</span>
                      <span>{course.hours}h</span>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
