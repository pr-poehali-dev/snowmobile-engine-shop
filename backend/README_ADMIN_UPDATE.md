# Admin User Credentials Update

## Quick Start

### Update admin@motodvigni.ru to login "admin" with password "Belka1608"

```bash
# 1. Install Python dependencies (if needed)
pip install bcrypt psycopg2-binary

# 2. Set your database connection (replace with your actual DATABASE_URL)
export DATABASE_URL='postgresql://user:password@host:port/database'

# 3. Run the update script
python3 backend/EXECUTE_THIS_update_admin.py
```

## What This Does

The script will:
1. Generate a bcrypt hash for the password "Belka1608"
2. Connect to your database
3. Update the user with email `admin@motodvigni.ru`:
   - Change email to: `admin`
   - Change password to: `Belka1608` (stored as bcrypt hash)
   - Update the `updated_at` timestamp
4. Verify the changes were applied correctly

## Expected Output

```
================================================================================
 ADMIN USER CREDENTIALS UPDATE
================================================================================

[1/4] Generating bcrypt hash for password: Belka1608
      ✓ Hash generated: $2b$12$...

[2/4] Checking database connection...
      ✓ psycopg2 available

[3/4] Connecting to database and checking current user...
      ✓ Found user:
        - ID: 1
        - Email: admin@motodvigni.ru
        - Name: Администратор
        - Role: admin
        - Active: True

[4/4] Executing update...
      ✓ Successfully updated user (ID: 1, New email: admin)

--------------------------------------------------------------------------------
VERIFICATION - User details after update:
--------------------------------------------------------------------------------
  ID: 1
  Email: admin
  Name: Администратор
  Role: admin
  Active: True
--------------------------------------------------------------------------------

================================================================================
 ✓ SUCCESS - ADMIN CREDENTIALS UPDATED
================================================================================

New login credentials:
  Login/Email: admin
  Password:    Belka1608

================================================================================
```

## Testing the New Credentials

After running the script, test the login through your authentication endpoint:

```bash
curl -X POST https://your-backend-url/auth \
  -H "Content-Type: application/json" \
  -d '{"action":"login","email":"admin","password":"Belka1608"}'
```

Or through your admin login page with:
- **Email/Login**: `admin`
- **Password**: `Belka1608`

## Manual SQL Execution (Alternative)

If you can't run Python or prefer to execute SQL directly:

1. Generate the bcrypt hash using any bcrypt tool or online generator for password "Belka1608"
2. Execute this SQL:

```sql
UPDATE users 
SET 
    email = 'admin',
    password_hash = '$2b$12$[YOUR_GENERATED_HASH_HERE]',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

3. Verify:

```sql
SELECT id, email, full_name, role, is_active 
FROM users 
WHERE email = 'admin';
```

## Troubleshooting

### "DATABASE_URL environment variable not set"

The script needs to know how to connect to your database. Set it like:

```bash
export DATABASE_URL='postgresql://username:password@hostname:5432/database_name'
```

### "User 'admin@motodvigni.ru' not found"

Check what users exist:

```sql
SELECT id, email, full_name, role FROM users;
```

### "Database constraint error... email 'admin' already exists"

Someone may have already updated this user. Check:

```sql
SELECT id, email, full_name, role FROM users WHERE email = 'admin';
```

If the user exists with email 'admin', try logging in with password 'Belka1608'.

### "psycopg2 not installed"

Install it:

```bash
pip install psycopg2-binary
# or
pip3 install psycopg2-binary
```

### "bcrypt not installed"

Install it:

```bash
pip install bcrypt
# or
pip3 install bcrypt
```

## Files in This Directory

- **`EXECUTE_THIS_update_admin.py`** - Main script to run (RECOMMENDED)
- `admin_update_complete.py` - Alternative comprehensive script
- `update_admin_credentials.py` - Another alternative script
- `generate_hash.py` - Simple hash generator only
- `generate_admin_update.py` - SQL statement generator
- `run_admin_update.sh` - Bash wrapper script
- `README_ADMIN_UPDATE.md` - This file

## Security Notes

- The bcrypt hash is generated with a secure salt
- Password is never stored in plain text
- The script uses parameterized queries to prevent SQL injection
- Make sure DATABASE_URL is kept secure and not committed to version control

## Backend Authentication Reference

The authentication logic is implemented in:
- `backend/auth/index.py` - Line 156 contains the bcrypt password verification
- User management: `backend/users/index.py`

The bcrypt.checkpw() function is used to verify passwords against stored hashes.
