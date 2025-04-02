
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: '10 tendências de programação para ficar de olho em 2023',
    excerpt: 'Conheça as tecnologias e linguagens que estarão em alta no próximo ano e prepare-se para as oportunidades no mercado de trabalho.',
    author: 'Paulo Silveira',
    date: '15 de Maio, 2023',
    readTime: '5 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Tendencias+2023',
    category: 'Programação'
  },
  {
    id: 2,
    title: 'Como começar uma carreira em UX Design do zero',
    excerpt: 'Um guia completo para quem deseja entrar no mundo de UX Design, desde os conceitos básicos até a construção de um portfólio atraente.',
    author: 'Natan Santos',
    date: '10 de Maio, 2023',
    readTime: '8 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Carreira+UX',
    category: 'UX & Design'
  },
  {
    id: 3,
    title: 'Inteligência Artificial: o que você precisa saber',
    excerpt: 'Uma introdução ao mundo da IA, seu impacto no mercado de trabalho e como profissionais podem se preparar para o futuro.',
    author: 'Guilherme Lima',
    date: '5 de Maio, 2023',
    readTime: '7 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Inteligencia+Artificial',
    category: 'Inteligência Artificial'
  },
  {
    id: 4,
    title: 'Data Science: por onde começar seus estudos',
    excerpt: 'Descubra o caminho para se tornar um cientista de dados, ferramentas essenciais e as melhores práticas para entrar nesse mercado em expansão.',
    author: 'Daniel Artine',
    date: '28 de Abril, 2023',
    readTime: '6 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Data+Science',
    category: 'Data Science'
  },
  {
    id: 5,
    title: 'Como montar um ambiente de estudos produtivo',
    excerpt: 'Dicas práticas para criar um espaço que favoreça o aprendizado e aumente sua produtividade nos estudos online.',
    author: 'Juliana Amoasei',
    date: '22 de Abril, 2023',
    readTime: '4 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Ambiente+Estudos',
    category: 'Produtividade'
  },
  {
    id: 6,
    title: 'Soft skills: habilidades essenciais para o profissional de tecnologia',
    excerpt: 'Entenda por que as habilidades comportamentais são tão importantes quanto as técnicas no mercado de trabalho atual.',
    author: 'Carlos Eduardo',
    date: '15 de Abril, 2023',
    readTime: '5 min de leitura',
    image: 'https://via.placeholder.com/800x400?text=Soft+Skills',
    category: 'Carreira'
  }
];

const categories = ['Todos', 'Programação', 'UX & Design', 'Inteligência Artificial', 'Data Science', 'Produtividade', 'Carreira'];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-alura-blue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog da Alura</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Artigos, tutoriais e novidades do mundo da tecnologia e educação
            </p>
          </div>
        </section>
        
        {/* Search and Categories */}
        <section className="py-10 bg-alura-gray">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input placeholder="Buscar no blog..." className="max-w-md" />
                <Button className="bg-alura-blue">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                {categories.map(category => (
                  <Badge key={category} variant={category === 'Todos' ? "default" : "outline"} className="px-3 py-1 cursor-pointer">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Featured post */}
            <Card className="mb-10 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <CardContent className="md:w-1/2 p-8">
                  <Badge className="mb-4">{blogPosts[0].category}</Badge>
                  <h2 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h2>
                  <p className="text-alura-darkgray mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-alura-darkgray">
                    <div>
                      <p>{blogPosts[0].author}</p>
                      <p>{blogPosts[0].date}</p>
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <Button className="mt-6 bg-alura-blue">Ler artigo</Button>
                </CardContent>
              </div>
            </Card>
            
            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <div>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-alura-darkgray mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-alura-darkgray">
                      <div>
                        <p>{post.author}</p>
                        <p>{post.date}</p>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="outline" className="mt-4 w-full">Ler artigo</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
