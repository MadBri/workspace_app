# WorkSpace App 🚀

Aplicación web full-stack con React + NestJS, autenticación JWT y canvas drag & drop.

## Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS, @dnd-kit, React Router
- **Backend:** NestJS, TypeORM, SQLite, JWT, Passport
- **Auth:** JWT con bcrypt

## Estructura del Proyecto

```
proyecto/
├── frontend/         # React + Vite
└── backend/          # NestJS REST API
```

## Instalación y ejecución

### Requisitos
- Node.js v20+
- npm v9+

### Backend
```bash
cd backend
npm install
npm run start:dev
# Corre en http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Corre en http://localhost:5173
```

## API Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /auth/register | No | Registrar usuario |
| POST | /auth/login | No | Iniciar sesión |
| GET | /users/me | JWT | Perfil del usuario |

## Funcionalidades

- ✅ Registro e inicio de sesión con JWT
- ✅ Rutas protegidas
- ✅ Dashboard con canvas drag & drop
- ✅ Componentes arrastrables: Texto, Imagen, Botón, Tarjeta
- ✅ Eliminar componentes del canvas
- ✅ Limpiar canvas completo

## Ramas de Git

- `main` — código estable en producción
- `develop` — desarrollo activo
- `develop_test` — pruebas de integración

## Setup de ramas en GitHub

```bash
git init
git add .
git commit -m "feat: initial project setup"
git remote add origin https://github.com/TU_USUARIO/workspace-app.git
git push -u origin main

git checkout -b develop
git push origin develop

git checkout -b develop_test
git push origin develop_test
```
