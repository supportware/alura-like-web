import { supabase } from '@/integrations/supabase/client';

// Re-export supabase client for direct access
export { supabase };

// Interfaces para as entidades
export interface StudyReason {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: string;
  hours: number;
  image_url: string;
  category: string;
  badge_color: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_path: string;
  category: string;
  order: number;
  active: boolean;
  in_carousel: boolean; // Indica se a trilha aparece no carrossel da página inicial
  carousel_order: number; // Ordem de exibição no carrossel
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  id: string;
  title: string; // Changed from label to title to match database schema
  value: string;
  icon: string;
  created_at: string;
  updated_at: string;
  display_order?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  read_time: string;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Slide {
  id: string;
  title: string;
  description: string;
  image_base64: string;
  primary_button_text?: string;
  secondary_button_text?: string;
  primary_button_url?: string;
  secondary_button_url?: string;
  order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Funções para buscar dados
export const fetchStudyReasons = async (): Promise<StudyReason[]> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .select('*');

  if (error) {
    console.error('Error fetching study reasons:', error);
    return [];
  }

  return data || [];
};

export const createStudyReason = async (newReason: Omit<StudyReason, 'id' | 'created_at' | 'updated_at'>): Promise<StudyReason | null> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .insert(newReason)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating study reason:', error);
    return null;
  }

  return data;
};

export const createMultipleStudyReasons = async (reasons: Omit<StudyReason, 'id' | 'created_at' | 'updated_at'>[]): Promise<StudyReason[] | null> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .insert(reasons)
    .select('*');

  if (error) {
    console.error('Error creating multiple study reasons:', error);
    return null;
  }

  return data;
};

export const updateStudyReason = async (id: string, updates: Partial<StudyReason>): Promise<StudyReason | null> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating study reason:', error);
    return null;
  }

  return data;
};

export const deleteStudyReason = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('study_reasons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting study reason:', error);
    return false;
  }

  return true;
};

export const fetchCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data || [];
};

export const createCourse = async (newCourse: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .insert(newCourse)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating course:', error);
    return null;
  }

  return data;
};

export const updateCourse = async (id: string, updates: Partial<Course>): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating course:', error);
    return null;
  }

  return data;
};

export const deleteCourse = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting course:', error);
    return false;
  }

  return true;
};

// FAQ functions
export const fetchFAQs = async (): Promise<FAQ[]> => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }

    // Garantir que todo FAQ tenha o campo display_order
    const faqs = (data || []).map(faq => {
      // Adiciona a propriedade display_order de forma segura
      return {
        ...faq,
        display_order: (faq as any).display_order || 0
      } as FAQ;
    });
    
    return faqs;
  } catch (error) {
    console.error('Unexpected error fetching FAQs:', error);
    return [];
  }
};

export const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at' | 'display_order'>): Promise<FAQ | null> => {
  try {
    // Usar RPC para contornar o RLS
    const { data: rpcSuccess, error: rpcError } = await supabase.rpc<boolean>(
      'insert_faq',
      {
        p_question: faq.question,
        p_answer: faq.answer
      }
    );

    if (rpcError) {
      console.error('Error creating FAQ:', rpcError);
      return null;
    }

    if (!rpcSuccess) {
      return null;
    }

    // Buscar o FAQ recém-criado
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('question', faq.question)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching created FAQ:', error);
      return null;
    }

    return data as FAQ;
  } catch (error) {
    console.error('Unexpected error creating FAQ:', error);
    return null;
  }
};

export const updateFAQ = async (id: string, updates: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>): Promise<FAQ | null> => {
  try {
    // Usar RPC para contornar o RLS
    const { data: rpcSuccess, error: rpcError } = await supabase.rpc<boolean>(
      'update_faq',
      {
        p_id: id,
        p_question: updates.question || '',
        p_answer: updates.answer || ''
      }
    );

    if (rpcError) {
      console.error('Error updating FAQ:', rpcError);
      return null;
    }

    if (!rpcSuccess) {
      return null;
    }

    // Buscar o FAQ atualizado
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching updated FAQ:', error);
      return null;
    }

    return data as FAQ;
  } catch (error) {
    console.error('Unexpected error updating FAQ:', error);
    return null;
  }
};

export const updateFAQOrder = async (id: string, order: number): Promise<boolean> => {
  try {
    // Usar RPC para atualizar a ordem
    const { data, error } = await supabase.rpc<boolean>(
      'update_faq_order',
      {
        p_id: id,
        p_order: order
      }
    );

    if (error) {
      console.error('Error updating FAQ order:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error updating FAQ order:', error);
    return false;
  }
};

export const updateFAQsOrder = async (orderedIds: string[]): Promise<boolean> => {
  try {
    // Atualizar a ordem de vários FAQs de uma vez
    const updatePromises = orderedIds.map((id, index) => 
      updateFAQOrder(id, index + 1)
    );
    
    const results = await Promise.all(updatePromises);
    return results.every(result => result === true);
  } catch (error) {
    console.error('Unexpected error updating FAQs order:', error);
    return false;
  }
};

export const deleteFAQ = async (id: string): Promise<boolean> => {
  try {
    // Usar RPC para contornar o RLS
    const { data, error } = await supabase.rpc<boolean>(
      'delete_faq',
      {
        p_id: id
      }
    );

    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error deleting FAQ:', error);
    return false;
  }
};

// Testimonial functions
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*');

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
};

export const createTestimonial = async (newTestimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial | null> => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(newTestimonial)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    return null;
  }

  return data;
};

export const updateTestimonial = async (id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating testimonial:', error);
    return null;
  }

  return data;
};

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }

  return true;
};

// Stats functions
export const fetchStats = async (): Promise<Stat[]> => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stats:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching stats:', error);
    return [];
  }
};

export const createStat = async (stat: Omit<Stat, 'id' | 'created_at' | 'updated_at'>): Promise<Stat | null> => {
  try {
    // Usar RPC para contornar o RLS
    const { data: rpcSuccess, error: rpcError } = await supabase.rpc<boolean>(
      'insert_stat',
      {
        p_title: stat.title,
        p_value: stat.value,
        p_icon: stat.icon || null
      }
    );

    if (rpcError) {
      console.error('Error creating stat:', rpcError);
      return null;
    }

    if (!rpcSuccess) {
      return null;
    }

    // Buscar a estatística recém-criada
    const { data: fetchedStat } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return fetchedStat as Stat;
  } catch (error) {
    console.error('Unexpected error in createStat:', error);
    return null;
  }
};

export const updateStat = async (id: string, updates: Partial<Stat>): Promise<Stat | null> => {
  try {
    // Usar RPC para contornar o RLS
    const { data: rpcSuccess, error: rpcError } = await supabase.rpc<boolean>(
      'update_stat',
      {
        p_id: id,
        p_title: updates.title || '',
        p_value: updates.value || '',
        p_icon: updates.icon === undefined ? null : updates.icon
      }
    );

    if (rpcError) {
      console.error('Error updating stat:', rpcError);
      return null;
    }

    if (!rpcSuccess) {
      return null;
    }

    // Buscar a estatística atualizada
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching updated stat:', error);
      return null;
    }

    return data as Stat;
  } catch (error) {
    console.error('Unexpected error in updateStat:', error);
    return null;
  }
};

export const deleteStat = async (id: string): Promise<boolean> => {
  try {
    // Usar RPC para contornar o RLS
    const { data, error } = await supabase.rpc<boolean>(
      'delete_stat',
      {
        p_id: id
      }
    );

    if (error) {
      console.error('Error deleting stat:', error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error('Unexpected error in deleteStat:', error);
    return false;
  }
};

// Career Paths functions
export const fetchCareerPaths = async (): Promise<CareerPath[]> => {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching career paths:', error);
    return [];
  }

  return data || [];
};

export const fetchActiveCareerPaths = async (): Promise<CareerPath[]> => {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching active career paths:', error);
    return [];
  }

  return data || [];
};

export const createCareerPath = async (newPath: Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>): Promise<CareerPath | null> => {
  const { data, error } = await supabase
    .from('career_paths')
    .insert(newPath)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating career path:', error);
    return null;
  }

  return data;
};

export const updateCareerPath = async (id: string, updates: Partial<CareerPath>): Promise<CareerPath | null> => {
  const { data, error } = await supabase
    .from('career_paths')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating career path:', error);
    return null;
  }

  return data;
};

export const deleteCareerPath = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('career_paths')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting career path:', error);
    return false;
  }

  return true;
};

// Função para atualizar o status no carrossel
export const updateCareerPathCarouselStatus = async (id: string, inCarousel: boolean, carouselOrder: number = 0): Promise<CareerPath | null> => {
  const { data, error } = await supabase
    .from('career_paths')
    .update({
      in_carousel: inCarousel,
      carousel_order: carouselOrder
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Erro ao atualizar status no carrossel:', error);
    return null;
  }

  return data;
};

// Função para obter todas as trilhas que estão no carrossel
export const fetchCarouselPaths = async (): Promise<CareerPath[]> => {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .eq('in_carousel', true)
    .eq('active', true)
    .order('carousel_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar trilhas do carrossel:', error);
    return [];
  }

  return data || [];
};

// Slideshow functions
export const fetchSlides = async (): Promise<Slide[]> => {
  const { data, error } = await supabase
    .from('slideshow')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching slides:', error);
    return [];
  }

  return data || [];
};

// Fetch only active slides for the public facing site
export const fetchActiveSlides = async (): Promise<Slide[]> => {
  const { data, error } = await supabase
    .from('slideshow')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching active slides:', error);
    return [];
  }

  return data || [];
};

export const createSlide = async (newSlide: Omit<Slide, 'id' | 'created_at' | 'updated_at'>): Promise<Slide | null> => {
  const { data, error } = await supabase
    .from('slideshow')
    .insert(newSlide)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating slide:', error);
    return null;
  }

  return data;
};

export const updateSlide = async (id: string, updates: Partial<Slide>): Promise<Slide | null> => {
  const { data, error } = await supabase
    .from('slideshow')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating slide:', error);
    return null;
  }

  return data;
};

export const deleteSlide = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('slideshow')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting slide:', error);
    return false;
  }

  return true;
};

// Google Maps testimonial import function
export const importGoogleMapsReviews = async (placeId: string): Promise<Testimonial[] | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('import-google-maps-reviews', {
      body: { placeId },
    });

    if (error) {
      console.error('Error importing Google Maps reviews:', error);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error calling import-google-maps-reviews function:', error);
    return null;
  }
};
