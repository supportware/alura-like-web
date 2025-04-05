
import React from 'react';
import { FAQ } from '@/services/supabase';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface FAQListProps {
  faqs: FAQ[];
  loading: boolean;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
}

const FAQList = ({ faqs, loading, onEdit, onDelete }: FAQListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Nenhum FAQ cadastrado. Clique em "Adicionar Nova" para começar.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pergunta</TableHead>
          <TableHead>Resposta</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faqs.map((faq) => (
          <TableRow key={faq.id}>
            <TableCell className="font-medium">{faq.question}</TableCell>
            <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onEdit(faq)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDelete(faq.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FAQList;
