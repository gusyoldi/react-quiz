-- Quiz: tecnologia TypeScript (generics)
-- Fuente: https://devtrium.com/posts/react-typescript-using-generics-in-react
-- Ejecutar en el SQL Editor de Supabase.

insert into public.technologies (slug, name)
values ('typescript', 'TypeScript')
on conflict (slug) do nothing;

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
    ('What do TypeScript generics primarily let you do?', '["Force every variable to use the any type", "Specify a type that can change depending on its usage", "Disable type checking for a function", "Convert TypeScript code into JavaScript"]'::jsonb, 1, 10),
    ('In "type User<StatusOptions>", what is StatusOptions called?', '["A type variable", "A type guard", "A namespace", "An enum"]'::jsonb, 0, 20),
    ('Which signature correctly types an identity function with generics?', '["function identity(arg: any): any", "function identity<ArgType>(arg: ArgType): ArgType", "function identity<ArgType>(arg: string): number", "function identity(arg: ArgType): ArgType"]'::jsonb, 1, 20),
    ('In a .tsx file, how do you write a generic arrow function so it is not parsed as JSX?', '["const identity = (arg: ArgType) => arg", "const identity = <ArgType>(arg: ArgType) => arg", "const identity = <ArgType,>(arg: ArgType) => arg", "const identity<ArgType> = (arg) => arg"]'::jsonb, 2, 30),
    ('What is the main return type of useState<S>?', '["S", "[S, Dispatch<SetStateAction<S>>]", "Dispatch<S>", "void"]'::jsonb, 1, 30),
    ('How is SetStateAction<S> defined?', '["S | ((prevState: S) => S)", "(value: S) => void", "S[]", "Promise<S>"]'::jsonb, 0, 30),
    ('How is Dispatch<A> defined?', '["(value: A) => void", "A | (() => A)", "() => A", "Array<A>"]'::jsonb, 0, 20),
    ('What is the common convention for naming a type variable in the wild?', '["Full descriptive words only", "Single uppercase letters like T", "snake_case names", "Prefixing every name with I"]'::jsonb, 1, 10),
    ('How many type variables can a generic function declare?', '["Exactly one", "At most two", "As many as you want", "Only as many as its arguments minus one"]'::jsonb, 2, 10),
    ('To restrict a generic Type so it can only be a number or a string, you write:', '["Type implements OptionValue", "Type extends OptionValue", "Type as OptionValue", "Type is OptionValue"]'::jsonb, 1, 20),
    ('Why does typing options as Option[] with value number or string NOT guarantee a consistent value type across the array?', '["Because arrays cannot hold objects", "Because each element can independently be a number or a string", "Because TypeScript ignores array types", "Because union types are not allowed in arrays"]'::jsonb, 1, 30),
    ('Why is using "any" discouraged for an identity function?', '["It is slower at runtime", "It loses the link between the argument and return types", "It is not valid TypeScript", "It only works in .tsx files"]'::jsonb, 1, 20)
) as q(question, options, correct_option, points)
where t.slug = 'typescript'
  and not exists (
    select 1 from public.questions existing
    where existing.technology_id = t.id and existing.question = q.question
  );
