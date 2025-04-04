
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

// Outras funções de serviço podem ser adicionadas conforme necessário
