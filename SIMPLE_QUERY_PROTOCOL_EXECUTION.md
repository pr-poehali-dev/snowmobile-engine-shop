# Admin Update - Simple Query Protocol Implementation

## Critical Difference: Simple Query vs Parameterized Query

### Your Requirement: SIMPLE QUERY PROTOCOL
```sql
-- Values embedded directly in SQL (no placeholders)
UPDATE users 
SET email = 'admin', 
    password_hash = '$2b$12$abcd...xyz', 
    updated_at = NOW() 
WHERE email = 'admin@motodvigni.ru';
```

### Previous Implementation: Parameterized Query
```python
# Uses placeholders (%s) with separate parameters
cur.execute(
    "UPDATE users SET email = %s, password_hash = %s WHERE email = %s",
    ('admin', hash, 'admin@motodvigni.ru')
)
```

## NEW Scripts for Simple Query Protocol

### 1. Main Execution Script
**File**: `backend/update_admin_simple_query.py`

This is the PRIMARY script you should use. It implements:
- ✓ **Simple Query Protocol** (no $1, %s placeholders)
- ✓ Embeds hash directly in SQL string
- ✓ Properly escapes single quotes in hash
- ✓ Preserves $ characters in bcrypt hash
- ✓ Complete verification

**Usage**:
```bash
export DATABASE_URL='postgresql://user:password@host:port/database'
python3 backend/update_admin_simple_query.py
```

### 2. SQL Generator Script
**File**: `backend/generate_update_sql.py`

Generates the hash and SQL statement for manual execution.

**Usage**:
```bash
python3 backend/generate_update_sql.py
```

## Quick Execution Guide

### Step 1: Install Dependencies
```bash
pip install bcrypt psycopg2-binary
```

### Step 2: Set Database Connection
```bash
export DATABASE_URL='postgresql://user:password@host:port/database'
```

### Step 3: Execute Update
```bash
python3 backend/update_admin_simple_query.py
```

### Step 4: Verify (Optional)
```bash
python3 backend/verify_admin_update.py
```

## What Happens During Execution

### 1. Hash Generation
```
Password: Belka1608
↓
bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
↓
Hash: $2b$12$SomeRandomSaltAndHashValueHere
```

### 2. SQL String Construction
```python
# Escape single quotes by doubling them
escaped_hash = hash.replace("'", "''")

# Build SQL with embedded values (no placeholders!)
sql = f"UPDATE users SET email = 'admin', password_hash = '{escaped_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
```

### 3. Execution via Simple Query Protocol
```python
# Set autocommit mode
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

# Execute SQL string directly
cur.execute(sql)
```

### 4. Verification
```sql
SELECT id, email, password_hash, full_name, role, is_active 
FROM users 
WHERE email = 'admin';
```

### 5. Password Test
```python
bcrypt.checkpw('Belka1608'.encode('utf-8'), stored_hash.encode('utf-8'))
# Returns: True ✓
```

## Expected Output

```
================================================================================
 ADMIN USER CREDENTIALS UPDATE - SIMPLE QUERY PROTOCOL
================================================================================

[Step 1/5] Generating bcrypt hash for password: Belka1608
            ✓ Hash generated successfully
            Hash: $2b$12$abcdefghijklmnopqrstuvwxyz1234567890
            ✓ Hash verification test: PASSED

[Step 2/5] Preparing SQL statement with simple query protocol...
            ✓ SQL statement prepared
            Length: 187 characters

            SQL Statement:
            ----------------------------------------------------------------------
            UPDATE users
            SET email = 'admin',
                password_hash = '$2b$12$abcdefghijklmno...',
                updated_at = NOW()
            WHERE email = 'admin@motodvigni.ru';
            ----------------------------------------------------------------------

[Step 3/5] Checking database connection...
            ✓ psycopg2 library available

[Step 4/5] Executing update...
            Checking current user...
            ✓ Found user ID: 1, Email: admin@motodvigni.ru
              Name: Администратор, Role: admin, Active: True

            Executing UPDATE statement...
            ✓ UPDATE executed successfully
            Rows affected: 1

[Step 5/5] Verifying update...
            ✓ User found with new email 'admin'
              ID: 1
              Email: admin
              Name: Администратор
              Role: admin
              Active: True
              Updated: 2025-10-16 12:34:56.789
              Hash: $2b$12$abcdefghijklmnopqrstuvwxyz1234567890...

            Verifying password 'Belka1608' against stored hash...
            ✓ Password verification: SUCCESS

================================================================================
 ✓✓✓ SUCCESS - ADMIN CREDENTIALS UPDATED AND VERIFIED ✓✓✓
================================================================================

Update Summary:
  Old Email:   admin@motodvigni.ru
  New Email:   admin
  Password:    Belka1608
  Password Hash: $2b$12$abcdefghijklmnopqrstuvwxyz1234567890
  User ID:     1
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

## Technical Implementation Details

### Bcrypt Hash Format
```
$2b$12$SaltHereHashHere
│  │  └── Hash (31 chars)
│  └───── Cost factor
└──────── Algorithm version
```

### SQL String Escaping
```python
# Original hash
hash = "$2b$12$abc'def"

# Escaped for SQL (only single quotes are doubled)
escaped = "$2b$12$abc''def"

# In SQL statement
sql = f"... password_hash = '{escaped}' ..."

# Result in database: $2b$12$abc'def
```

### Key Points:
1. **$ characters are NOT escaped** - they're valid in SQL strings
2. **Single quotes ARE escaped** - doubled ('') per SQL standard
3. **No placeholder substitution** - values embedded directly
4. **Autocommit mode** - transaction committed immediately

## Comparison Table

| Feature | Simple Query Protocol | Parameterized Query |
|---------|----------------------|---------------------|
| Script | `update_admin_simple_query.py` | `EXECUTE_THIS_update_admin.py` |
| SQL Syntax | `... = 'value'` | `... = %s` |
| Parameters | Embedded in string | Separate tuple |
| Escaping | Manual (single quotes) | Automatic |
| Security | Manual escaping required | SQL injection protection |
| Your Requirement | ✓ YES | ✗ NO |

## Files Reference

### New Files (Simple Query Protocol)
1. **backend/update_admin_simple_query.py** - Main execution script ⭐
2. **backend/generate_update_sql.py** - SQL generator ⭐
3. **SIMPLE_QUERY_PROTOCOL_EXECUTION.md** - This document ⭐
4. **ADMIN_UPDATE_EXECUTION_GUIDE.md** - Comprehensive guide
5. **EXECUTE_ADMIN_UPDATE.txt** - Quick reference

### Existing Files (Parameterized Query)
6. backend/EXECUTE_THIS_update_admin.py - Uses %s placeholders
7. backend/update_admin_credentials.py - Uses %s placeholders
8. backend/verify_admin_update.py - Verification script (works with both)

## Command Reference

```bash
# Install dependencies
pip install bcrypt psycopg2-binary

# Set database URL
export DATABASE_URL='postgresql://user:password@host:port/database'

# Execute update (Simple Query Protocol)
python3 backend/update_admin_simple_query.py

# Generate SQL only (for manual execution)
python3 backend/generate_update_sql.py

# Verify update
python3 backend/verify_admin_update.py

# Direct psql execution (if you have the SQL)
psql $DATABASE_URL -c "UPDATE users SET email = 'admin', password_hash = '\$2b\$12\$...', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
```

## Success Criteria

After execution, verify:
1. ✓ Script reports "SUCCESS - ADMIN CREDENTIALS UPDATED AND VERIFIED"
2. ✓ Email changed from `admin@motodvigni.ru` to `admin`
3. ✓ Password hash updated (starts with `$2b$12$`)
4. ✓ Password `Belka1608` verified against stored hash
5. ✓ Can login with new credentials

## Database Verification Query

```sql
-- Check user exists with new email
SELECT id, email, full_name, role, is_active, 
       LEFT(password_hash, 20) AS hash_preview,
       updated_at
FROM users 
WHERE email = 'admin';
```

Expected result:
```
 id | email | full_name      | role  | is_active | hash_preview           | updated_at
----+-------+----------------+-------+-----------+------------------------+-------------------
  1 | admin | Администратор  | admin | t         | $2b$12$abcdefghijkl... | 2025-10-16 ...
```

## Final Summary

**Status**: ✓ READY FOR EXECUTION

**What You Need**:
1. Python 3 with bcrypt and psycopg2-binary
2. DATABASE_URL environment variable
3. Access to the database

**What to Execute**:
```bash
python3 backend/update_admin_simple_query.py
```

**Result**:
- Email: `admin@motodvigni.ru` → `admin`
- Password: → `Belka1608` (bcrypt hashed)
- Protocol: Simple Query (no placeholders)
- Verification: Automatic

**New Credentials**:
- Login: `admin`
- Password: `Belka1608`

---

**Last Updated**: October 16, 2025
