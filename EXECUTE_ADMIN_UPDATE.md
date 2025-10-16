# 🔐 Admin User Update - Complete Guide

## 📋 Task Overview

**Update admin user credentials in the PostgreSQL database:**
- Change email from `admin@motodvigni.ru` to `admin`
- Set password to `Belka1608` (bcrypt hashed)

## 🚀 Quick Execution (3 Steps)

### Step 1: Install Dependencies
```bash
pip install bcrypt psycopg2-binary
```

### Step 2: Set Database URL
```bash
export DATABASE_URL='postgresql://username:password@hostname:5432/database'
```

### Step 3: Run Update Script
```bash
python3 backend/EXECUTE_THIS_update_admin.py
```

✅ **Done!** Your admin credentials are now updated.

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| **`backend/EXECUTE_THIS_update_admin.py`** | **Main script - Execute this** |
| `backend/verify_admin_update.py` | Verify the update was successful |
| `backend/README_ADMIN_UPDATE.md` | Detailed documentation |
| `ADMIN_UPDATE_SUMMARY.md` | Technical summary |
| `backend/admin_update_complete.py` | Alternative implementation |
| `backend/update_admin_credentials.py` | Alternative implementation |
| `backend/generate_hash.py` | Hash generator only |
| `backend/run_admin_update.sh` | Bash wrapper script |

---

## 🔍 What the Script Does

### 1. Generate Bcrypt Hash
Uses Python's `bcrypt` library to generate a secure hash for password "Belka1608":
```python
password_hash = bcrypt.hashpw("Belka1608".encode('utf-8'), bcrypt.gensalt())
```

### 2. Execute SQL UPDATE
Runs parameterized query (prevents SQL injection):
```python
cur.execute(
    "UPDATE users SET email = %s, password_hash = %s, updated_at = NOW() WHERE email = %s",
    ('admin', password_hash, 'admin@motodvigni.ru')
)
```

### 3. Verify Changes
Confirms the update by querying the user table and displaying new credentials.

---

## 📊 Expected Output

```
================================================================================
 ADMIN USER CREDENTIALS UPDATE
================================================================================

[1/4] Generating bcrypt hash for password: Belka1608
      ✓ Hash generated: $2b$12$xYz...

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

---

## ✅ Verify the Update

Run the verification script to confirm everything worked:

```bash
python3 backend/verify_admin_update.py
```

This will:
- Check if user with email 'admin' exists
- Verify the password 'Belka1608' matches the stored hash
- Display user details

---

## 🧪 Test Login

### Via Auth Endpoint
```bash
curl -X POST https://your-backend-url/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "login",
    "email": "admin",
    "password": "Belka1608"
  }'
```

### Via Admin Panel
Navigate to your admin login page and use:
- **Email/Login**: `admin`
- **Password**: `Belka1608`

---

## 🔧 Manual SQL Execution (Alternative)

If you prefer to execute SQL manually:

### 1. Generate Hash
```bash
python3 backend/generate_hash.py
```

### 2. Execute SQL
```sql
UPDATE users 
SET 
    email = 'admin',
    password_hash = '$2b$12$[YOUR_GENERATED_HASH]',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

### 3. Verify
```sql
SELECT id, email, full_name, role, is_active 
FROM users 
WHERE email = 'admin';
```

---

## ❌ Troubleshooting

### "DATABASE_URL not set"

**Solution**: Set the environment variable
```bash
export DATABASE_URL='postgresql://user:pass@host:5432/dbname'
```

### "psycopg2 not installed"

**Solution**: Install it
```bash
pip install psycopg2-binary
```

### "bcrypt not installed"

**Solution**: Install it
```bash
pip install bcrypt
```

### "User 'admin@motodvigni.ru' not found"

**Check what users exist:**
```sql
SELECT id, email, full_name, role FROM users;
```

### "Constraint error: email 'admin' already exists"

**User may already be updated. Verify:**
```sql
SELECT * FROM users WHERE email = 'admin';
```

Then try logging in with password 'Belka1608'.

---

## 🔒 Security Features

✅ **Bcrypt hashing** - Industry-standard password hashing
✅ **Secure salt** - Unique salt generated with `bcrypt.gensalt()`
✅ **Parameterized queries** - Prevents SQL injection
✅ **No plain text storage** - Password never stored unencrypted
✅ **Error handling** - Automatic rollback on failure

---

## 📚 Backend Reference

### Authentication Logic
**File**: `backend/auth/index.py`
**Line 156**: Password verification using `bcrypt.checkpw()`

```python
if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
    # Authentication failed
```

### Database Schema
**File**: `db_migrations/V0002__create_users_and_sessions_tables.sql`

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'employee',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📝 SQL Statement Generated

The script generates and executes:

```sql
UPDATE users 
SET 
    email = 'admin',
    password_hash = '$2b$12$[GENERATED_SECURE_HASH]',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

**Note**: The password hash is:
- Generated fresh each time (unique salt)
- Properly escaped for SQL (using parameterized queries)
- Approximately 60 characters long
- Format: `$2b$12$[22 chars salt][31 chars hash]`

---

## ✨ Summary

**Objective**: ✅ Update admin user password
**Method**: Bcrypt hash generation + SQL UPDATE
**Files**: 8 comprehensive scripts and documentation
**Main Script**: `backend/EXECUTE_THIS_update_admin.py`
**Verification**: `backend/verify_admin_update.py`
**New Credentials**: 
- Login: `admin`
- Password: `Belka1608`

**Status**: Ready for execution

---

## 🎯 Final Steps

1. **Execute**: `python3 backend/EXECUTE_THIS_update_admin.py`
2. **Verify**: `python3 backend/verify_admin_update.py`
3. **Test**: Login with email='admin' and password='Belka1608'

**Need help?** See `backend/README_ADMIN_UPDATE.md` for detailed troubleshooting.

---

**Generated**: 2025-10-16
**Task**: Admin user credentials update
**Status**: Complete and ready for execution
