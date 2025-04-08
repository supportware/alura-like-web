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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CareerPath, 
  fetchCareerPaths, 
  createCareerPath, 
  updateCareerPath, 
  deleteCareerPath 
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
  Check
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Lista de trilhas baseadas nas imagens da pasta public/trilhas
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

const TrackEditor = () => {
  const { toast } = useToast();
  const [tracks, setTracks] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Partial<CareerPath & { imagePath?: string }>>({
    title: '',
    description: '',
    icon: 'code',
    imagePath: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("trackManagement");

  const loadTracks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCareerPaths();
      setTracks(data);
    } catch (error) {
      console.error('Error loading career paths:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as trilhas de carreira.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  const handleAddNewClick = () => {
    setCurrentTrack({
      title: '',
      description: '',
      icon: 'code',
      imagePath: '',
    });
    setSelectedImagePath(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (track: CareerPath) => {
    setCurrentTrack({
      ...track,
      imagePath: '', // O imagePath será definido manualmente na interface
    });
    setSelectedImagePath(null);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentTrack.title || !currentTrack.description) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing && currentTrack.id) {
        await updateCareerPath(currentTrack.id, {
          title: currentTrack.title,
          description: currentTrack.description,
          icon: currentTrack.icon,
        });
        
        toast({
          title: 'Sucesso',
          description: 'Trilha atualizada com sucesso.',
        });
      } else {
        await createCareerPath({
          title: currentTrack.title,
          description: currentTrack.description,
          icon: currentTrack.icon || 'code',
        });
        
        toast({
          title: 'Sucesso',
          description: 'Nova trilha adicionada com sucesso.',
        });
      }
      
      loadTracks();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving career path:', error);
      toast({
        title: 'Erro',
        description: isEditing 
          ? 'Não foi possível atualizar a trilha.' 
          : 'Não foi possível adicionar a trilha.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta trilha?')) {
      return;
    }
    
    setLoading(true);
    try {
      const success = await deleteCareerPath(id);
      
      if (success) {
        toast({
          title: 'Sucesso',
          description: 'Trilha excluída com sucesso.',
        });
        loadTracks();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting career path:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a trilha.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (imagePath: string) => {
    setSelectedImagePath(imagePath);
    setCurrentTrack({
      ...currentTrack,
      imagePath
    });
    setImageDialogOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    const props = { size: 20 };
    switch (iconName) {
      case 'code': return <Code {...props} />;
      case 'pen-tool': return <PenTool {...props} />;
      case 'bar-chart': return <BarChart {...props} />;
      case 'users': return <Users {...props} />;
      case 'briefcase': return <Briefcase {...props} />;
      case 'cloud': return <Cloud {...props} />;
      case 'smartphone': return <Smartphone {...props} />;
      case 'shield': return <Shield {...props} />;
      case 'server': return <Server {...props} />;
      default: return <Code {...props} />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Trilhas de Carreira</h1>
        <Button onClick={handleAddNewClick}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Trilha
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trackManagement">Gerenciamento de Trilhas</TabsTrigger>
          <TabsTrigger value="availableTracks">Trilhas Disponíveis</TabsTrigger>
        </TabsList>
        
        {/* Tab de gerenciamento de trilhas */}
        <TabsContent value="trackManagement">
          {loading && tracks.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Trilhas de Carreira</CardTitle>
                <CardDescription>
                  Gerencie as trilhas de carreira que serão exibidas na página inicial do site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tracks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma trilha cadastrada.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleAddNewClick}
                    >
                      Adicionar Trilha
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Ícone</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tracks.map((track) => (
                        <TableRow key={track.id}>
                          <TableCell className="font-medium">{track.title}</TableCell>
                          <TableCell className="max-w-md truncate">{track.description}</TableCell>
                          <TableCell>{getIconComponent(track.icon)}</TableCell>
                          <TableCell className="text-right">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Tab de trilhas disponíveis */}
        <TabsContent value="availableTracks">
          <Card>
            <CardHeader>
              <CardTitle>Trilhas Disponíveis</CardTitle>
              <CardDescription>
                Veja todas as trilhas disponíveis baseadas nas imagens da pasta /public/trilhas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTrackImages.map((track) => (
                  <Card key={track.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={track.path} 
                        alt={track.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{track.name}</h3>
                      <p className="text-sm text-muted-foreground">{track.path}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Criar uma nova trilha com base nesta imagem
                          setCurrentTrack({
                            title: track.name,
                            description: '',
                            icon: 'code',
                            imagePath: track.path,
                          });
                          setSelectedImagePath(track.path);
                          setIsEditing(false);
                          setIsDialogOpen(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Criar Trilha
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Trilha" : "Adicionar Nova Trilha"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Atualize os detalhes da trilha de carreira existente." 
                : "Preencha os detalhes para adicionar uma nova trilha de carreira."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={currentTrack.title || ''}
                onChange={(e) => setCurrentTrack({ ...currentTrack, title: e.target.value })}
                placeholder="Ex: Desenvolvimento Web"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={currentTrack.description || ''}
                onChange={(e) => setCurrentTrack({ ...currentTrack, description: e.target.value })}
                placeholder="Descreva a trilha de carreira"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Ícone *</Label>
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
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Imagem</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={selectedImagePath || ''}
                  readOnly
                  placeholder="Selecione uma imagem para a trilha"
                  className="flex-1"
                />
                <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
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
                        Escolha entre as imagens disponíveis na pasta /public/trilhas.
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
                          <img 
                            src={image.path} 
                            alt={image.name} 
                            className="w-full h-32 object-cover"
                          />
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
                  <img 
                    src={selectedImagePath} 
                    alt="Preview" 
                    className="w-full h-40 object-cover"
                  />
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

export default TrackEditor;
