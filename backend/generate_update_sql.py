#!/usr/bin/env python3
"""
GENERATE SQL UPDATE STATEMENT WITH BCRYPT HASH
===============================================

This script generates:
1. Bcrypt hash for password "Belka1608"
2. SQL UPDATE statement using simple query protocol (no placeholders)
3. Verification query

The hash is compatible with Python's bcrypt.checkpw()

Usage:
  python3 backend/generate_update_sql.py
"""

import bcrypt
import sys

def escape_sql_string(value):
    """Escape single quotes for SQL string literal by doubling them"""
    return value.replace("'", "''")

def main():
    print("\n" + "=" * 80)
    print(" BCRYPT HASH GENERATOR FOR ADMIN UPDATE")
    print("=" * 80 + "\n")
    
    password = "Belka1608"
    
    # Generate bcrypt hash
    print(f"Password: {password}")
    print("\nGenerating bcrypt hash...")
    
    try:
        # Generate salt and hash
        salt = bcrypt.gensalt(rounds=12)
        password_bytes = password.encode('utf-8')
        password_hash = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
        
        print(f"✓ Hash generated successfully\n")
        print("=" * 80)
        print(" BCRYPT HASH")
        print("=" * 80)
        print(password_hash)
        print("=" * 80 + "\n")
        
        # Verify the hash
        print("Verifying hash...")
        is_valid = bcrypt.checkpw(password_bytes, password_hash.encode('utf-8'))
        
        if is_valid:
            print("✓ Hash verification: SUCCESS")
            print("  The hash is valid and will work with bcrypt.checkpw()\n")
        else:
            print("✗ Hash verification: FAILED")
            print("  WARNING: The hash may not work correctly!\n")
            return False
        
        # Escape hash for SQL
        escaped_hash = escape_sql_string(password_hash)
        
        # Check if escaping was needed
        if escaped_hash != password_hash:
            print(f"Note: Hash contains single quotes, escaped for SQL")
            print(f"  Original: {password_hash}")
            print(f"  Escaped:  {escaped_hash}\n")
        
        # Generate SQL UPDATE statement
        print("=" * 80)
        print(" SQL UPDATE STATEMENT (SIMPLE QUERY PROTOCOL)")
        print("=" * 80)
        print()
        print("UPDATE users")
        print("SET email = 'admin',")
        print(f"    password_hash = '{escaped_hash}',")
        print("    updated_at = NOW()")
        print("WHERE email = 'admin@motodvigni.ru';")
        print()
        print("=" * 80 + "\n")
        
        # Generate single-line version
        sql_oneline = f"UPDATE users SET email = 'admin', password_hash = '{escaped_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
        
        print("=" * 80)
        print(" SQL UPDATE STATEMENT (ONE LINE)")
        print("=" * 80)
        print(sql_oneline)
        print("=" * 80 + "\n")
        
        # Verification query
        print("=" * 80)
        print(" VERIFICATION QUERY (RUN AFTER UPDATE)")
        print("=" * 80)
        print("SELECT id, email, full_name, role, is_active, password_hash")
        print("FROM users")
        print("WHERE email = 'admin';")
        print("=" * 80 + "\n")
        
        # Instructions
        print("=" * 80)
        print(" EXECUTION INSTRUCTIONS")
        print("=" * 80)
        print()
        print("Option 1: Execute with Python script")
        print("-" * 80)
        print("  export DATABASE_URL='your_database_connection_string'")
        print("  python3 backend/update_admin_simple_query.py")
        print()
        print("Option 2: Manual execution via SQL client")
        print("-" * 80)
        print("  1. Copy the SQL UPDATE statement above")
        print("  2. Connect to your database using psql, pgAdmin, or other client")
        print("  3. Execute the UPDATE statement")
        print("  4. Run the verification query")
        print("  5. Check that email is 'admin' and password_hash matches")
        print()
        print("Option 3: Execute via psql command line")
        print("-" * 80)
        print("  psql $DATABASE_URL -c \"" + sql_oneline.replace('"', '\\"') + "\"")
        print()
        print("After update, verify password works:")
        print("-" * 80)
        print("  python3 backend/verify_admin_update.py")
        print()
        print("=" * 80 + "\n")
        
        # Summary
        print("=" * 80)
        print(" SUMMARY")
        print("=" * 80)
        print(f"  Target User:  admin@motodvigni.ru")
        print(f"  New Email:    admin")
        print(f"  New Password: Belka1608")
        print(f"  Hash Length:  {len(password_hash)} characters")
        print(f"  Hash Type:    bcrypt (Python compatible)")
        print(f"  SQL Protocol: Simple Query (no placeholders)")
        print("=" * 80 + "\n")
        
        return True
        
    except Exception as e:
        print(f"\n✗ ERROR: {e}\n")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠ Operation cancelled by user\n")
        sys.exit(130)
    except Exception as e:
        print(f"\n\n✗ FATAL ERROR: {e}\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)
