
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { 
  Testimonial, 
  fetchTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '@/services/supabase';
import { PlusCircle, Edit, Trash2, Loader2, Import } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsEditor = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [placeId, setPlaceId] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    content: '',
    image_url: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os depoimentos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewClick = () => {
    setCurrentTestimonial({
      name: '',
      role: '',
      company: '',
      content: '',
      image_url: '',
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleImportClick = () => {
    setIsImportDialogOpen(true);
  };

  const handleImport = async () => {
    if (!placeId) {
      toast({
        title: 'Campo obrigatório',
        description: 'O ID do local é obrigatório para importar avaliações.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementar a importação real quando tivermos a edge function
      toast({
        title: 'Importação',
        description: 'Funcionalidade de importação do Google Maps em desenvolvimento.',
        variant: 'default',
      });
      setIsImportDialogOpen(false);
    } catch (error) {
      console.error('Error importing reviews:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível importar as avaliações.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentTestimonial.name || !currentTestimonial.role || 
        !currentTestimonial.company || !currentTestimonial.content) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing && currentTestimonial.id) {
        await updateTestimonial(currentTestimonial.id, {
          name: currentTestimonial.name,
          role: currentTestimonial.role,
          company: currentTestimonial.company,
          content: currentTestimonial.content,
          image_url: currentTestimonial.image_url,
        });
        toast({
          title: 'Sucesso',
          description: 'Depoimento atualizado com sucesso!',
        });
      } else {
        await createTestimonial({
          name: currentTestimonial.name || '',
          role: currentTestimonial.role || '',
          company: currentTestimonial.company || '',
          content: currentTestimonial.content || '',
          image_url: currentTestimonial.image_url,
        });
        toast({
          title: 'Sucesso',
          description: 'Novo depoimento adicionado com sucesso!',
        });
      }
      setIsDialogOpen(false);
      loadTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o depoimento.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      setLoading(true);
      try {
        await deleteTestimonial(id);
        toast({
          title: 'Sucesso',
          description: 'Depoimento excluído com sucesso!',
        });
        loadTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir o depoimento.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Depoimentos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportClick}>
            <Import className="mr-2 h-4 w-4" /> Importar do Google Maps
          </Button>
          <Button onClick={handleAddNewClick}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Depoimentos</CardTitle>
          <CardDescription>
            Gerencie os depoimentos exibidos no site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && testimonials.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : testimonials.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pessoa</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Depoimento</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage 
                            src={testimonial.image_url || ''} 
                            alt={testimonial.name} 
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(testimonial.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{testimonial.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.role}</TableCell>
                    <TableCell>{testimonial.company}</TableCell>
                    <TableCell className="max-w-xs truncate">{testimonial.content}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleEditClick(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              Nenhum depoimento cadastrado. Clique em "Adicionar Novo" para começar.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para adicionar/editar depoimento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Depoimento' : 'Novo Depoimento'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Edite os detalhes do depoimento.'
                : 'Adicione um novo depoimento ao site.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={currentTestimonial.name || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                placeholder="Nome da pessoa"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Cargo/Função *</Label>
              <Input
                id="role"
                value={currentTestimonial.role || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
                placeholder="Cargo ou função"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                value={currentTestimonial.company || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, company: e.target.value })}
                placeholder="Nome da empresa"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Depoimento *</Label>
              <Textarea
                id="content"
                value={currentTestimonial.content || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, content: e.target.value })}
                placeholder="Texto do depoimento"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image_url">URL da Imagem (opcional)</Label>
              <Input
                id="image_url"
                value={currentTestimonial.image_url || ''}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, image_url: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para importar do Google Maps */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Avaliações do Google Maps</DialogTitle>
            <DialogDescription>
              Insira o ID do local do Google Maps para importar as avaliações.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="placeId">ID do Local do Google Maps *</Label>
              <Input
                id="placeId"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
                placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
              />
              <p className="text-xs text-muted-foreground">
                Você pode encontrar o ID do local na URL do Google Maps ou na API do Google Places.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Importar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsEditor;
