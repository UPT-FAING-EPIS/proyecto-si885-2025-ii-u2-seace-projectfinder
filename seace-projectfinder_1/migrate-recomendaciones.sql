-- Migración de tabla recomendaciones para Node.js backend
-- Este script actualiza la estructura de la tabla recomendaciones para incluir user_id

-- 1. Crear tabla users si no existe (necesaria para la foreign key)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(128) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'guest',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    CONSTRAINT chk_role CHECK (role IN ('admin', 'guest'))
);

-- 2. Crear tabla de preferencias de usuario
CREATE TABLE IF NOT EXISTS preferencias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tipo_preferencia VARCHAR(50) NOT NULL,
    valor_preferencia JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear tabla de interacciones de usuario
CREATE TABLE IF NOT EXISTS user_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    proceso_id UUID REFERENCES procesos(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) NOT NULL,
    interaction_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear índices para las nuevas tablas
CREATE INDEX IF NOT EXISTS idx_preferencias_user_id ON preferencias(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_proceso_id ON user_interactions(proceso_id);

-- 5. Renombrar tabla recomendaciones existente como respaldo
ALTER TABLE IF EXISTS recomendaciones RENAME TO recomendaciones_old;

-- 6. Crear nueva tabla recomendaciones con user_id
CREATE TABLE recomendaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proceso_id UUID NOT NULL REFERENCES procesos(id) ON DELETE CASCADE,
    score FLOAT,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, proceso_id)
);

-- 7. Crear índices para la nueva tabla
CREATE INDEX IF NOT EXISTS idx_recomendacion_user ON recomendaciones(user_id);
CREATE INDEX IF NOT EXISTS idx_recomendacion_proceso ON recomendaciones(proceso_id);
CREATE INDEX IF NOT EXISTS idx_recomendacion_unique ON recomendaciones(user_id, proceso_id);

-- 8. Opcional: Migrar datos antiguos (si hay usuarios por defecto)
-- Descomentar si se necesita migrar datos
-- INSERT INTO recomendaciones (proceso_id, user_id, score, created_at)
-- SELECT 
--     ro.proceso_id,
--     (SELECT id FROM users WHERE role = 'admin' LIMIT 1), -- Usuario por defecto
--     ro.confianza_score,
--     ro.created_at
-- FROM recomendaciones_old ro
-- WHERE ro.tipo_recomendacion = 'mvp'
-- ON CONFLICT (user_id, proceso_id) DO NOTHING;

-- 9. Crear tabla de scraping tasks
CREATE TABLE IF NOT EXISTS scraping_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    params JSONB,
    result JSONB,
    error TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scraping_tasks_status ON scraping_tasks(status);
CREATE INDEX IF NOT EXISTS idx_scraping_tasks_type ON scraping_tasks(task_type);

-- 10. Los usuarios iniciales se crean mediante el script init-users.js de Node.js
--     que genera contraseñas bcrypt correctas para admin123 y user123

COMMENT ON TABLE recomendaciones IS 'Tabla migrada para Node.js backend - Recomendaciones de procesos por usuario';
COMMENT ON TABLE recomendaciones_old IS 'Respaldo de tabla recomendaciones original del backend Python';
