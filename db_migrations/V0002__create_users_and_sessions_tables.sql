-- Создаем таблицу пользователей (сотрудников)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'employee',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу сессий для авторизации
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Комментарии к таблицам
COMMENT ON TABLE users IS 'Учетные записи сотрудников для доступа к админ-панели';
COMMENT ON TABLE sessions IS 'Сессии авторизации пользователей';
COMMENT ON COLUMN users.role IS 'Роль: admin (полный доступ) или employee (просмотр заказов)';
COMMENT ON COLUMN users.is_active IS 'Активность учетной записи (можно деактивировать без удаления)';

-- Создаем первого администратора (пароль: admin123)
INSERT INTO users (email, password_hash, full_name, role) 
VALUES ('admin@motodvigni.ru', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Администратор', 'admin')
ON CONFLICT (email) DO NOTHING;