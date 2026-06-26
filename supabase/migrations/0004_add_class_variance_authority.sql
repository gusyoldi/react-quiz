-- Quiz: tecnologia Class Variance Authority (CVA)
-- Fuente: https://stevekinney.com/courses/storybook/class-variance-authority
-- Ejecutar en el SQL Editor de Supabase.

insert into public.technologies (slug, name, color)
values ('class-variance-authority', 'Class Variance Authority', '#a855f7')
on conflict (slug) do update set name = excluded.name, color = excluded.color;

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
    ('What is Class Variance Authority (CVA)?', '["A CSS preprocessor that replaces Sass", "A framework-agnostic tool for creating component variants with different classes", "A React-only state management library", "A bundler for component libraries"]'::jsonb, 1, 10),
    ('Which function do you import from "class-variance-authority" to define variants?', '["variant", "cva", "createVariants", "classVariance"]'::jsonb, 1, 10),
    ('Does CVA require Tailwind CSS to work?', '["Yes, it only works with Tailwind", "No, it works with any utility classes, even CSS module classes", "Yes, but only in React projects", "No, but it requires PostCSS"]'::jsonb, 1, 20),
    ('What does the first argument passed to cva() represent?', '["The default variant", "The base styles applied to every variant", "The list of compound variants", "The TypeScript types"]'::jsonb, 1, 20),
    ('Where do you define the styles unique to each variant?', '["In the base styles array", "In the variants object of the second argument", "In a separate CSS file", "In the defaultVariants object"]'::jsonb, 1, 20),
    ('What is the purpose of defaultVariants in a cva() config?', '["To disable variants entirely", "To define which variant applies when none is explicitly specified", "To list every possible variant value", "To set the base styles"]'::jsonb, 1, 20),
    ('What is a compound variant in CVA?', '["A variant that extends another component", "Styles applied when a specific combination of variants is active", "A variant defined in a separate file", "A variant that only works with Tailwind"]'::jsonb, 1, 30),
    ('Which helper type generates a TypeScript type from your cva config?', '["TypeOf", "VariantProps", "ComponentProps", "InferVariants"]'::jsonb, 1, 20),
    ('How do you derive a type from your variants object?', '["type ButtonVariants = typeof variants", "type ButtonVariants = VariantProps<typeof variants>", "type ButtonVariants = cva<variants>", "type ButtonVariants = Variants(variants)"]'::jsonb, 1, 30),
    ('Why is CVA considered framework-agnostic?', '["It compiles to native code", "It returns a plain JavaScript object usable with React, Svelte, and others", "It ships its own rendering engine", "It only outputs HTML"]'::jsonb, 1, 30),
    ('In the example, what was defaultVariants.variant set to?', '["primary", "secondary", "destructive", "ghost"]'::jsonb, 1, 10),
    ('What lets you share your component styling across frameworks with CVA?', '["Using only CSS variables", "Combining CVA with TypeScript and VariantProps", "Avoiding utility classes", "Writing separate components per framework"]'::jsonb, 1, 20)
) as q(question, options, correct_option, points)
where t.slug = 'class-variance-authority'
  and not exists (
    select 1 from public.questions existing
    where existing.technology_id = t.id and existing.question = q.question
  );
