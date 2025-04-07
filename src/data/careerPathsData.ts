
import { 
  Code, 
  Gamepad2, 
  BarChart3, 
  Figma, 
  BrainCircuit, 
  Terminal, 
  Languages, 
  Calculator, 
  Heart, 
  Bot, 
  BarChartHorizontal, 
  AreaChart, 
  Smartphone, 
  Cog,
  FileSpreadsheet,
  BookOpen,
  Video,
  Pen,
  HeadphonesIcon,
  Network,
  Blocks
} from 'lucide-react';

// Reorganized career paths with fixed image paths
export const careerPathCategories = [
  {
    category: "Educação",
    paths: [
      {
        title: 'Alfabetização',
        icon: BookOpen,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas1-1024x340-essencial.webp'
      },
      {
        title: 'Planilhas',
        icon: FileSpreadsheet,
        color: 'bg-yellow-100',
        image: '/trilhas/Trilhas-1024x310-workspace.webp'
      },
      {
        title: 'Jogos Educativos',
        icon: Blocks,
        color: 'bg-orange-100',
        image: '/trilhas/Trilhas4-1024x340-game1.webp'
      },
      {
        title: 'Matemática',
        icon: Calculator,
        color: 'bg-red-100',
        image: '/trilhas/Trilhas3-1024x340-tecnologia-fundamental.webp'
      },
      {
        title: 'Idiomas',
        icon: Languages,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas18-1024x340-inglês.webp'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas-Evolua.webp.png'
      }
    ]
  },
  {
    category: "Tecnologia",
    paths: [
      {
        title: 'Programação',
        icon: Terminal,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas15-1024x340-programacao.webp'
      },
      {
        title: 'Games',
        icon: Gamepad2,
        color: 'bg-yellow-100',
        image: '/trilhas/Trilhas5-1024x340-game2.webp'
      },
      {
        title: 'UI/UX & Design',
        icon: Figma,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas10-1024x340-designer.webp'
      },
      {
        title: 'Mobile',
        icon: Smartphone,
        color: 'bg-purple-100',
        image: '/trilhas/Trilhas14-1024x340-dev-apps.webp'
      },
      {
        title: 'Inteligência Artificial',
        icon: BrainCircuit,
        color: 'bg-pink-100',
        image: '/trilhas/Trilhas13-1024x340-web.webp'
      },
      {
        title: 'Robótica',
        icon: Bot,
        color: 'bg-indigo-100',
        image: '/trilhas/Trilhas6-1024x340-game3d.webp'
      },
      {
        title: 'Modelagem 3D',
        icon: Blocks,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas12-1024x340-designer3d.webp'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas-Evolua.webp.png'
      }
    ]
  },
  {
    category: "Negócios",
    paths: [
      {
        title: 'Administração',
        icon: BarChartHorizontal,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas8-1024x340-rh.webp'
      },
      {
        title: 'Marketing Digital',
        icon: BarChart3,
        color: 'bg-red-100',
        image: '/trilhas/Trilhas7-1024x340-contabel.webp'
      },
      {
        title: 'Atendimento',
        icon: HeadphonesIcon,
        color: 'bg-orange-100',
        image: '/trilhas/Trilhas9-1024x340-finanças.webp'
      },
      {
        title: 'Análise de dados',
        icon: AreaChart,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas3-1024x340-tecnologia-fundamental.webp'
      },
      {
        title: 'Produção de Conteúdo',
        icon: Pen,
        color: 'bg-pink-100',
        image: '/trilhas/Trilhas11-1024x340-edicao-video.webp'
      },
      {
        title: 'Finanças',
        icon: Cog,
        color: 'bg-green-100',
        image: '/trilhas/Trilhas9-1024x340-finanças.webp'
      },
      {
        title: 'Videomaker',
        icon: Video,
        color: 'bg-blue-100',
        image: '/trilhas/Trilhas11-1024x340-edicao-video.webp'
      },
      {
        title: 'Inteligência Emocional',
        icon: Heart,
        color: 'bg-rose-100',
        image: '/trilhas/Trilhas-Evolua.webp.png'
      }
    ]
  }
];
