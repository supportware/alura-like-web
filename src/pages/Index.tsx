import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlideshow from '@/components/HeroSlideshow';
import CategorySection from '@/components/CategorySection';
import CoursesSection from '@/components/CoursesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import CareerPathsSection from '@/components/CareerPathsSection';
import StatsSection from '@/components/StatsSection';
import WhyStudyWithUsSection from '@/components/WhyStudyWithUsSection';
import FAQSection from '@/components/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSlideshow />
        <CategorySection />
        <CoursesSection />
        <CareerPathsSection />
        <StatsSection />
        <WhyStudyWithUsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
