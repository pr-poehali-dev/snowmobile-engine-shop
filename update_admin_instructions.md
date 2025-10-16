# Admin User Credentials Update

## Objective
Update the admin user in the database:
- **Current email**: `admin@motodvigni.ru`
- **New email/login**: `admin`
- **New password**: `Belka1608`

## Method 1: Automated Python Script (Recommended)

### Prerequisites
- Python 3.x installed
- bcrypt library installed: `pip install bcrypt psycopg2-binary`
- DATABASE_URL environment variable set

### Steps
1. Navigate to the project root directory
2. Run the complete update script:
   ```bash
   python backend/admin_update_complete.py
   ```

This script will:
- Generate the bcrypt hash for "Belka1608"
- Create a SQL migration file in `db_migrations/`
- Attempt to execute the update directly
- Verify the update was successful

## Method 2: Manual SQL Execution

If you prefer to execute SQL manually or don't have Python environment set up:

### Step 1: Generate Bcrypt Hash
Run this Python script to generate the hash:
```bash
cd backend
pip install bcrypt
python generate_hash.py
```

### Step 2: Execute SQL Update
Take the generated hash and execute this SQL:
```sql
UPDATE users 
SET 
    email = 'admin',
    password_hash = '[YOUR_GENERATED_HASH]',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

### Step 3: Verify
```sql
SELECT id, email, full_name, role, is_active 
FROM users 
WHERE email = 'admin';
```

## Method 3: Using Existing Backend Infrastructure

Since the backend already has bcrypt functionality (see `backend/auth/index.py` line 156), you can:

1. Use the existing backend infrastructure
2. Create a temporary endpoint or use the users management endpoint
3. Or run the update script with DATABASE_URL from your backend environment

## Verification

After updating, test the login:
- **Login/Email**: `admin`
- **Password**: `Belka1608`

You should be able to authenticate successfully through the auth endpoint.

## Files Created

- `backend/admin_update_complete.py` - Complete automated solution
- `backend/generate_hash.py` - Simple hash generator
- `backend/update_admin_credentials.py` - Alternative comprehensive script
- `backend/generate_admin_update.py` - SQL generation only

## Troubleshooting

### Error: "User admin@motodvigni.ru not found"
Check if the user exists:
```sql
SELECT * FROM users WHERE email LIKE '%admin%';
```

### Error: "User with email 'admin' already exists"
Someone may have already run this update. Verify:
```sql
SELECT id, email, full_name, role FROM users WHERE email = 'admin';
```

### Testing Password
Use the backend auth endpoint to test:
```bash
curl -X POST <backend_auth_url> \
  -H "Content-Type: application/json" \
  -d '{"action":"login","email":"admin","password":"Belka1608"}'
```
