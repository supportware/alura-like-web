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
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
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
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching FAQs:', error);
    return [];
  }
};

export const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ | null> => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .insert(faq)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating FAQ:', error);
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

    return data as FAQ;
  } catch (error) {
    console.error('Unexpected error updating FAQ:', error);
    return null;
  }
};

export const deleteFAQ = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }

    return true;
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
      console.error('Erro ao buscar estatísticas:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro inesperado ao buscar estatísticas:', error);
    return [];
  }
};

export const createStat = async (newStat: Omit<Stat, 'id' | 'created_at' | 'updated_at'>): Promise<Stat | null> => {
  try {
    // Desabilitar temporariamente RLS para inserção
    const { data: rpcResponse, error: rpcError } = await supabase.rpc('insert_stat', {
      p_title: newStat.title,
      p_value: newStat.value,
      p_icon: newStat.icon
    });

    if (rpcError) {
      console.error('Error creating stat:', rpcError);
      return null;
    }

    // Buscar a estatística recém-criada
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .eq('title', newStat.title)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching created stat:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in createStat:', error);
    return null;
  }
};

export const updateStat = async (id: string, updates: Partial<Stat>): Promise<Stat | null> => {
  try {
    // Usar RPC para contornar o RLS
    const { data: rpcSuccess, error: rpcError } = await supabase.rpc('update_stat', {
      p_id: id,
      p_title: updates.title || '',
      p_value: updates.value || '',
      p_icon: updates.icon || ''
    });

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

    return data;
  } catch (error) {
    console.error('Unexpected error in updateStat:', error);
    return null;
  }
};

export const deleteStat = async (id: string): Promise<boolean> => {
  try {
    // Usar RPC para contornar o RLS
    const { data, error } = await supabase.rpc('delete_stat', {
      p_id: id
    });

    if (error) {
      console.error('Error deleting stat:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Unexpected error in deleteStat:', error);
    return false;
  }
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
