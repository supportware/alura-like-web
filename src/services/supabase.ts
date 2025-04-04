
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Tipos para os dados das tabelas
export type StudyReason = {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type Course = {
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
};

export type CareerPath = {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Stat = {
  id: string;
  title: string;
  value: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
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
};

// Funções para fetch dos dados

// Study Reasons
export const fetchStudyReasons = async (): Promise<StudyReason[]> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Erro ao buscar razões de estudo:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar as razões de estudo.',
      variant: 'destructive',
    });
    return [];
  }

  return data || [];
};

export const saveStudyReason = async (reason: Omit<StudyReason, 'id' | 'created_at' | 'updated_at'>): Promise<StudyReason | null> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .insert([reason])
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar razão de estudo:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível salvar a razão de estudo.',
      variant: 'destructive',
    });
    return null;
  }

  return data;
};

export const updateStudyReason = async (id: string, reason: Partial<StudyReason>): Promise<StudyReason | null> => {
  const { data, error } = await supabase
    .from('study_reasons')
    .update(reason)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar razão de estudo:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível atualizar a razão de estudo.',
      variant: 'destructive',
    });
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
    console.error('Erro ao excluir razão de estudo:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível excluir a razão de estudo.',
      variant: 'destructive',
    });
    return false;
  }

  return true;
};

// Courses
export const fetchCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Erro ao buscar cursos:', error);
    toast({
      title: 'Erro',
      description: 'Não foi possível carregar os cursos.',
      variant: 'destructive',
    });
    return [];
  }

  return data || [];
};

// Similar functions can be added for other data types
