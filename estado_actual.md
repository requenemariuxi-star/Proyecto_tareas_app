# 📊 Estado Actual del Proyecto
## Aplicación Móvil de Tareas Escolares

**Última actualización:** 2026-06-08  
**Responsable:** Daniela Mariuxi Requene Valencia  
**Sprint activo:** SPRINT 0 — Configuración del Entorno  
**Stack actual:** React.js + Capacitor + Node.js/Express + MySQL  

---

## 🔄 Progreso General

```
Configuración    [░░░░░░░░░░░░░░░░░░░░]   0%
Autenticación    [░░░░░░░░░░░░░░░░░░░░]   0%
Dashboard        [░░░░░░░░░░░░░░░░░░░░]   0%
Materias         [░░░░░░░░░░░░░░░░░░░░]   0%
Calendario       [░░░░░░░░░░░░░░░░░░░░]   0%
Notificaciones   [░░░░░░░░░░░░░░░░░░░░]   0%
Lista Tareas     [░░░░░░░░░░░░░░░░░░░░]   0%

TOTAL PROYECTO   [░░░░░░░░░░░░░░░░░░░░]   0%
```

> **Fase:** Planificación completada ✅ — Inicio de desarrollo pendiente

---

## 📋 Tareas por Estado

### ✅ Completado
- [x] Documento de propuesta del proyecto
- [x] Análisis de requerimientos
- [x] Definición de stack tecnológico (React.js + Capacitor)
- [x] Diseño de UI (mockup aprobado)
- [x] Plan de desarrollo (sprints definidos)
- [x] Documentación técnica y arquitectura

### 🔄 En Progreso
*(Ninguna tarea iniciada aún — en espera de setup del entorno)*

### ⏳ Pendiente — SPRINT 0
**Frontend:**
- [ ] Crear proyecto: `npm create vite@latest tareas-escolares -- --template react`
- [ ] Instalar Capacitor: `npm install @capacitor/core @capacitor/cli`
- [ ] Inicializar Capacitor: `npx cap init`
- [ ] Instalar plataforma Android: `npm install @capacitor/android && npx cap add android`
- [ ] Configurar `.env` con la URL del backend (`VITE_API_URL=http://localhost:3001`)
- [ ] Verificar build en navegador: `npm run dev`

**Backend:**
- [ ] Crear carpeta `backend/` e inicializar: `npm init -y`
- [ ] Instalar: `npm install express mysql2 jsonwebtoken bcryptjs cors dotenv`
- [ ] Crear archivo `backend/db.js` (conexión a MySQL `tareas`, root, sin contraseña)
- [ ] Ejecutar script SQL para crear tablas: `users`, `subjects`, `tasks`, `notifications`
- [ ] Verificar conexión MySQL en consola
- [ ] Levantar servidor Express en puerto 3001: `node server.js`

### ⏳ Pendiente — SPRINT 1
**Backend:**
- [ ] Endpoint `POST /api/auth/register` con hash bcrypt
- [ ] Endpoint `POST /api/auth/login` (devuelve JWT)
- [ ] Middleware `authMiddleware.js` para validar JWT
- [ ] Endpoints CRUD `/api/tasks`

**Frontend:**
- [ ] Componente `LoginPage` (consume `POST /api/auth/login`)
- [ ] Componente `RegisterPage` (consume `POST /api/auth/register`)
- [ ] Almacenar JWT en `localStorage`
- [ ] Hook `useAuth` con Zustand (`useAuthStore`)
- [ ] Componente `Dashboard` con lista de tareas del día
- [ ] Componente `TaskCard` (tarjeta de tarea individual)
- [ ] Componente `AddTaskModal` (formulario de nueva tarea)
- [ ] Servicio `api.js` (instancia Axios con baseURL y token JWT en headers)

### ⏳ Pendiente — SPRINT 2
- [ ] Componente `SubjectsPage` (grid de materias)
- [ ] Componente `SubjectFolder` (carpeta de materia)
- [ ] Componente `AddSubjectModal`
- [ ] Componente `CalendarPage`
- [ ] Componente `CalendarGrid` (cuadrícula mensual)
- [ ] Componente `DayTasksPanel` (panel lateral del día)
- [ ] Servicio `subjectsService.js`
- [ ] Store Zustand `useSubjectStore`

### ⏳ Pendiente — SPRINT 3
- [ ] Instalar `@capacitor/local-notifications`
- [ ] Servicio `notificationService.js`
- [ ] Lógica de programación de recordatorios al crear tarea
- [ ] Componente `NotificationsPage`
- [ ] Componente `NotificationCard`
- [ ] Componente `TaskListPage` (completadas/pendientes)
- [ ] Componente `TaskFilter` (filtros por materia)

### ⏳ Pendiente — SPRINT 4
- [ ] QA y corrección de bugs
- [ ] Optimización con React.lazy + Suspense
- [ ] Pruebas en dispositivo físico Android
- [ ] Ajustes de estilos responsivos
- [ ] `npm run build` → `npx cap sync` → `npx cap open android`
- [ ] Generar APK firmada desde Android Studio
- [ ] Documentación de usuario final

---

## 🚧 Bloqueos Actuales

| # | Bloqueo | Impacto | Solución |
|---|---|---|---|
| 1 | Proyecto no inicializado | 🔴 Alto | Ejecutar comandos de SPRINT 0 |
| 2 | Firebase sin configurar | 🔴 Alto | Crear proyecto en Firebase Console |
| 3 | Android Studio requerido | 🟠 Medio | Instalar Android Studio si no está |

---

## 📅 Próximos Pasos Inmediatos

1. **Hoy:** Crear el proyecto React con Vite
2. **Hoy:** Configurar Capacitor y agregar plataforma Android
3. **Mañana:** Crear proyecto en Firebase y conectar SDK
4. **Esta semana:** Completar SPRINT 1 (Login + Dashboard)

---

## 📝 Notas y Decisiones

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-06-08 | Cambio de Flutter → React.js + Capacitor | Mayor familiaridad con JS/React en el equipo |
| 2026-06-08 | Se elige Zustand sobre Redux | Menor boilerplate, más simple para el alcance |
| 2026-06-08 | Vite como build tool (no CRA) | CRA está deprecado, Vite es más rápido |
| 2026-06-08 | Cambio de Firebase → MySQL + Node.js/Express | Base de datos local requerida por el proyecto |
| 2026-06-08 | Autenticación con JWT en lugar de Firebase Auth | MySQL no tiene auth propio, se usa JWT manual |
| 2026-06-08 | DB: `tareas`, usuario: `root`, contraseña: vacía | Entorno local de desarrollo |

---

*Actualizar este documento al iniciar y completar cada tarea.*
