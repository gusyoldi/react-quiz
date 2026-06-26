# React Quiz

¡Bienvenido a **React Quiz**, una app interactiva para practicar preguntas de React con TypeScript y Vite!

## 🚀 Qué hace esta app

React Quiz es un juego educativo que permite:

- Elegir una tecnología desde un filtro y jugar su quiz.
- Seleccionar respuestas y ver los resultados al instante.
- Ver el progreso de la partida con puntaje y barra de avance.
- Usar un temporizador para cada sesión de preguntas.
- Finalizar el quiz y reiniciar la partida manteniendo el mejor puntaje.

## 🎯 Características principales

- Flujo completo de quiz: `loading`, `ready`, `active`, `finished`
- Control de respuestas correctas y puntaje acumulado
- Temporizador en tiempo real usando `useEffect`
- Componentes reutilizables: `Question`, `Options`, `Progress`, `Timer`, `FinishScreen`
- Preguntas almacenadas en Supabase (Postgres), organizadas por tecnología (slug)

## 🧰 Tecnologías

- React 19
- TypeScript
- Vite
- Supabase (Postgres)
- ESLint

## 🧪 Cómo ejecutar

Instala dependencias:

```bash
pnpm install
```

### Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecuta el contenido de `supabase/migrations/0001_init_quiz.sql` (crea las tablas, las policies de RLS y carga las preguntas de ejemplo).
3. Copia `.env.example` a `.env` y completa con tus credenciales:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-publishable-key
```

> La `VITE_SUPABASE_KEY` es la publishable key (segura para el cliente). Nunca uses la `service_role`/secret key en el frontend.

### Arrancar la app

```bash
pnpm dev
```

Luego abre `http://localhost:5173` en tu navegador.

## 📁 Estructura relevante

- `src/App.tsx` - lógica principal del quiz y estado global
- `src/components/` - UI y componentes del juego
- `src/context/QuizContext.tsx` - estado global y consulta a Supabase
- `src/lib/supabase.ts` - cliente de Supabase
- `supabase/migrations/` - esquema SQL y seed de preguntas
- `package.json` - scripts y dependencias del proyecto

## 💡 Ideal para tu perfil

Este proyecto es una buena demostración de:

- React con TypeScript
- manejo de estado con `useReducer`
- componentes modulares y reutilizables
- consumo de datos desde Supabase con `@supabase/supabase-js`
- despliegue local con `Vite`

Si quieres, puedo también agregar una sección con un GIF o captura de pantalla para que quede aún más atractivo en tu perfil.
