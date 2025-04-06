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
  label: string;
  value: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
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

    return true;
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

    return data || false;
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
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching stats:', error);
      return [];
    }

    // Mapear os campos title para label se necessário
    const stats = (data || []).map(stat => {
      if ('title' in stat && !('label' in stat)) {
        return {
          ...stat,
          label: stat.title,
          icon: stat.icon || null
        } as Stat;
      }
      return {
        ...stat,
        icon: stat.icon || null
      } as Stat;
    });

    return stats;
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
        p_label: stat.label,
        p_value: stat.value,
        p_icon: stat.icon || null
      }
    );

    if (rpcError) {
      console.error('Error creating stat:', rpcError);
      return null;
    }

    if (rpcSuccess) {
      // Buscar a estatística recém-criada
      const { data: fetchedStat } = await supabase
        .from('stats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      return fetchedStat;
    }

    return null;
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
        p_label: updates.label || '',
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

    return data;
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

// Add these methods to the existing supabase.ts file

export const updateStatsOrder = async (orderedIds: string[]): Promise<boolean> => {
  try {
    // Update the order of multiple stats at once
    const updatePromises = orderedIds.map((id, index) => 
      updateStatOrder(id, index + 1)
    );
    
    const results = await Promise.all(updatePromises);
    return results.every(result => result === true);
  } catch (error) {
    console.error('Unexpected error updating stats order:', error);
    return false;
  }
};

export const updateStudyReasonsOrder = async (orderedIds: string[]): Promise<boolean> => {
  try {
    // Update the order of multiple study reasons at once
    const updatePromises = orderedIds.map((id, index) => 
      updateStudyReasonOrder(id, index + 1)
    );
    
    const results = await Promise.all(updatePromises);
    return results.every(result => result === true);
  } catch (error) {
    console.error('Unexpected error updating study reasons order:', error);
    return false;
  }
};

// Ensure these helper functions are present in the supabase.ts file
const updateStatOrder = async (id: string, order: number): Promise<boolean> => {
  try {
    // Use RPC to update the stat order
    const { data, error } = await supabase.rpc<boolean>(
      'update_stat_order',
      {
        p_id: id,
        p_order: order
      }
    );

    if (error) {
      console.error('Error updating stat order:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Unexpected error updating stat order:', error);
    return false;
  }
};

const updateStudyReasonOrder = async (id: string, order: number): Promise<boolean> => {
  try {
    // Use RPC to update the study reason order
    const { data, error } = await supabase.rpc<boolean>(
      'update_study_reason_order',
      {
        p_id: id,
        p_order: order
      }
    );

    if (error) {
      console.error('Error updating study reason order:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Unexpected error updating study reason order:', error);
    return false;
  }
};

export const fetchStudyReasons = async (): Promise<StudyReason[]> => {
  try {
    const { data, error } = await supabase
      .from('study_reasons')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching study reasons:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching study reasons:', error);
    return [];
  }
};
