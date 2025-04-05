
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { FAQ } from '@/services/supabase';

interface FAQFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentFAQ: Partial<FAQ>;
  isEditing: boolean;
  isSubmitting: boolean;
  onSave: () => Promise<void>;
  onUpdateField: (field: string, value: string) => void;
}

const FAQForm = ({
  isOpen,
  onOpenChange,
  currentFAQ,
  isEditing,
  isSubmitting,
  onSave,
  onUpdateField,
}: FAQFormProps) => {
  const { toast } = useToast();

  const handleSave = async () => {
    if (!currentFAQ.question || !currentFAQ.answer) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    await onSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar FAQ' : 'Nova Pergunta Frequente'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Edite os detalhes da pergunta frequente.'
              : 'Adicione uma nova pergunta frequente ao site.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Pergunta *</Label>
            <Input
              id="question"
              value={currentFAQ.question || ''}
              onChange={(e) => onUpdateField('question', e.target.value)}
              placeholder="Digite a pergunta"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="answer">Resposta *</Label>
            <Textarea
              id="answer"
              value={currentFAQ.answer || ''}
              onChange={(e) => onUpdateField('answer', e.target.value)}
              placeholder="Digite a resposta"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FAQForm;
