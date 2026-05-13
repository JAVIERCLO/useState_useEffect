## 📌 Pomodoro Timer — useEffect & useState

### 🧾 Descripción

Implementación progresiva de un Pomodoro Timer en React, desarrollada como ejercicio para practicar los hooks `useState`, `useEffect` y `useRef`.

El proyecto está dividido en 3 niveles de dificultad creciente, donde cada nivel extiende al anterior. Desde un timer básico hasta un temporizador completo con cambio automático de modos, historial de sesiones, barra de progreso circular, sonido y estadísticas acumuladas.

### 🛠️ Herramientas utilizadas

- React 18 con Vite
- JavaScript (ES6+)
- Hooks: `useState`, `useEffect`, `useRef`
- SVG nativo para la barra de progreso circular
- Web Audio API (`new Audio().play()`) para la alerta sonora

### ⚙️ Funcionalidades

- **Nivel 1:** Timer de cuenta regresiva de 25 minutos con botones de Iniciar/Pausar y Reiniciar
- **Nivel 2:** Alternancia automática entre modo trabajo (25 min) y descanso (5 min), con historial de sesiones completadas
- **Nivel 3:** Configuración personalizada de tiempos, barra de progreso circular en SVG, alerta sonora al completar sesión, estadísticas acumuladas y guardado de sesiones parciales

### 🌐 Recursos externos

- Sonido: `https://actions.google.com/sounds/v1/alarms/beep_short.ogg`
- Documentación de hooks: `https://react.dev/reference/react`

### ▶️ Instrucciones para ejecutar el proyecto

**1. Clonar repositorio**

bash

```bash
git clone https://github.com/JAVIERCLO/useState_useEffect
```

**2. Entrar al proyecto**

bash

```bash
cd pomodoro-level
```

**3. Instalar dependencias**

bash

```bash
npm install
```

**4. Ejecutar el proyecto**

bash

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador. Desde ahí puedes navegar entre los 3 niveles.

### 👥 Integrantes

- Javier Chávez

### Link a video de demostración
`https://www.youtube.com/watch?v=wVqTXraLFnQ`