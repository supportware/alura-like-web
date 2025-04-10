import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchActiveSlides, Slide } from '@/services/supabase';
import { Loader2 } from 'lucide-react';

// Type for our default slides that are missing created_at and updated_at
type DefaultSlide = Omit<Slide, 'created_at' | 'updated_at'> & { created_at?: string, updated_at?: string };

// Default slides for the slideshow (used as fallback)
const defaultSlides: DefaultSlide[] = [
  {
    id: '1',
    title: "Aprenda tecnologia com cursos online",
    description: "Comece com programação, UX, data science e muito mais. Evolua sua carreira com mais de 80 cursos interativos.",
    image_base64: "/slideshow/slide1.webp",
    primary_button_text: "Conheça nossos cursos",
    secondary_button_text: "Para empresas",
    primary_button_url: "/courses",
    secondary_button_url: "/business",
    order: 0,
    active: true
  },
  {
    id: '2',
    title: "Trilhas de carreira customizadas",
    description: "Siga um caminho estruturado para dominar uma nova área com nossas trilhas de aprendizado.",
    image_base64: "/slideshow/slide2.webp",
    primary_button_text: "Ver trilhas",
    secondary_button_text: "Saiba mais",
    primary_button_url: "/#career-paths",
    secondary_button_url: "/about",
    order: 1,
    active: true
  },
  {
    id: '3',
    title: "Aprenda no seu ritmo",
    description: "Acesso ilimitado a todos os cursos, estude quando e onde quiser com material atualizado.",
    image_base64: "/slideshow/slide3.webp",
    primary_button_text: "Começar agora",
    secondary_button_text: "Ver planos",
    primary_button_url: "/sign-up",
    secondary_button_url: "/pricing",
    order: 2,
    active: true
  }
];

const HeroSlideshow = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [useDefaultSlides, setUseDefaultSlides] = useState(false);

  // Fetch slides from Supabase
  useEffect(() => {
    const loadSlides = async () => {
      setIsLoading(true);
      try {
        const data = await fetchActiveSlides();
        
        // If we have slides from the database, use them
        if (data && data.length > 0) {
          setSlides(data);
          setUseDefaultSlides(false);
        } else {
          // Otherwise fall back to default slides - add timestamps to make TypeScript happy
          const slidesWithDates = defaultSlides.map(slide => ({
            ...slide,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
          setSlides(slidesWithDates);
          setUseDefaultSlides(true);
        }
      } catch (error) {
        console.error('Error loading slides:', error);
        // Fall back to default slides on error - add timestamps to make TypeScript happy
        const slidesWithDates = defaultSlides.map(slide => ({
          ...slide,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        setSlides(slidesWithDates);
        setUseDefaultSlides(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadSlides();
  }, []);

  // Handle slideshow navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay || isLoading || slides.length === 0) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide, autoplay, isLoading, slides.length]);

  // Pause autoplay when user interacts with controls
  const handleUserInteraction = () => {
    setAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  if (isLoading) {
    return (
      <section className="relative h-[500px] md:h-[600px] bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </section>
    );
  }

  if (slides.length === 0) {
    return null; // Nothing to show
  }

  return (
    <section className="relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => {
          // Determine the image source based on what we have
          const imageSource = useDefaultSlides 
            ? slide.image_base64 // Default slides have paths stored in image_base64
            : slide.image_base64.startsWith('data:') 
              ? slide.image_base64 // Database slides have base64 data
              : `/slideshow/${slide.image_base64}`; // Or possibly a filename
              
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${imageSource})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 animate-fadeIn animation-delay-200">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
                    {slide.primary_button_text && (
                      <Button 
                        className="bg-white text-Excel-blue hover:bg-gray-100 text-lg py-6 px-8"
                        onClick={() => window.location.href = slide.primary_button_url || '#'}
                      >
                        {slide.primary_button_text}
                      </Button>
                    )}
                    {slide.secondary_button_text && (
                      <Button 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/10 text-lg py-6 px-8"
                        onClick={() => window.location.href = slide.secondary_button_url || '#'}
                      >
                        {slide.secondary_button_text}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation controls - only show if we have more than one slide */}
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => {
                    goToSlide(index);
                    handleUserInteraction();
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            onClick={() => {
              prevSlide();
              handleUserInteraction();
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            onClick={() => {
              nextSlide();
              handleUserInteraction();
            }}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  );
};

export default HeroSlideshow;
