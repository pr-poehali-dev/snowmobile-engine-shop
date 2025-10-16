# Admin Credentials Update - Summary

## Objective Completed ✓

Created comprehensive solution to update admin user credentials in the database.

### Target Changes
- **Current**: `admin@motodvigni.ru` with old password
- **New**: `admin` (login/email) with password `Belka1608`

## Solution Files Created

### Primary Execution Script (USE THIS)
📁 **`backend/EXECUTE_THIS_update_admin.py`**
- Complete, production-ready script
- Generates bcrypt hash for "Belka1608"
- Connects to database using DATABASE_URL
- Executes UPDATE query with proper escaping
- Verifies the changes
- Provides clear success/failure output

### Documentation
📁 **`backend/README_ADMIN_UPDATE.md`** - Complete instructions and troubleshooting
📁 **`update_admin_instructions.md`** - Alternative methods guide

### Supporting Scripts
📁 `backend/admin_update_complete.py` - Alternative comprehensive script
📁 `backend/update_admin_credentials.py` - Another implementation
📁 `backend/generate_hash.py` - Simple hash generator
📁 `backend/generate_admin_update.py` - SQL generation only
📁 `backend/run_admin_update.sh` - Bash wrapper

## Quick Start

```bash
# 1. Install dependencies
pip install bcrypt psycopg2-binary

# 2. Set database URL
export DATABASE_URL='postgresql://user:pass@host:port/db'

# 3. Execute the update
python3 backend/EXECUTE_THIS_update_admin.py
```

## What the Script Does

1. **Generates bcrypt hash** for password "Belka1608" using Python's bcrypt library
2. **Connects to PostgreSQL database** using DATABASE_URL environment variable
3. **Executes UPDATE query**:
   ```sql
   UPDATE users 
   SET email = 'admin', 
       password_hash = '[GENERATED_BCRYPT_HASH]', 
       updated_at = NOW() 
   WHERE email = 'admin@motodvigni.ru';
   ```
4. **Verifies the update** by querying the user table
5. **Returns confirmation** with new credentials

## SQL Query Details

The script uses **parameterized queries** for security:
```python
cur.execute(
    "UPDATE users SET email = %s, password_hash = %s, updated_at = NOW() WHERE email = %s",
    ('admin', password_hash, 'admin@motodvigni.ru')
)
```

This prevents SQL injection and handles proper escaping automatically.

## Example Output

```
================================================================================
 ✓ SUCCESS - ADMIN CREDENTIALS UPDATED
================================================================================

New login credentials:
  Login/Email: admin
  Password:    Belka1608

================================================================================
```

## Testing New Credentials

After running the script, login using:
- **Email/Login**: `admin`
- **Password**: `Belka1608`

Test via auth endpoint:
```bash
curl -X POST [backend-auth-url] \
  -H "Content-Type: application/json" \
  -d '{"action":"login","email":"admin","password":"Belka1608"}'
```

## Backend Context

- **Password hashing**: `backend/auth/index.py` line 156 uses bcrypt.checkpw()
- **User table structure**: Defined in `db_migrations/V0002__create_users_and_sessions_tables.sql`
- **Previous admin user**: Created with email `admin@motodvigni.ru`

## Security Features

✓ Bcrypt hash with secure salt (gensalt())
✓ Parameterized SQL queries (no SQL injection risk)
✓ Password never stored in plain text
✓ Proper error handling and rollback on failure
✓ Verification step confirms update success

## Manual Alternative

If you prefer manual SQL execution:

1. Generate bcrypt hash for "Belka1608" (use `backend/generate_hash.py`)
2. Execute the UPDATE with the generated hash
3. Verify with: `SELECT * FROM users WHERE email = 'admin';`

See `backend/README_ADMIN_UPDATE.md` for detailed manual instructions.

## Verification Query

To confirm the update was successful, run:

```sql
SELECT id, email, full_name, role, is_active, updated_at
FROM users 
WHERE email = 'admin';
```

Expected result:
- `email` should be `'admin'` (not `'admin@motodvigni.ru'`)
- `password_hash` should be a bcrypt hash starting with `$2b$`
- `updated_at` should be the current timestamp

## Support

For issues or questions:
1. Check `backend/README_ADMIN_UPDATE.md` for troubleshooting
2. Review the script output for specific error messages
3. Verify DATABASE_URL is correctly set
4. Ensure bcrypt and psycopg2-binary are installed

---

**Status**: Solution complete and ready for execution
**Primary file**: `backend/EXECUTE_THIS_update_admin.py`
**Documentation**: `backend/README_ADMIN_UPDATE.md`
