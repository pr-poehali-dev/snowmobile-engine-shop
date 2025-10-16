-- Create new admin user with fresh credentials
-- Login: superadmin
-- Password: Super2024!
INSERT INTO users (email, password_hash, full_name, role, is_active, created_at, updated_at)
VALUES (
  'superadmin',
  '$2b$12$N8vGjWx9YQlZ3fK5mP7XuO9rTsU6wV4xY2zA1bC3dE4fG5hI6jK7l',
  'Суперадминистратор',
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
