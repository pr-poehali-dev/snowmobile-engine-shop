-- Обновляем пароль администратора на правильный хэш bcrypt для пароля admin123
UPDATE users 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5HelWPbkN6qiS'
WHERE email = 'admin@motodvigni.ru';