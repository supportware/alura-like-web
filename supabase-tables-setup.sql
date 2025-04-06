-- Script para criar as tabelas FAQs e Stats no Supabase

-- Tabela FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir alguns dados iniciais de FAQ
INSERT INTO public.faqs (question, answer) VALUES 
('Como funciona o método de ensino da Alura?', 'Nosso método de ensino é baseado em cursos práticos e projetos reais, com suporte de instrutores experientes e comunidade ativa.'),
('Quais são as formas de pagamento?', 'Aceitamos cartões de crédito, boleto bancário e PIX. Oferecemos pagamentos mensais ou anuais com desconto.'),
('Os certificados são reconhecidos pelo mercado?', 'Sim, nossos certificados são amplamente reconhecidos no mercado de tecnologia e validam suas habilidades em projetos reais.'),
('Posso acessar o conteúdo offline?', 'Sim, nosso aplicativo permite que você baixe aulas para assistir offline, facilitando o aprendizado mesmo sem internet.'),
('Qual a duração média dos cursos?', 'Nossos cursos têm duração variada, desde cursos rápidos de 4 horas até formações completas que podem levar de 2 a 6 meses.');

-- Tabela de Estatísticas
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    value TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir estatísticas iniciais
INSERT INTO public.stats (title, value, icon) VALUES 
('Alunos', '150.000+', 'Users'),
('Cursos', '1.500+', 'BookOpen'),
('Horas de conteúdo', '5.000+', 'Clock'),
('Projetos completos', '300+', 'Code'),
('Instrutores', '120+', 'GraduationCap');

-- Configurar permissões (somente se necessário)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- Políticas para acesso anônimo (leitura)
CREATE POLICY "Permitir leitura pública de FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de Stats" ON public.stats FOR SELECT USING (true);

-- Políticas para usuários autenticados (CRUD completo)
CREATE POLICY "Permitir CRUD para usuários autenticados em FAQs" ON public.faqs 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir CRUD para usuários autenticados em Stats" ON public.stats 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
