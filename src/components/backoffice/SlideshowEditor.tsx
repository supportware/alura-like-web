import React, { useState, useEffect, useCallback } from 'react';
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
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Loader2, 
  FileImage, 
  ArrowUp, 
  ArrowDown,
  Image as ImageIcon,
  Check,
  Eye,
  X
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Slide, fetchSlides, createSlide, updateSlide, deleteSlide } from '@/services/supabase';

const SlideshowEditor = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<Partial<Slide>>({
    title: '',
    description: '',
    primary_button_text: '',
    secondary_button_text: '',
    primary_button_url: '',
    secondary_button_url: '',
    order: 0,
    active: true
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch slides
  const loadSlides = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error loading slides:', error);
      toast({
        title: "Erro ao carregar slides",
        description: "Não foi possível carregar os slides do slideshow",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadSlides();
  }, [loadSlides]);

  // Handle slide image selection and conversion to Base64
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      setCurrentSlide({
        ...currentSlide,
        image_base64: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  // Add or Edit slide
  const handleAddNewClick = () => {
    setCurrentSlide({
      title: '',
      description: '',
      primary_button_text: '',
      secondary_button_text: '',
      primary_button_url: '',
      secondary_button_url: '',
      order: slides.length, // Set order to the end of the list
      active: true
    });
    setSelectedImage(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (slide: Slide) => {
    setCurrentSlide({ ...slide });
    setSelectedImage(slide.image_base64 || null);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Save slide
  const handleSave = async () => {
    if (!currentSlide.title || !currentSlide.description || !selectedImage) {
      toast({
        title: "Campos obrigatórios",
        description: "Título, descrição e imagem são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing && currentSlide.id) {
        // Update existing slide
        const updatedSlide = await updateSlide(currentSlide.id, {
          title: currentSlide.title || '',
          description: currentSlide.description || '',
          image_base64: selectedImage,
          primary_button_text: currentSlide.primary_button_text,
          secondary_button_text: currentSlide.secondary_button_text,
          primary_button_url: currentSlide.primary_button_url,
          secondary_button_url: currentSlide.secondary_button_url,
          active: Boolean(currentSlide.active),
          order: typeof currentSlide.order === 'number' ? currentSlide.order : 0
        });

        if (updatedSlide) {
          toast({
            title: "Slide atualizado",
            description: `O slide "${currentSlide.title}" foi atualizado com sucesso`
          });
        }
      } else {
        // Create new slide
        const newSlide = await createSlide({
          title: currentSlide.title || '',
          description: currentSlide.description || '',
          image_base64: selectedImage,
          primary_button_text: currentSlide.primary_button_text,
          secondary_button_text: currentSlide.secondary_button_text,
          primary_button_url: currentSlide.primary_button_url,
          secondary_button_url: currentSlide.secondary_button_url,
          active: Boolean(currentSlide.active),
          order: typeof currentSlide.order === 'number' ? currentSlide.order : 0
        });

        if (newSlide) {
          toast({
            title: "Slide criado",
            description: `O slide "${currentSlide.title}" foi criado com sucesso`
          });
        }
      }

      await loadSlides(); // Reload the slides
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving slide:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o slide",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete slide
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este slide?")) return;

    setLoading(true);
    try {
      const success = await deleteSlide(id);

      if (success) {
        await loadSlides();
        toast({
          title: "Slide excluído",
          description: "O slide foi excluído com sucesso"
        });
      } else {
        throw new Error("Falha ao excluir slide");
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir o slide",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Move slide up or down
  const moveSlide = async (slideId: string, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(slide => slide.id === slideId);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === slides.length - 1)
    ) {
      return; // Can't move further
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newSlides = [...slides];
    
    // Swap the order values
    const temp = newSlides[currentIndex].order;
    newSlides[currentIndex].order = newSlides[newIndex].order;
    newSlides[newIndex].order = temp;
    
    // Swap the elements
    [newSlides[currentIndex], newSlides[newIndex]] = [newSlides[newIndex], newSlides[currentIndex]];
    
    setLoading(true);
    try {
      // Update orders in database
      for (const slide of [newSlides[currentIndex], newSlides[newIndex]]) {
        await updateSlide(slide.id, { order: slide.order });
      }
      
      setSlides(newSlides);
      toast({
        title: "Ordem atualizada",
        description: "A ordem dos slides foi atualizada com sucesso"
      });
    } catch (error) {
      console.error('Error reordering slides:', error);
      toast({
        title: "Erro ao reordenar",
        description: "Ocorreu um erro ao atualizar a ordem dos slides",
        variant: "destructive"
      });
      await loadSlides(); // Reload to ensure consistency
    } finally {
      setLoading(false);
    }
  };

  // Toggle slide active status
  const toggleSlideActive = async (slide: Slide) => {
    setLoading(true);
    try {
      const updatedSlide = await updateSlide(slide.id, { active: !slide.active });
      
      if (updatedSlide) {
        await loadSlides();
        toast({
          title: slide.active ? "Slide desativado" : "Slide ativado",
          description: `O slide "${slide.title}" foi ${slide.active ? "desativado" : "ativado"} com sucesso`
        });
      }
    } catch (error) {
      console.error('Error toggling slide status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status do slide",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Preview a slide
  const handlePreview = (slide: Slide) => {
    setCurrentSlide(slide);
    setSelectedImage(slide.image_base64 || null);
    setPreviewDialogOpen(true);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Gerenciamento de Slideshow</CardTitle>
          <CardDescription>
            Adicione, edite ou remova slides do slideshow da página inicial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={handleAddNewClick}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Novo Slide
            </Button>
          </div>

          {loading && slides.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {slides.length === 0 ? (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">Nenhum slide encontrado. Adicione um novo slide para começar.</p>
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Imagem</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Ativo</TableHead>
                        <TableHead>Ordem</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {slides.map((slide) => (
                        <TableRow key={slide.id} className={!slide.active ? "opacity-60" : ""}>
                          <TableCell>
                            <div className="w-20 h-12 overflow-hidden rounded border">
                              {slide.image_base64 ? (
                                <img 
                                  src={slide.image_base64.startsWith('data:') 
                                    ? slide.image_base64 
                                    : `/slideshow/${slide.image_base64}`} 
                                  alt={slide.title} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <FileImage className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{slide.title}</TableCell>
                          <TableCell>
                            <Switch
                              checked={slide.active}
                              onCheckedChange={() => toggleSlideActive(slide)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => moveSlide(slide.id, 'up')}
                                disabled={slides.indexOf(slide) === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <span>{slide.order + 1}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => moveSlide(slide.id, 'down')}
                                disabled={slides.indexOf(slide) === slides.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handlePreview(slide)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEditClick(slide)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => handleDelete(slide.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Slide Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Slide' : 'Adicionar Novo Slide'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Atualize os detalhes do slide existente.' : 'Preencha os detalhes para o novo slide.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={currentSlide.title || ''}
                onChange={(e) => setCurrentSlide({ ...currentSlide, title: e.target.value })}
                placeholder="Título do slide"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={currentSlide.description || ''}
                onChange={(e) => setCurrentSlide({ ...currentSlide, description: e.target.value })}
                placeholder="Descrição do slide"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="image">Imagem do Slide *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="flex-1"
                />
              </div>
              
              {selectedImage && (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="primary_button_text">Texto do Botão Principal</Label>
                <Input
                  id="primary_button_text"
                  value={currentSlide.primary_button_text || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, primary_button_text: e.target.value })}
                  placeholder="Ex: Conheça nossos cursos"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="primary_button_url">URL do Botão Principal</Label>
                <Input
                  id="primary_button_url"
                  value={currentSlide.primary_button_url || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, primary_button_url: e.target.value })}
                  placeholder="Ex: /courses"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="secondary_button_text">Texto do Botão Secundário</Label>
                <Input
                  id="secondary_button_text"
                  value={currentSlide.secondary_button_text || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, secondary_button_text: e.target.value })}
                  placeholder="Ex: Para empresas"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="secondary_button_url">URL do Botão Secundário</Label>
                <Input
                  id="secondary_button_url"
                  value={currentSlide.secondary_button_url || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, secondary_button_url: e.target.value })}
                  placeholder="Ex: /business"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={Boolean(currentSlide.active)}
                onCheckedChange={(checked) => setCurrentSlide({ ...currentSlide, active: checked })}
              />
              <Label htmlFor="active">Slide ativo</Label>
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

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <div className="relative h-[500px]">
            {selectedImage && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${selectedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-3xl mx-auto text-center text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                      {currentSlide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                      {currentSlide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {currentSlide.primary_button_text && (
                        <Button 
                          className="bg-white text-black hover:bg-gray-100 text-lg py-6 px-8"
                        >
                          {currentSlide.primary_button_text}
                        </Button>
                      )}
                      
                      {currentSlide.secondary_button_text && (
                        <Button 
                          variant="outline" 
                          className="border-white text-white hover:bg-white/10 text-lg py-6 px-8"
                        >
                          {currentSlide.secondary_button_text}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/40"
              onClick={() => setPreviewDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SlideshowEditor;
