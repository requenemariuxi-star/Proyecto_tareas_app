# 📋 Plan de Desarrollo
## Aplicación Móvil de Tareas Escolares

**Institución:** Instituto Superior Tecnológico Alberto Enríquez  
**Carrera:** Desarrollo de Software  
**Responsable:** Daniela Mariuxi Requene Valencia  
**Fecha de inicio:** 2026-06-08  
**Stack:** React.js + Capacitor + Node.js/Express + MySQL  

---

## 🎯 Objetivo del Proyecto

Desarrollar una aplicación móvil multiplataforma (Android/iOS) que permita a estudiantes de escuela, colegio e instituto **gestionar, organizar y hacer seguimiento de sus tareas escolares** de manera sencilla, visual e intuitiva.

---

## 🛠️ Stack Tecnológico Adaptado

| Capa | Tecnología | Justificación |
|---|---|---|
| **UI Framework** | React.js 18+ | Componentes reutilizables, ecosistema maduro |
| **Build Tool** | Vite | Compilación rápida, HMR eficiente |
| **Mobile Bridge** | Capacitor 6 | Convierte la web app a APK/IPA nativa |
| **Routing** | React Router v6 | Navegación SPA declarativa |
| **Estado Global** | Zustand | Liviano, sin boilerplate de Redux |
| **Backend API** | Node.js + Express | REST API que conecta React con MySQL |
| **Base de Datos** | MySQL (db: `tareas`, user: `root`) | Relacional, SQL estándar |
| **ORM / Driver** | mysql2 (npm) | Driver rápido para Node.js |
| **Autenticación** | JWT (jsonwebtoken) | Tokens seguros sin Firebase |
| **HTTP Client** | Axios | Peticiones al backend desde React |
| **Notificaciones** | Capacitor Local Notifications | Push notifications locales nativas |
| **Estilos** | CSS Modules + Variables CSS | Sin dependencias de terceros |
| **IDE** | Visual Studio Code | |

---

## 📦 Fases de Desarrollo (Metodología Scrum)

### 🔵 SPRINT 0 — Configuración del Entorno
**Duración:** Semana 1 (días 1-3)

**Frontend (React + Capacitor):**
- [ ] Inicializar proyecto con Vite + React
- [ ] Instalar y configurar Capacitor
- [ ] Configurar Android Studio para build en Android
- [ ] Definir estructura de carpetas del proyecto
- [ ] Configurar variables de entorno (`.env`)

**Backend (Node.js + MySQL):**
- [ ] Inicializar proyecto backend: `npm init -y`
- [ ] Instalar dependencias: `npm install express mysql2 jsonwebtoken bcryptjs cors dotenv`
- [ ] Crear base de datos MySQL: `CREATE DATABASE tareas;`
- [ ] Ejecutar script de creación de tablas (users, subjects, tasks)
- [ ] Verificar conexión MySQL con usuario `root` y contraseña vacía
- [ ] Levantar servidor Express en puerto 3001

**Entregable:** Frontend corriendo en navegador, backend respondiendo en `localhost:3001`, MySQL conectado.

---

### 🟡 SPRINT 1 — Autenticación y Dashboard
**Duración:** Semana 1 (días 4-7)

#### Backend:
- [ ] Endpoint `POST /api/auth/register` — registro de usuario
- [ ] Endpoint `POST /api/auth/login` — login, devuelve JWT
- [ ] Middleware de autenticación JWT
- [ ] Endpoints CRUD de tareas: `GET/POST/PUT/DELETE /api/tasks`

#### Frontend:
- [ ] Pantalla de Login / Registro (consume API REST)
- [ ] Almacenar JWT en localStorage
- [ ] Pantalla de Dashboard principal (Main Dashboard)
  - [ ] Lista de tareas del día (fetch a `/api/tasks`)
  - [ ] Botón "Agregar Tarea"
  - [ ] Avatar e información del usuario
- [ ] Formulario de creación de tarea (modal/drawer)
  - [ ] Campos: título, materia, fecha de entrega, descripción

**Entregable:** Login funcional con JWT + CRUD de tareas contra MySQL.

---

### 🟠 SPRINT 2 — Materias y Calendario
**Duración:** Semana 2

#### Funcionalidades:
- [ ] Pantalla de **Organización por Materias**
  - [ ] Grid de carpetas por materia con colores
  - [ ] CRUD de materias (crear, editar, eliminar)
  - [ ] Lista de tareas pendientes/completadas por materia
- [ ] Pantalla de **Calendario Escolar**
  - [ ] Vista mensual con navegación
  - [ ] Puntos de colores por materia en cada día
  - [ ] Click en día → panel de tareas del día
- [ ] Asignar colores únicos por materia

**Entregable:** Módulo de materias y calendario totalmente funcional.

---

### 🔴 SPRINT 3 — Notificaciones y Lista de Tareas
**Duración:** Semana 3

#### Funcionalidades:
- [ ] **Notificaciones locales** con Capacitor Local Notifications
  - [ ] Recordatorio automático 1 día antes de la entrega
  - [ ] Notificación al completar una tarea (logro)
- [ ] **Panel de Notificaciones** en la app
  - [ ] Historial de notificaciones recibidas
- [ ] **Lista de Tareas Completadas y Pendientes**
  - [ ] Tabs: Pendientes / Completadas
  - [ ] Checkbox para marcar/desmarcar tareas
  - [ ] Filtro por materia

**Entregable:** Notificaciones locales activas + módulo de seguimiento de tareas.

---

### 🟢 SPRINT 4 — Pulido, Pruebas y Despliegue
**Duración:** Semana 4

#### Actividades:
- [ ] Revisión y corrección de errores (QA)
- [ ] Optimización de rendimiento (lazy loading de rutas)
- [ ] Pruebas en dispositivo Android físico
- [ ] Ajustes de diseño responsivo (pantallas 5" a 6.5")
- [ ] Generación de APK de producción con Capacitor
- [ ] Documentación de usuario final
- [ ] Presentación del proyecto

**Entregable:** APK funcional listo para demostración.

---

## 🗓️ Cronograma Visual

```
Sem 1    |█ SPRINT 0 (config) ██████ SPRINT 1 (auth + dashboard) █|
Sem 2    |█████████ SPRINT 2 (materias + calendario) ██████████████|
Sem 3    |███████ SPRINT 3 (notificaciones + lista tareas) █████████|
Sem 4    |████████████ SPRINT 4 (pruebas + APK final) ██████████████|
```

---

## 📊 Prioridad de Funcionalidades (MoSCoW)

| Prioridad | Funcionalidad |
|---|---|
| 🔴 **Must Have** | Login, agregar tarea, ver tareas del día |
| 🔴 **Must Have** | Organización por materias |
| 🟠 **Should Have** | Calendario escolar con colores |
| 🟠 **Should Have** | Notificaciones locales |
| 🟡 **Could Have** | Sincronización en tiempo real multi-dispositivo |
| 🟡 **Could Have** | Modo oscuro |
| 🟢 **Won't Have (v1)** | Compartir tareas entre estudiantes |

---

## ✅ Criterios de Aceptación del Proyecto

1. La app compila y corre como APK en Android sin errores.
2. Un usuario puede registrarse, iniciar sesión y cerrar sesión.
3. Se pueden crear, editar y eliminar tareas con materia y fecha.
4. El calendario muestra las tareas con código de colores por materia.
5. Las notificaciones aparecen 1 día antes del vencimiento de una tarea.
6. La lista de pendientes/completadas funciona con checkbox.
7. El diseño es responsivo y funciona en pantallas de 5" a 6.5".
