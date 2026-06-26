-- StackQuiz: color por tecnologia
-- Ejecutar en el SQL Editor de Supabase.

alter table public.technologies
  add column if not exists color text not null default '#18c5d8';

-- Backfill de colores por tecnologia
update public.technologies set color = '#61dafb' where slug = 'react';
update public.technologies set color = '#3178c6' where slug = 'typescript';
