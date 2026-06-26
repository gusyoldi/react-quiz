-- React Quiz: esquema inicial
-- Ejecutar en el SQL Editor de Supabase.

-- =========================================
-- Tablas
-- =========================================
create table if not exists public.technologies (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id bigint generated always as identity primary key,
  technology_id bigint not null references public.technologies (id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_option int not null,
  points int not null default 10,
  created_at timestamptz not null default now()
);

-- =========================================
-- Indices
-- =========================================
create index if not exists technologies_slug_idx on public.technologies (slug);
create index if not exists questions_technology_id_idx on public.questions (technology_id);

-- =========================================
-- RLS + policies de lectura publica
-- (necesario para que la publishable/anon key pueda leer)
-- =========================================
alter table public.technologies enable row level security;
alter table public.questions enable row level security;

drop policy if exists "Public read technologies" on public.technologies;
create policy "Public read technologies"
  on public.technologies
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read questions" on public.questions;
create policy "Public read questions"
  on public.questions
  for select
  to anon, authenticated
  using (true);

-- =========================================
-- Seed: tecnologia react
-- =========================================
insert into public.technologies (slug, name)
values ('react', 'React')
on conflict (slug) do nothing;

-- =========================================
-- Seed: preguntas de react
-- =========================================
insert into public.questions (technology_id, question, options, correct_option, points)
select
  t.id,
  q.question,
  q.options,
  q.correct_option,
  q.points
from public.technologies t
cross join (
  values
    ('Which is the most popular JavaScript framework?', '["Angular", "React", "Svelte", "Vue"]'::jsonb, 1, 10),
    ('Which company invented React?', '["Google", "Apple", "Netflix", "Facebook"]'::jsonb, 3, 10),
    ('What''s the fundamental building block of React apps?', '["Components", "Blocks", "Elements", "Effects"]'::jsonb, 0, 10),
    ('What''s the name of the syntax we use to describe the UI in React components?', '["FBJ", "Babel", "JSX", "ES2015"]'::jsonb, 2, 10),
    ('How does data flow naturally in React apps?', '["From parents to children", "From children to parents", "Both ways", "The developers decides"]'::jsonb, 0, 10),
    ('How to pass data into a child component?', '["State", "Props", "PropTypes", "Parameters"]'::jsonb, 1, 10),
    ('When to use derived state?', '["Whenever the state should not trigger a re-render", "Whenever the state can be synchronized with an effect", "Whenever the state should be accessible to all components", "Whenever the state can be computed from another state variable"]'::jsonb, 3, 30),
    ('What triggers a UI re-render in React?', '["Running an effect", "Passing props", "Updating state", "Adding event listeners to DOM elements"]'::jsonb, 2, 20),
    ('When do we directly "touch" the DOM in React?', '["When we need to listen to an event", "When we need to change the UI", "When we need to add styles", "Almost never"]'::jsonb, 3, 20),
    ('In what situation do we use a callback to update state?', '["When updating the state will be slow", "When the updated state is very data-intensive", "When the state update should happen faster", "When the new state depends on the previous state"]'::jsonb, 3, 30),
    ('If we pass a function to useState, when will that function be called?', '["On each re-render", "Each time we update the state", "Only on the initial render", "The first time we update the state"]'::jsonb, 2, 30),
    ('Which hook to use for an API request on the component''s initial render?', '["useState", "useEffect", "useRef", "useReducer"]'::jsonb, 1, 10),
    ('Which variables should go into the useEffect dependency array?', '["Usually none", "All our state variables", "All state and props referenced in the effect", "All variables needed for clean up"]'::jsonb, 2, 30),
    ('An effect will always run on the initial render.', '["True", "It depends on the dependency array", "False", "In depends on the code in the effect"]'::jsonb, 0, 30),
    ('When will an effect run if it doesn''t have a dependency array?', '["Only when the component mounts", "Only when the component unmounts", "The first time the component re-renders", "Each time the component is re-rendered"]'::jsonb, 3, 20)
) as q(question, options, correct_option, points)
where t.slug = 'react'
  and not exists (
    select 1 from public.questions existing
    where existing.technology_id = t.id and existing.question = q.question
  );
