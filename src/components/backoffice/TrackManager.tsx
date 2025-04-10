import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CareerPath, 
  fetchCareerPaths, 
  createCareerPath, 
  updateCareerPath, 
  deleteCareerPath, 
  fetchCarouselPaths, 
  updateCareerPathCarouselStatus
} from '@/services/supabase';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Loader2, 
  FileImage, 
  Code, 
  PenTool, 
  BarChart, 
  Users, 
  Briefcase, 
  Cloud, 
  Smartphone, 
  Shield, 
  Server,
  Image as ImageIcon,
  Check,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Lista de opções de ícones para as trilhas
const iconOptions = [
  { value: 'code', label: 'Código' },
  { value: 'pen-tool', label: 'Design' },
  { value: 'bar-chart', label: 'Dados' },
  { value: 'users', label: 'Pessoas' },
  { value: 'briefcase', label: 'Negócios' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'smartphone', label: 'Mobile' },
  { value: 'shield', label: 'Segurança' },
  { value: 'server', label: 'DevOps' },
];

// Lista das imagens disponíveis para trilhas
const availableTrackImages = [
  { id: 'workspace', name: 'Workspace', path: '/trilhas/Trilhas-1024x310-workspace.webp' },
  { id: 'evolua', name: 'Evolua', path: '/trilhas/Trilhas-Evolua.webp.png' },
  { id: 'essencial', name: 'Essencial', path: '/trilhas/Trilhas1-1024x340-essencial.webp' },
  { id: 'designer', name: 'Designer', path: '/trilhas/Trilhas10-1024x340-designer.webp' },
  { id: 'edicao-video', name: 'Edição de Vídeo', path: '/trilhas/Trilhas11-1024x340-edicao-video.webp' },
  { id: 'designer3d', name: 'Designer 3D', path: '/trilhas/Trilhas12-1024x340-designer3d.webp' },
  { id: 'web', name: 'Web', path: '/trilhas/Trilhas13-1024x340-web.webp' },
  { id: 'dev-apps', name: 'Desenvolvimento de Apps', path: '/trilhas/Trilhas14-1024x340-dev-apps.webp' },
  { id: 'programacao', name: 'Programação', path: '/trilhas/Trilhas15-1024x340-programacao.webp' },
  { id: 'ingles-kids', name: 'Inglês para Crianças', path: '/trilhas/Trilhas16-1024x340-ingles-kids.webp' },
  { id: 'ingles-teens', name: 'Inglês para Adolescentes', path: '/trilhas/Trilhas17-1024x340-ingles-teens.webp' },
  { id: 'ingles', name: 'Inglês', path: '/trilhas/Trilhas18-1024x340-inglês.webp' },
  { id: 'tecnologia-fundamental', name: 'Tecnologia Fundamental', path: '/trilhas/Trilhas3-1024x340-tecnologia-fundamental.webp' },
  { id: 'game1', name: 'Games 1', path: '/trilhas/Trilhas4-1024x340-game1.webp' },
  { id: 'game2', name: 'Games 2', path: '/trilhas/Trilhas5-1024x340-game2.webp' },
  { id: 'game3d', name: 'Games 3D', path: '/trilhas/Trilhas6-1024x340-game3d.webp' },
  { id: 'contabil', name: 'Contabilidade', path: '/trilhas/Trilhas7-1024x340-contabel.webp' },
  { id: 'rh', name: 'Recursos Humanos', path: '/trilhas/Trilhas8-1024x340-rh.webp' },
  { id: 'financas', name: 'Finanças', path: '/trilhas/Trilhas9-1024x340-finanças.webp' },
];

const TrackManager = () => {
  const { toast } = useToast();
  const [tracks, setTracks] = useState<CareerPath[]>([]);
  const [carouselTracks, setCarouselTracks] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Partial<CareerPath>>({
    title: '',
    description: '',
    icon: 'code',
    image_path: '',
    category: '',
    order: 1,
    active: true,
    in_carousel: false,
    carousel_order: 0
  });
  const [selectedImagePath, setSelectedImagePath] = useState<string>('');

  // Carrega todas as trilhas
  const loadTracks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCareerPaths();
      setTracks(data);
    } catch (error) {
      console.error('Error loading career paths:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as trilhas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Carrega trilhas que estão no carrossel
  const loadCarouselTracks = useCallback(async () => {
    try {
      const data = await fetchCarouselPaths();
      setCarouselTracks(data);
    } catch (error) {
      console.error('Error loading carousel paths:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as trilhas do carrossel.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Carrega dados na inicialização
  useEffect(() => {
    loadTracks();
    loadCarouselTracks();
  }, [loadTracks, loadCarouselTracks]);

  // Função para renderizar a aba de todas as trilhas
  const renderAllTracksTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Todas as trilhas disponíveis</h3>
          <Button onClick={handleAddNewClick} variant="default">
            <PlusCircle className="h-4 w-4 mr-2" />
            Nova Trilha
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tracks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="w-[100px]">Ordem</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Carrossel</TableHead>
                <TableHead className="text-right w-[180px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>
                    {track.image_path && (
                      <div className="w-16 h-12 overflow-hidden rounded">
                        <img 
                          src={track.image_path} 
                          alt={track.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {React.createElement(getIconComponent(track.icon), {
                        className: "h-4 w-4 text-gray-500"
                      })}
                      <span>{track.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{track.description}</TableCell>
                  <TableCell>
                    {track.category ? (
                      <Badge variant="outline">{track.category}</Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">Não definida</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{track.order}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReorder(track, 'up')}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReorder(track, 'down')}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={track.active}
                        onCheckedChange={() => handleToggleActive(track)}
                        aria-label="Toggle active status"
                      />
                      <span className={track.active ? "text-green-600" : "text-gray-400"}>
                        {track.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={track.in_carousel}
                        onCheckedChange={() => handleToggleCarousel(track)}
                        aria-label="Toggle carousel status"
                      />
                      <span className={track.in_carousel ? "text-blue-600" : "text-gray-400"}>
                        {track.in_carousel ? "Sim" : "Não"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(track)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(track.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma trilha cadastrada.</p>
            <Button 
              variant="outline" 
              onClick={handleAddNewClick}
              className="mt-4"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Trilha
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Função para renderizar a aba de trilhas no carrossel
  const renderCarouselTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Trilhas exibidas no carrossel da página inicial</h3>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : carouselTracks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[100px]">Posição</TableHead>
                <TableHead className="text-right w-[180px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carouselTracks.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>
                    {track.image_path && (
                      <div className="w-16 h-12 overflow-hidden rounded">
                        <img 
                          src={track.image_path} 
                          alt={track.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {React.createElement(getIconComponent(track.icon), {
                        className: "h-4 w-4 text-gray-500"
                      })}
                      <span>{track.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{track.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{track.carousel_order}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCarouselReorder(track, 'up')}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCarouselReorder(track, 'down')}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleCarousel(track)}
                        title="Remover do carrossel"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(track)}
                        title="Editar trilha"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-md p-8">
            <p className="text-gray-500 mb-4">Nenhuma trilha no carrossel.</p>
            <p className="text-sm text-gray-400">
              Para adicionar trilhas ao carrossel, ative a opção "Exibir no carrossel" 
              ao editar uma trilha ou alterne o switch na tabela de trilhas.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Limpeza do formulário
  const resetForm = () => {
    setCurrentTrack({
      title: '',
      description: '',
      icon: 'code',
      image_path: '',
      category: '',
      order: 1,
      active: true,
      in_carousel: false,
      carousel_order: 0
    });
    setSelectedImagePath('');
  };

  // Adição de uma nova trilha
  const handleAddNewClick = () => {
    resetForm();
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  // Edição de uma trilha existente
  const handleEditClick = (track: CareerPath) => {
    setCurrentTrack({
      id: track.id,
      title: track.title,
      description: track.description,
      icon: track.icon,
      image_path: track.image_path,
      category: track.category || '',
      order: track.order || 1,
      active: track.active !== undefined ? track.active : true,
      in_carousel: track.in_carousel || false,
      carousel_order: track.carousel_order || 0
    });
    setSelectedImagePath(track.image_path || '');
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Salvar uma trilha (nova ou edição)
  const handleSave = async () => {
    // Validar entrada
    if (!currentTrack.title?.trim()) {
      toast({
        title: "Erro",
        description: "O título da trilha é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedImagePath) {
      toast({
        title: "Erro",
        description: "Selecione uma imagem para a trilha.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const trackData = {
        title: currentTrack.title,
        description: currentTrack.description || '',
        icon: currentTrack.icon || 'code',
        image_path: selectedImagePath,
        category: currentTrack.category || '',
        order: currentTrack.order || 1,
        active: currentTrack.active !== undefined ? currentTrack.active : true,
        in_carousel: currentTrack.in_carousel || false,
        carousel_order: currentTrack.carousel_order || 0
      };

      let result;
      if (isEditing && currentTrack.id) {
        result = await updateCareerPath(currentTrack.id, trackData);
      } else {
        result = await createCareerPath(trackData);
      }

      if (result) {
        toast({
          title: isEditing ? "Trilha atualizada" : "Trilha adicionada",
          description: isEditing 
            ? `A trilha ${result.title} foi atualizada com sucesso.` 
            : `A trilha ${result.title} foi adicionada com sucesso.`,
        });
        
        await loadTracks();
        await loadCarouselTracks();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao salvar trilha:', error);
      toast({
        title: "Erro",
        description: `Ocorreu um erro ao ${isEditing ? 'atualizar' : 'adicionar'} a trilha.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Excluir uma trilha
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta trilha? Esta ação não pode ser desfeita.')) {
      setLoading(true);
      try {
        const success = await deleteCareerPath(id);
        if (success) {
          toast({
            title: "Trilha excluída",
            description: "A trilha foi excluída com sucesso."
          });
          await loadTracks();
          await loadCarouselTracks();
        } else {
          throw new Error('Falha ao excluir trilha');
        }
      } catch (error) {
        console.error('Erro ao excluir trilha:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir a trilha.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Alternar o status ativo/inativo
  const handleToggleActive = async (track: CareerPath) => {
    setLoading(true);
    try {
      const updatedTrack = await updateCareerPath(track.id, {
        active: !track.active
      });
      
      if (updatedTrack) {
        toast({
          title: updatedTrack.active ? "Trilha ativada" : "Trilha desativada",
          description: `A trilha ${updatedTrack.title} foi ${updatedTrack.active ? 'ativada' : 'desativada'} com sucesso.`
        });
        await loadTracks();
        await loadCarouselTracks();
      }
    } catch (error) {
      console.error('Erro ao alterar status da trilha:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status da trilha.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Mover trilha para cima ou para baixo (alterar ordem)
  const handleReorder = async (track: CareerPath, direction: 'up' | 'down') => {
    const currentIndex = tracks.findIndex(t => t.id === track.id);
    
    if ((direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === tracks.length - 1)) {
      return;
    }
    
    setLoading(true);
    try {
      // Trilha com a qual vamos trocar a posição
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const targetTrack = tracks[targetIndex];
      
      if (!targetTrack) {
        throw new Error('Trilha alvo não encontrada');
      }
      
      // Trocar as ordens entre as duas trilhas
      const currentOrder = track.order;
      const targetOrder = targetTrack.order;
      
      // Atualizar a trilha atual
      await updateCareerPath(track.id, {
        order: targetOrder
      });
      
      // Atualizar a trilha alvo
      await updateCareerPath(targetTrack.id, {
        order: currentOrder
      });
      
      toast({
        title: "Ordem atualizada",
        description: `A ordem da trilha ${track.title} foi atualizada.`
      });
      
      // Recarregar as trilhas após as atualizações
      await loadTracks();
      await loadCarouselTracks();
    } catch (error) {
      console.error('Erro ao reordenar trilha:', error);
      toast({
        title: "Erro",
        description: "Não foi possível reordenar a trilha.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Alternar status no carrossel
  const handleToggleCarousel = async (track: CareerPath) => {
    setLoading(true);
    try {
      // Se está adicionando ao carrossel, definir ordem como a última + 1
      let carouselOrder = track.carousel_order || 0;
      if (!track.in_carousel) {
        const maxOrder = carouselTracks.length > 0 
          ? Math.max(...carouselTracks.map(t => t.carousel_order || 0)) 
          : 0;
        carouselOrder = maxOrder + 1;
      }
      
      const updatedTrack = await updateCareerPathCarouselStatus(
        track.id, 
        !track.in_carousel,
        carouselOrder
      );
      
      if (updatedTrack) {
        toast({
          title: updatedTrack.in_carousel ? "Adicionado ao carrossel" : "Removido do carrossel",
          description: `A trilha ${updatedTrack.title} foi ${updatedTrack.in_carousel ? 'adicionada ao' : 'removida do'} carrossel da página inicial.`
        });
        await loadTracks();
        await loadCarouselTracks();
      }
    } catch (error) {
      console.error('Erro ao alterar status no carrossel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status da trilha no carrossel.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Reordenar trilhas no carrossel
  const handleCarouselReorder = async (track: CareerPath, direction: 'up' | 'down') => {
    const currentIndex = carouselTracks.findIndex(t => t.id === track.id);
    
    if ((direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === carouselTracks.length - 1)) {
      return;
    }
    
    setLoading(true);
    try {
      // Trilha com a qual vamos trocar a posição
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const targetTrack = carouselTracks[targetIndex];
      
      if (!targetTrack) {
        throw new Error('Trilha alvo não encontrada');
      }
      
      // Trocar as ordens entre as duas trilhas
      const currentOrder = track.carousel_order;
      const targetOrder = targetTrack.carousel_order;
      
      // Atualizar a trilha atual
      await updateCareerPath(track.id, {
        carousel_order: targetOrder
      });
      
      // Atualizar a trilha alvo
      await updateCareerPath(targetTrack.id, {
        carousel_order: currentOrder
      });
      
      toast({
        title: "Ordem atualizada",
        description: `A ordem da trilha ${track.title} no carrossel foi atualizada.`
      });
      
      // Recarregar as trilhas após as atualizações
      await loadTracks();
      await loadCarouselTracks();
    } catch (error) {
      console.error('Erro ao reordenar trilha no carrossel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível reordenar a trilha no carrossel.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Selecionar uma imagem para a trilha
  const selectImage = (imagePath: string) => {
    setSelectedImagePath(imagePath);
    setImageDialogOpen(false);
  };

  // Obter componente de ícone
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code;
      case 'pen-tool': return PenTool;
      case 'bar-chart': return BarChart;
      case 'users': return Users;
      case 'briefcase': return Briefcase;
      case 'cloud': return Cloud;
      case 'smartphone': return Smartphone;
      case 'shield': return Shield;
      case 'server': return Server;
      default: return Code;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Trilhas</CardTitle>
          <CardDescription>
            Gerencie as trilhas disponíveis no site e configure quais aparecem no carrossel da página inicial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-tracks">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all-tracks">Todas as Trilhas</TabsTrigger>
              <TabsTrigger value="carousel">Carrossel</TabsTrigger>
            </TabsList>

            <TabsContent value="all-tracks" className="mt-6">
              {renderAllTracksTab()}
            </TabsContent>

            <TabsContent value="carousel" className="mt-6">
              {renderCarouselTab()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Diálogo para adição/edição de trilhas */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Trilha' : 'Nova Trilha'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Edite os detalhes da trilha existente.' 
                : 'Preencha os campos para adicionar uma nova trilha de carreira.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título*</Label>
              <Input
                id="title"
                value={currentTrack.title || ''}
                onChange={(e) => setCurrentTrack({ ...currentTrack, title: e.target.value })}
                placeholder="Ex: Desenvolvimento Web"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={currentTrack.description || ''}
                onChange={(e) => setCurrentTrack({ ...currentTrack, description: e.target.value })}
                placeholder="Breve descrição da trilha"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={currentTrack.category || ''}
                onChange={(e) => setCurrentTrack({ ...currentTrack, category: e.target.value })}
                placeholder="Ex: Desenvolvimento"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="icon">Ícone</Label>
                <Select
                  value={currentTrack.icon || 'code'}
                  onValueChange={(value) => setCurrentTrack({ ...currentTrack, icon: value })}
                >
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Selecione um ícone" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          {React.createElement(getIconComponent(option.value), {
                            className: "h-4 w-4 text-gray-500"
                          })}
                          <span className="ml-2">{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={currentTrack.order || 1}
                  onChange={(e) => setCurrentTrack({ 
                    ...currentTrack, 
                    order: parseInt(e.target.value) 
                  })}
                  placeholder="Ex: 1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="active">Ativo</Label>
                <Switch
                  id="active"
                  checked={currentTrack.active !== undefined ? currentTrack.active : true}
                  onCheckedChange={(checked) => setCurrentTrack({ 
                    ...currentTrack, 
                    active: checked 
                  })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="in_carousel">Exibir no Carrossel</Label>
                <Switch
                  id="in_carousel"
                  checked={currentTrack.in_carousel || false}
                  onCheckedChange={(checked) => {
                    setCurrentTrack({ 
                      ...currentTrack, 
                      in_carousel: checked
                    });
                  }}
                />
              </div>
            </div>

            {currentTrack.in_carousel && (
              <div className="grid gap-2">
                <Label htmlFor="carousel_order">Ordem no Carrossel</Label>
                <Input
                  id="carousel_order"
                  type="number"
                  value={currentTrack.carousel_order || 0}
                  onChange={(e) => setCurrentTrack({ 
                    ...currentTrack, 
                    carousel_order: parseInt(e.target.value) 
                  })}
                  placeholder="Ex: 1"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="image">Imagem*</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={selectedImagePath || ''}
                  readOnly
                  placeholder="Selecione uma imagem para a trilha"
                  className="flex-1"
                />
                <Dialog open={isImageDialogOpen} onOpenChange={setImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Selecionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[850px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Selecione uma imagem para a trilha</DialogTitle>
                      <DialogDescription>
                        Escolha entre as imagens disponíveis para as trilhas.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                      {availableTrackImages.map((image) => (
                        <div 
                          key={image.id}
                          className={`
                            relative border rounded-md overflow-hidden cursor-pointer
                            ${selectedImagePath === image.path ? 'ring-2 ring-primary' : ''}
                          `}
                          onClick={() => selectImage(image.path)}
                        >
                          <div className="w-full h-[74%] flex items-center justify-center bg-gray-100">
                            <img 
                              src={image.path} 
                              alt={image.name} 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="p-2 bg-white">
                            <p className="text-sm font-medium">{image.name}</p>
                          </div>
                          {selectedImagePath === image.path && (
                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {selectedImagePath && (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <div className="w-full h-[74%] flex items-center justify-center bg-gray-100">
                    <img 
                      src={selectedImagePath} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
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
    </div>
  );
};

export default TrackManager;
