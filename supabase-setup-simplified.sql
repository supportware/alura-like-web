-- Script para criar as tabelas FAQs e Stats no Supabase (versão simplificada)

-- Tabela FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Estatísticas
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    value TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir alguns dados iniciais de FAQ (opcional)
INSERT INTO public.faqs (question, answer) VALUES 
('Como funciona o método de ensino da Excel?', 'Nosso método de ensino é baseado em cursos práticos e projetos reais, com suporte de instrutores experientes e comunidade ativa.'),
('Quais são as formas de pagamento?', 'Aceitamos cartões de crédito, boleto bancário e PIX. Oferecemos pagamentos mensais ou anuais com desconto.');

-- Inserir estatísticas iniciais (opcional)
INSERT INTO public.stats (title, value, icon) VALUES 
('Alunos', '150.000+', 'Users'),
('Cursos', '1.500+', 'BookOpen');
