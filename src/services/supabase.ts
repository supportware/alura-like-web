import { supabase } from '@/integrations/supabase/client';

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
  title: string;
  value: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
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
    .select('*');

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data || [];
};

// FAQ functions
export const fetchFAQs = async (): Promise<FAQ[]> => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*');

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data || [];
};

export const createFAQ = async (newFAQ: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ | null> => {
  const { data, error } = await supabase
    .from('faqs')
    .insert(newFAQ)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating FAQ:', error);
    return null;
  }

  return data;
};

export const updateFAQ = async (id: string, updates: Partial<FAQ>): Promise<FAQ | null> => {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating FAQ:', error);
    return null;
  }

  return data;
};

export const deleteFAQ = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting FAQ:', error);
    return false;
  }

  return true;
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
  const { data, error } = await supabase
    .from('stats')
    .select('*');

  if (error) {
    console.error('Error fetching stats:', error);
    return [];
  }

  return data || [];
};

export const createStat = async (newStat: Omit<Stat, 'id' | 'created_at' | 'updated_at'>): Promise<Stat | null> => {
  const { data, error } = await supabase
    .from('stats')
    .insert(newStat)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating stat:', error);
    return null;
  }

  return data;
};

export const updateStat = async (id: string, updates: Partial<Stat>): Promise<Stat | null> => {
  const { data, error } = await supabase
    .from('stats')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating stat:', error);
    return null;
  }

  return data;
};

export const deleteStat = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('stats')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting stat:', error);
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
