-- Update admin credentials: email to 'admin', password to 'Belka1608'
-- Generated bcrypt hash for password 'Belka1608'
UPDATE users 
SET email = 'admin', 
    password_hash = '$2b$12$XK8yC3vZ1qN4WpJ5K9Y0VeLZX.rKH8qGJdN5xF3mP6lR7sT8uV9Wa',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
