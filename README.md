# Sistema General de Bolsa de Trabajo UAQ (Frontend)

Un front-end en **Next.js + TypeScript** para el **Sistema General de Bolsa de Trabajo UAQ**, que conecta a la comunidad universitaria (alumnos de últimos semestres y recién egresados) con empresas que requieren talento.

>  **Personal Contribution**
>  
> This repository is a fork of the official *Sistema General de Bolsa de Trabajo UAQ* project,
> developed as part of the **Centro de Desarrollo UAQ**.
>  
> **My role in this project:**
> - Frontend development with **Next.js 15 & TypeScript**
> - Implementation of reusable UI components (Shadcn/UI, Tailwind)
> - Form validation with **Zod**
> - Participation in feature development and bug fixes
> - - Maintenance and implementation of existing frontend components within a large-scale Next.js codebase
> - Collaboration using Git, branches and Pull Requests

---

## Tabla de contenidos

- [Tecnologías](#tecnologías)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Scripts](#scripts)
- [Variables de entorno](#variables-de-entorno)
- [Estructura de carpetas y convenciones](#estructura-de-carpetas-y-convenciones)
- [Flujo de contribución](#flujo-de-contribión)
- [Equipo](#equipo)
- [Licencia](#licencia)

---

## Tecnologías

- **Node.js** ≥ 22.12.0
- **npm** ≥ 11.3.0
- **Next.js** 15.2.1
- **React** 19.0.0
- **TypeScript** 5.x
- **Tailwind CSS**, **Prettier**, **ESLint**
- **Zod** (validaciones)
- **Shadcn/UI** (componentes)
- Diversas librerías Radix UI y NextUI (Remover o actualizar NextUI a futuro)

---

## Prerrequisitos

- Tener instalado Node.js (22.12.0 o superior) y npm (11.3.0 o superior).
- Git para clonar y trabajar con forks.

---

## Instalación

```bash
# 1. Clona el repo (usa tu fork si contribuyes)
git clone https://github.com/Centro-de-Desarrollo-UAQ/uaq-bolsa-trabajo-frontend.git
cd uaq-bolsa-trabajo-frontend

# 2. Instala dependencias
npm install

# 3. Arranca en modo desarrollo
npm run dev
```

---

## Scripts

Estos son los comandos disponibles en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack", // desarrollo con recarga en caliente
    "build": "next build", // genera la versión de producción
    "start": "next start", // sirve la build en producción
    "lint": "next lint", // revisa con ESLint
    "format": "prettier --write ." // formatea con Prettier
  }
}
```

---

## Variables de entorno

- No hay por el momento

---

## Estructura de carpetas y convenciones

```
/
├── public/                # assets estáticos (imágenes, íconos…)
├── src/
│   ├── app/
│   │   ├── testing/       # pruebas visuales de componentes
│   │   └── [rutas]/       # páginas principales de la app (Next.js App Router)
│   ├── components/        # componentes React
│   │   ├── common/        # componentes genéricos (Botones, Inputs…)
│   │   ├── ui/            # únicos de Shadcn (minúscula)
│   │   └── [módulo]/      # componentes de dominio (mayúscula)
│   ├── interfaces/        # definiciones TypeScript
│   │   ├── [grupo].tsx    # interfaz de cada grupo
│   │   └── index.ts       # reexporta todas
│   ├── constants/         # constantes estáticas
│   │   ├── [grupo].tsx    # constantes de cada grupo
│   │   └── index.ts       # reexporta todas
│   └── validations/       # esquemas Zod
├── .prettierignore
├── prettier.config.js
├── package.json
└── README.md
```

### Convenciones de código

1. **Componentes**

   - Los que creas **desde cero**: nombre en **Mayúscula** (`MyButton.tsx`).
   - Los de **Shadcn/UI**: nombre en **minúscula** (`button.tsx`), y si los modificas añade al inicio:
     ```tsx
     //* New styles added
     ```
   - La carpeta `ui/` es **solo** para Shadcn.

2. **Idioma**

   - **Código** (variables, funciones, archivos, interfaces…) en **inglés**.
   - **Textos** mostrados al usuario en **español**.

3. **Interfaces y constantes**
   - Cada dominio en su propio archivo dentro de `interfaces/` o `constants/`.
   - Reexportar todo en `interfaces/index.ts` y `constants/index.ts`.
   - **No declarar nada más** en los archivos `index.ts`.

---

## Flujo de contribución

1. **Fork** del repositorio oficial.
2. Crea una rama `feature/tu-descripción` o `fix/tu-descripción`.
3. Haz tus cambios, formatea (`npm run format`) y comprueba lint (`npm run lint`).
4. Abre un **Pull Request** desde tu fork hacia `main`.

### Formato de Pull Requests

Para mantener un flujo de trabajo limpio y consistente, por favor sigue este formato al crear una PR:

#### Titulo

`[feat|fix|chore|docs|refactor|test|style] breve descripción del cambio`

#### Descripción

Incluye una descripción clara de la tarea realizada.

##### Componentes / Pantallas modificadas o creadas

Lista los archivos modificados o agregados. Ejemplo:

- `src/components/NombreComponente.tsx`
- `src/app/NombreRuta/page.tsx`
- `src/services/apiService.ts`

##### Capturas (si aplica)

Si el cambio afecta el diseño, interfaz o interacción, añade capturas de pantalla o GIFs.

**Antes:**

[imagen o descripción]

**Después:**

[imagen o descripción]

---



---

## Licencia

Este repositorio **no** tiene licencia.  
Si en el futuro decidimos adoptar una, se documentará aquí.
