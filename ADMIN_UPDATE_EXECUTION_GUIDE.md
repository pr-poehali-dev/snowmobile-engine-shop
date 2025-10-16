# Admin User Credentials Update - Execution Guide

## Objective
Update the admin user in the database with new credentials:
- **Current email**: `admin@motodvigni.ru`
- **New email**: `admin`
- **New password**: `Belka1608`

## Requirements
- Python 3.x with bcrypt library installed
- Database access (PostgreSQL)
- DATABASE_URL environment variable set

## Installation

```bash
# Install required Python packages
pip install bcrypt psycopg2-binary
```

## Method 1: Automated Script (Recommended)

This method executes the entire update process automatically using **simple query protocol** (no placeholders).

### Step 1: Set Database Connection

```bash
export DATABASE_URL='postgresql://user:password@host:port/database'
```

### Step 2: Run the Update Script

```bash
python3 backend/update_admin_simple_query.py
```

### What This Script Does:
1. ✓ Generates bcrypt hash for password "Belka1608"
2. ✓ Verifies the hash works with bcrypt.checkpw()
3. ✓ Creates SQL UPDATE statement with embedded values (no $1 or %s placeholders)
4. ✓ Escapes the hash properly for SQL string literal ($ characters are preserved, single quotes are escaped)
5. ✓ Executes the UPDATE using simple query protocol
6. ✓ Verifies email changed to "admin"
7. ✓ Verifies password hash is updated and working

### Expected Output:

```
================================================================================
 ADMIN USER CREDENTIALS UPDATE - SIMPLE QUERY PROTOCOL
================================================================================

[Step 1/5] Generating bcrypt hash for password: Belka1608
            ✓ Hash generated successfully
            Hash: $2b$12$...
            ✓ Hash verification test: PASSED

[Step 2/5] Preparing SQL statement with simple query protocol...
            ✓ SQL statement prepared
            Length: XXX characters

[Step 3/5] Checking database connection...
            ✓ psycopg2 library available

[Step 4/5] Executing update...
            Checking current user...
            ✓ Found user ID: X, Email: admin@motodvigni.ru
            Executing UPDATE statement...
            ✓ UPDATE executed successfully
            Rows affected: 1

[Step 5/5] Verifying update...
            ✓ User found with new email 'admin'
            ✓ Password verification: SUCCESS

================================================================================
 ✓✓✓ SUCCESS - ADMIN CREDENTIALS UPDATED AND VERIFIED ✓✓✓
================================================================================

Update Summary:
  Old Email:   admin@motodvigni.ru
  New Email:   admin
  Password:    Belka1608
  Password Hash: $2b$12$...
  User ID:     X
  Role:        admin
  Active:      True

Verification Results:
  ✓ Email successfully changed to 'admin'
  ✓ Password hash successfully updated
  ✓ Password 'Belka1608' verified against stored hash

You can now login with:
  Login/Email: admin
  Password:    Belka1608
================================================================================
```

## Method 2: Generate SQL Only (Manual Execution)

If you prefer to execute the SQL manually or don't have direct Python access to the database:

### Step 1: Generate Hash and SQL Statement

```bash
python3 backend/generate_update_sql.py
```

This will output:
1. The bcrypt hash for "Belka1608"
2. The complete SQL UPDATE statement
3. Verification query

### Step 2: Copy and Execute the SQL

The script will display something like:

```sql
UPDATE users
SET email = 'admin',
    password_hash = '$2b$12$...',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

Execute this in your database client (psql, pgAdmin, etc.)

### Step 3: Verify the Update

Run the verification query:

```sql
SELECT id, email, full_name, role, is_active, password_hash
FROM users
WHERE email = 'admin';
```

Verify that:
- Email is now 'admin'
- Password hash is updated
- User is active

### Step 4: Test Password

```bash
python3 backend/verify_admin_update.py
```

## Method 3: Direct psql Command

If you have psql installed and DATABASE_URL set:

### Step 1: Generate the SQL

```bash
python3 backend/generate_update_sql.py | grep "^UPDATE users SET" > /tmp/update.sql
```

### Step 2: Execute via psql

```bash
psql $DATABASE_URL -f /tmp/update.sql
```

### Step 3: Verify

```bash
psql $DATABASE_URL -c "SELECT id, email, full_name, role FROM users WHERE email = 'admin';"
```

## Verification Script

After any method, you can verify the update worked:

```bash
python3 backend/verify_admin_update.py
```

This script will:
1. Check if user 'admin' exists
2. Verify password 'Belka1608' works with the stored hash
3. Display user details

Expected output:
```
================================================================================
 ADMIN CREDENTIALS VERIFICATION
================================================================================

[1/3] Connecting to database...
      ✓ Connected

[2/3] Checking for user with email 'admin'...
      ✓ User found with email 'admin'

      User details:
        - ID: X
        - Email: admin
        - Name: ...
        - Role: admin
        - Active: True
        - Created: ...
        - Updated: ...
        - Password hash: $2b$12$...

[3/3] Verifying password 'Belka1608' against stored hash...
      ✓ Password verification SUCCESSFUL
      ✓ Password 'Belka1608' matches the stored hash

================================================================================
 ✓ VERIFICATION SUCCESSFUL
================================================================================

Admin credentials are correctly configured:
  Login/Email: admin
  Password:    Belka1608
  User ID:     X
  Role:        admin
  Active:      True

You can now login using these credentials.
================================================================================
```

## Technical Details

### Bcrypt Hash Generation
- Algorithm: bcrypt
- Salt rounds: 12 (default)
- Output format: UTF-8 string (e.g., `$2b$12$...`)
- Compatible with Python's `bcrypt.checkpw()`

### SQL Protocol
- **Simple Query Protocol**: No parameterized placeholders ($1, %s, etc.)
- Values are embedded directly in the SQL string
- Single quotes in the hash are escaped by doubling them ('' instead of ')
- Dollar signs ($) in the hash are preserved as-is
- Example: `password_hash = '$2b$12$...'`

### SQL Statement Structure
```sql
UPDATE users 
SET email = 'admin', 
    password_hash = '$2b$12$XXX...XXX', 
    updated_at = NOW() 
WHERE email = 'admin@motodvigni.ru';
```

### Database Table Schema
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'employee',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Troubleshooting

### Error: "User 'admin@motodvigni.ru' not found"
- Check if the user exists: `SELECT * FROM users WHERE email LIKE '%admin%';`
- The email might be different - adjust the WHERE clause accordingly

### Error: "DATABASE_URL not set"
- Set the environment variable: `export DATABASE_URL='postgresql://...'`
- Or pass it to the script: `DATABASE_URL='...' python3 backend/update_admin_simple_query.py`

### Error: "psycopg2 not installed"
- Install it: `pip install psycopg2-binary`

### Error: "bcrypt not installed"
- Install it: `pip install bcrypt`

### Error: "Password verification failed"
- The hash may have been truncated or corrupted during copy/paste
- Re-generate the hash and try again
- Ensure you're using the exact hash generated by the script

### Error: "User 'admin' already exists"
- A user with email 'admin' already exists
- Either delete that user first, or choose a different email
- Check: `SELECT * FROM users WHERE email = 'admin';`

## Security Notes

- The password hash is generated using bcrypt with secure salt
- The hash is approximately 60 characters long
- Each execution generates a different hash (different salt)
- The password "Belka1608" is stored securely as a hash, never in plain text
- Always use environment variables for DATABASE_URL, never hardcode credentials

## Files Created

1. **backend/update_admin_simple_query.py** - Main automated update script
2. **backend/generate_update_sql.py** - Generate SQL statement only
3. **backend/verify_admin_update.py** - Verify the update worked (already exists)
4. **ADMIN_UPDATE_EXECUTION_GUIDE.md** - This guide

## Quick Reference Commands

```bash
# Set database connection
export DATABASE_URL='postgresql://user:password@host:port/database'

# Method 1: Automated update (recommended)
python3 backend/update_admin_simple_query.py

# Method 2: Generate SQL only
python3 backend/generate_update_sql.py

# Verify the update
python3 backend/verify_admin_update.py

# Direct psql execution
python3 backend/generate_update_sql.py  # Copy the SQL output
psql $DATABASE_URL -c "UPDATE users SET ..."  # Paste the SQL
```

## Success Criteria

After successful execution, you should be able to:
1. ✓ Login with email: `admin`
2. ✓ Login with password: `Belka1608`
3. ✓ Verification script confirms password matches hash
4. ✓ Query `SELECT * FROM users WHERE email = 'admin'` returns the user
5. ✓ Old email `admin@motodvigni.ru` no longer exists in the database

---

**Last Updated**: October 16, 2025
