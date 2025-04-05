
import React from 'react';
import { Loader2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, 
  Briefcase, Heart, Clock, Star, Globe, Code, Laptop
} from 'lucide-react';
import { Stat } from '@/services/supabase';

interface StatFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentStat: Partial<Stat>;
  setCurrentStat: React.Dispatch<React.SetStateAction<Partial<Stat>>>;
  isEditing: boolean;
  isSubmitting: boolean;
  onSave: () => Promise<void>;
}

const StatForm = ({
  isOpen,
  onOpenChange,
  currentStat,
  setCurrentStat,
  isEditing,
  isSubmitting,
  onSave,
}: StatFormProps) => {
  const iconOptions = [
    { value: 'BookOpen', label: 'Livro', icon: BookOpen },
    { value: 'Users', label: 'Usuários', icon: Users },
    { value: 'ThumbsUp', label: 'Like', icon: ThumbsUp },
    { value: 'Trophy', label: 'Troféu', icon: Trophy },
    { value: 'GraduationCap', label: 'Formatura', icon: GraduationCap },
    { value: 'Award', label: 'Prêmio', icon: Award },
    { value: 'Briefcase', label: 'Trabalho', icon: Briefcase },
    { value: 'Heart', label: 'Coração', icon: Heart },
    { value: 'Clock', label: 'Relógio', icon: Clock },
    { value: 'Star', label: 'Estrela', icon: Star },
    { value: 'Globe', label: 'Globo', icon: Globe },
    { value: 'Code', label: 'Código', icon: Code },
    { value: 'Laptop', label: 'Laptop', icon: Laptop },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Estatística' : 'Nova Estatística'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Edite os detalhes da estatística.'
              : 'Adicione uma nova estatística ao site.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={currentStat.title || ''}
              onChange={(e) => setCurrentStat({ ...currentStat, title: e.target.value })}
              placeholder="Ex: Cursos"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Valor *</Label>
            <Input
              id="value"
              value={currentStat.value || ''}
              onChange={(e) => setCurrentStat({ ...currentStat, value: e.target.value })}
              placeholder="Ex: 1.500+"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon">Ícone *</Label>
            <Select
              value={currentStat.icon}
              onValueChange={(value) => setCurrentStat({ ...currentStat, icon: value })}
            >
              <SelectTrigger id="icon">
                <SelectValue placeholder="Selecione um ícone" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon && <option.icon className="h-4 w-4" />}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatForm;
