# 🏛️ Documentación Técnica y Arquitectura
## Aplicación Móvil de Tareas Escolares

**Stack:** React.js 18 + Vite + Capacitor 6 + Node.js/Express + MySQL  
**Versión del documento:** 2.0  
**Fecha:** 2026-06-08  

---

## 1. Arquitectura General del Sistema

```
┌──────────────────────────────────────────────────────┐
│                  DISPOSITIVO ANDROID                  │
│                                                      │
│   ┌──────────────────────────────────────────────┐   │
│   │           CAPACITOR (Bridge Nativo)           │   │
│   │  ┌────────────────────────────────────────┐  │   │
│   │  │         WEBVIEW  —  React App           │  │   │
│   │  │                                        │  │   │
│   │  │  Pages ──▶ Components ──▶ Zustand      │  │   │
│   │  │                              │         │  │   │
│   │  │                         Axios (HTTP)   │  │   │
│   │  └──────────────────────────────┬─────────┘  │   │
│   │                                 │             │   │
│   │  ┌──────────────────────────────▼─────────┐  │   │
│   │  │    Capacitor Local Notifications        │  │   │
│   │  └─────────────────────────────────────────┘  │   │
│   └──────────────────────────────────────────────┘   │
└─────────────────────────────┬────────────────────────┘
                              │ HTTP REST (JSON)
                              │ http://[IP_SERVIDOR]:3001
                              ▼
┌─────────────────────────────────────────────────────┐
│              BACKEND  —  Node.js + Express           │
│                                                     │
│   Router → Controllers → Services → mysql2          │
│   Middleware JWT Auth                               │
│   CORS habilitado para Capacitor                    │
└─────────────────────────────┬───────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│           BASE DE DATOS  —  MySQL                   │
│                                                     │
│   DB: tareas  |  User: root  |  Password: (vacía)   │
│   Tablas: users, subjects, tasks, notifications     │
└─────────────────────────────────────────────────────┘
```

---

## 2. Diagrama de Capas

```
┌────────────────────────────────────────────────────┐
│  CAPA DE PRESENTACIÓN  (React Pages)               │
│  LoginPage, Dashboard, Calendar, Subjects,         │
│  Notifications, TaskList                           │
├────────────────────────────────────────────────────┤
│  CAPA DE COMPONENTES  (React Components)           │
│  TaskCard, SubjectFolder, CalendarGrid,            │
│  NotificationCard, AddTaskModal, BottomNav         │
├────────────────────────────────────────────────────┤
│  CAPA DE ESTADO  (Zustand Stores)                  │
│  useAuthStore | useTaskStore | useSubjectStore     │
├────────────────────────────────────────────────────┤
│  CAPA HTTP  (Axios)                                │
│  src/services/api.js  —  baseURL + JWT header      │
├────────────────────────────────────────────────────┤
│  CAPA DE API REST  (Node.js + Express)             │
│  /api/auth  |  /api/tasks  |  /api/subjects        │
│  /api/notifications                                │
├────────────────────────────────────────────────────┤
│  CAPA DE BASE DE DATOS  (MySQL — mysql2)           │
│  DB: tareas | users, subjects, tasks, notifications│
└────────────────────────────────────────────────────┘
```

---

## 3. Estructura de Carpetas del Proyecto

```
tareas-escolares-app/
│
├── frontend/                         ← React.js + Capacitor
│   ├── android/                      ← Generado por Capacitor
│   ├── public/
│   │   └── icon.png
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── BottomNav/
│   │   │   │   ├── BottomNav.jsx
│   │   │   │   └── BottomNav.module.css
│   │   │   ├── TaskCard/
│   │   │   ├── AddTaskModal/
│   │   │   ├── SubjectFolder/
│   │   │   ├── CalendarGrid/
│   │   │   ├── DayTasksPanel/
│   │   │   └── NotificationCard/
│   │   ├── pages/
│   │   │   ├── LoginPage/
│   │   │   ├── DashboardPage/
│   │   │   ├── SubjectsPage/
│   │   │   ├── CalendarPage/
│   │   │   ├── NotificationsPage/
│   │   │   └── TaskListPage/
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useTaskStore.js
│   │   │   └── useSubjectStore.js
│   │   ├── services/
│   │   │   └── api.js                ← Instancia Axios centralizada
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTasks.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── tokens.css
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── capacitor.config.json
│   ├── .env                          ← VITE_API_URL=http://localhost:3001
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                          ← Node.js + Express + MySQL
    ├── src/
    │   ├── config/
    │   │   └── db.js                 ← Conexión MySQL
    │   ├── middleware/
    │   │   └── authMiddleware.js     ← Validación JWT
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   ├── tasks.routes.js
    │   │   ├── subjects.routes.js
    │   │   └── notifications.routes.js
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── tasks.controller.js
    │   │   ├── subjects.controller.js
    │   │   └── notifications.controller.js
    │   └── services/
    │       └── notification.service.js
    ├── sql/
    │   └── schema.sql                ← Script de creación de tablas
    ├── .env                          ← DB_HOST, DB_USER, DB_PASS, JWT_SECRET
    ├── server.js
    └── package.json
```

---

## 4. Esquema de Base de Datos — MySQL

### Script SQL — `backend/sql/schema.sql`

```sql
-- Base de datos: tareas
-- Usuario: root | Contraseña: (vacía)

CREATE DATABASE IF NOT EXISTS tareas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tareas;

-- ─── TABLA: users ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,       -- hash bcrypt
  created_at  DATETIME      DEFAULT NOW()
);

-- ─── TABLA: subjects (materias) ─────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  name        VARCHAR(100)  NOT NULL,       -- "Matemáticas"
  color       VARCHAR(7)    NOT NULL,       -- "#00BFA5"
  icon        VARCHAR(10)   DEFAULT '📚',
  created_at  DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── TABLA: tasks ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT           NOT NULL,
  subject_id       INT,                          -- puede ser NULL
  title            VARCHAR(200)  NOT NULL,
  description      TEXT,
  due_date         DATETIME      NOT NULL,       -- fecha de entrega
  completed        TINYINT(1)    DEFAULT 0,
  notification_id  INT           DEFAULT NULL,   -- ID notif. local Capacitor
  created_at       DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);

-- ─── TABLA: notifications ───────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  task_id     INT,
  message     VARCHAR(300)  NOT NULL,
  read_at     DATETIME      DEFAULT NULL,        -- NULL = no leída
  created_at  DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id)  ON DELETE SET NULL
);
```

---

## 5. Conexión MySQL — `backend/src/config/db.js`

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',        // contraseña vacía
  database: process.env.DB_NAME     || 'tareas',
  waitForConnections: true,
  connectionLimit:    10,
});

module.exports = pool;
```

### `backend/.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tareas
JWT_SECRET=mi_clave_secreta_jwt_2026
PORT=3001
```

---

## 6. Endpoints de la API REST

### Auth
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Login, devuelve JWT | No |
| GET | `/api/auth/me` | Perfil del usuario actual | JWT |

### Tareas
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/api/tasks` | Todas las tareas del usuario | JWT |
| GET | `/api/tasks/today` | Tareas de hoy | JWT |
| GET | `/api/tasks/pending` | Tareas pendientes | JWT |
| GET | `/api/tasks/completed` | Tareas completadas | JWT |
| POST | `/api/tasks` | Crear nueva tarea | JWT |
| PUT | `/api/tasks/:id` | Editar tarea | JWT |
| PATCH | `/api/tasks/:id/complete` | Marcar como completada | JWT |
| DELETE | `/api/tasks/:id` | Eliminar tarea | JWT |

### Materias
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/api/subjects` | Todas las materias del usuario | JWT |
| POST | `/api/subjects` | Crear materia | JWT |
| PUT | `/api/subjects/:id` | Editar materia | JWT |
| DELETE | `/api/subjects/:id` | Eliminar materia | JWT |

### Notificaciones
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/api/notifications` | Historial de notificaciones | JWT |
| PATCH | `/api/notifications/:id/read` | Marcar como leída | JWT |

---

## 7. Cliente HTTP — `frontend/src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// Inyectar JWT automáticamente en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirigir a login si el token expira (401)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
```

---

## 8. Configuración de Capacitor

### `frontend/capacitor.config.json`
```json
{
  "appId": "com.ista.tareasescolares",
  "appName": "Tareas Escolares",
  "webDir": "dist",
  "server": {
    "androidScheme": "https",
    "cleartext": true
  },
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#00BFA5"
    }
  }
}
```

> [!IMPORTANT]
> Para que el APK en el celular pueda conectarse al backend, reemplaza `localhost` por la **IP local de tu PC** (ej: `192.168.1.X`) en el `.env` del frontend:
> ```
> VITE_API_URL=http://192.168.1.X:3001
> ```

---

## 9. Design Tokens — `frontend/src/styles/tokens.css`

```css
:root {
  --color-primary:        #00BFA5;
  --color-primary-dark:   #00897B;
  --color-accent:         #FF7043;
  --color-bg:             #F5F7FA;
  --color-surface:        #FFFFFF;
  --color-text:           #212121;
  --color-text-secondary: #757575;

  /* Colores de materias */
  --subject-1: #00BFA5;
  --subject-2: #FF7043;
  --subject-3: #7C4DFF;
  --subject-4: #2979FF;
  --subject-5: #FFD600;
  --subject-6: #F06292;

  --font-family: 'Inter', sans-serif;
  --radius-sm: 8px;   --radius-md: 12px;
  --radius-lg: 20px;  --radius-full: 9999px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
}
```

---

## 10. Dependencias del Proyecto

### Frontend — `frontend/package.json`
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.7.0",
    "zustand": "^4.5.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/android": "^6.0.0",
    "@capacitor/local-notifications": "^6.0.0",
    "@capacitor/status-bar": "^6.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.2.0",
    "@capacitor/cli": "^6.0.0"
  }
}
```

### Backend — `backend/package.json`
```json
{
  "dependencies": {
    "express": "^4.19.0",
    "mysql2": "^3.9.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0"
  }
}
```

---

## 11. Comandos Clave

| Acción | Comando | Directorio |
|---|---|---|
| Dev frontend | `npm run dev` | `frontend/` |
| Dev backend | `node server.js` | `backend/` |
| Build producción | `npm run build` | `frontend/` |
| Sincronizar Capacitor | `npx cap sync` | `frontend/` |
| Abrir Android Studio | `npx cap open android` | `frontend/` |
| Correr en Android | `npx cap run android` | `frontend/` |
| Crear tablas MySQL | `mysql -u root < sql/schema.sql` | `backend/` |
