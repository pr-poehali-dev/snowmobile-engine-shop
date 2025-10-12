-- Обновляем пароль администратора на правильный bcrypt хэш
UPDATE users 
SET password_hash = '$2b$12$0.lhzDo.7V.RwfLq4sxH9.1POpamTAWl0k/Iq0Ek20g7.CNIfbJKC'
WHERE email = 'admin@motodvigni.ru';