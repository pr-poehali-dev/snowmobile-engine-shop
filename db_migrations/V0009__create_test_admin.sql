-- Создаем тестового администратора с простым паролем
-- Email: test@test.ru
-- Пароль: test123

INSERT INTO users (email, password_hash, full_name, role, is_active, created_at, updated_at)
VALUES (
  'test@test.ru',
  '$2b$12$LQv3c1yqBWuE4qrML2p3u.XDHvpKnKqE4qRzL9qJZ9X6H3qZ3qZ3q',
  'Тестовый Админ',
  'admin',
  true,
  NOW(),
  NOW()
);
