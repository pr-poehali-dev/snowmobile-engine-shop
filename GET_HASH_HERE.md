# Generate Bcrypt Hash for "Belka1608"

## Quick Method - Run This Command:

```bash
python3 generate_hash_simple.py
```

This will output ONLY the hash string, for example:
```
$2b$12$xYzAbC123...remaining_hash_characters
```

## Alternative: Use Python Directly

```bash
python3 -c "import bcrypt; print(bcrypt.hashpw(b'Belka1608', bcrypt.gensalt()).decode('utf-8'))"
```

## Alternative: Online Bcrypt Generator

If you don't have Python/bcrypt installed:

1. Go to: https://bcrypt-generator.com/
2. Enter password: `Belka1608`
3. Rounds: `12` (default)
4. Click "Generate"
5. Copy the hash (starts with `$2b$12$` or `$2a$12$`)

Note: Both `$2a$` and `$2b$` prefixes work with Python's bcrypt.checkpw()

## What the Hash Looks Like

Format: `$2b$12$[22-char-salt][31-char-hash]`

Example valid hash for "Belka1608":
```
$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5HelWPbkN6qiS
```

## SQL Update Query

Once you have your hash, use this query:

```sql
UPDATE users 
SET 
    email = 'admin',
    password_hash = 'YOUR_GENERATED_HASH_HERE',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
```

## Verify It Works

```sql
SELECT id, email, password_hash, full_name, role 
FROM users 
WHERE email = 'admin';
```

The `password_hash` column should contain your bcrypt hash as a string.

## File Location

The simple generator script is at:
- `generate_hash_simple.py` (root directory)
- `backend/generate_bcrypt_hash.py` (backend directory)

Both do the same thing - generate and print the hash.
