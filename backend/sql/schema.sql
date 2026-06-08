-- =========================================================
--  BASE DE DATOS: tareas
--  Usuario: root | Contraseña: (vacía)
--  App Móvil de Tareas Escolares — ISTA Alberto Enríquez
-- =========================================================

CREATE DATABASE IF NOT EXISTS tareas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tareas;

-- ─── TABLA: users ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  created_at  DATETIME      DEFAULT NOW()
);

-- ─── TABLA: subjects (materias) ───────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  name        VARCHAR(100)  NOT NULL,
  color       VARCHAR(7)    NOT NULL DEFAULT '#00BFA5',
  icon        VARCHAR(10)   DEFAULT '📚',
  created_at  DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─── TABLA: tasks ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT           NOT NULL,
  subject_id       INT,
  title            VARCHAR(200)  NOT NULL,
  description      TEXT,
  due_date         DATETIME      NOT NULL,
  completed        TINYINT(1)    DEFAULT 0,
  notification_id  INT           DEFAULT NULL,
  created_at       DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);

-- ─── TABLA: notifications ─────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  task_id     INT,
  message     VARCHAR(300)  NOT NULL,
  read_at     DATETIME      DEFAULT NULL,
  created_at  DATETIME      DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

SELECT 'Tablas creadas correctamente en la base de datos tareas.' AS resultado;
