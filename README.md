# React Quiz

¡Bienvenido a **React Quiz**, una app interactiva para practicar preguntas de React con TypeScript y Vite!

## 🚀 Qué hace esta app

React Quiz es un juego educativo que permite:

- Iniciar un quiz de preguntas sobre React.
- Seleccionar respuestas y ver los resultados al instante.
- Ver el progreso de la partida con puntaje y barra de avance.
- Usar un temporizador para cada sesión de preguntas.
- Finalizar el quiz y reiniciar la partida manteniendo el mejor puntaje.

## 🎯 Características principales

- Flujo completo de quiz: `loading`, `ready`, `active`, `finished`
- Control de respuestas correctas y puntaje acumulado
- Temporizador en tiempo real usando `useEffect`
- Componentes reutilizables: `Question`, `Options`, `Progress`, `Timer`, `FinishScreen`
- Preguntas almacenadas en `data/questions.json` servidas con `json-server`

## 🧰 Tecnologías

- React 19
- TypeScript
- Vite
- json-server
- ESLint

## 🧪 Cómo ejecutar

Instala dependencias:

```bash
pnpm install
```

Inicia el servidor de preguntas:

```bash
pnpm server
```

Y en otra terminal arranca la app:

```bash
pnpm dev
```

Luego abre `http://localhost:5173` en tu navegador.

## 📁 Estructura relevante

- `src/App.tsx` - lógica principal del quiz y estado global
- `src/components/` - UI y componentes del juego
- `data/questions.json` - preguntas y opciones del quiz
- `package.json` - scripts y dependencias del proyecto

## 💡 Ideal para tu perfil

Este proyecto es una buena demostración de:

- React con TypeScript
- manejo de estado con `useReducer`
- componentes modulares y reutilizables
- consumo de datos con `fetch`
- despliegue local con `Vite`

Si quieres, puedo también agregar una sección con un GIF o captura de pantalla para que quede aún más atractivo en tu perfil.
