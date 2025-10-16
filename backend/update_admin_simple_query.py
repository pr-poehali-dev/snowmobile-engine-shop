#!/usr/bin/env python3
"""
ADMIN CREDENTIALS UPDATE - SIMPLE QUERY PROTOCOL
=================================================

This script uses SIMPLE QUERY PROTOCOL (no placeholders) to update admin credentials.

Updates:
- Email: admin@motodvigni.ru -> admin
- Password: Belka1608 (bcrypt hashed)

Requirements:
  pip install bcrypt psycopg2-binary

Set environment variable:
  export DATABASE_URL='your_database_connection_string'

Then run:
  python3 backend/update_admin_simple_query.py
"""

import bcrypt
import os
import sys

def escape_sql_string(value):
    """Escape single quotes for SQL string literal by doubling them"""
    return value.replace("'", "''")

def main():
    print("\n" + "=" * 80)
    print(" ADMIN USER CREDENTIALS UPDATE - SIMPLE QUERY PROTOCOL")
    print("=" * 80 + "\n")
    
    # Step 1: Generate bcrypt hash
    password = "Belka1608"
    print(f"[Step 1/5] Generating bcrypt hash for password: {password}")
    
    try:
        # Generate bcrypt hash compatible with Python's bcrypt.checkpw()
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        print(f"            ✓ Hash generated successfully")
        print(f"            Hash: {password_hash}\n")
        
        # Verify the hash works
        test_verify = bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
        if test_verify:
            print(f"            ✓ Hash verification test: PASSED\n")
        else:
            print(f"            ✗ Hash verification test: FAILED\n")
            return False
            
    except Exception as e:
        print(f"            ✗ Error generating hash: {e}\n")
        return False
    
    # Step 2: Escape hash for SQL
    print("[Step 2/5] Preparing SQL statement with simple query protocol...")
    
    # Escape single quotes in the hash for SQL string literal
    escaped_hash = escape_sql_string(password_hash)
    
    # Build SQL UPDATE statement with embedded values (no placeholders)
    sql_update = f"UPDATE users SET email = 'admin', password_hash = '{escaped_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
    
    print(f"            ✓ SQL statement prepared")
    print(f"            Length: {len(sql_update)} characters\n")
    print("            SQL Statement:")
    print("            " + "-" * 70)
    print(f"            UPDATE users")
    print(f"            SET email = 'admin',")
    print(f"                password_hash = '{escaped_hash[:40]}...',")
    print(f"                updated_at = NOW()")
    print(f"            WHERE email = 'admin@motodvigni.ru';")
    print("            " + "-" * 70 + "\n")
    
    # Step 3: Check database connection
    print("[Step 3/5] Checking database connection...")
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        print("            ✗ DATABASE_URL environment variable not set\n")
        print("-" * 80)
        print("MANUAL EXECUTION REQUIRED")
        print("-" * 80)
        print("\nCopy and execute this SQL statement in your database client:\n")
        print(sql_update)
        print("\nVerification query (run after update):")
        print("SELECT id, email, full_name, role, is_active FROM users WHERE email = 'admin';")
        print("\n" + "=" * 80 + "\n")
        return False
    
    try:
        import psycopg2
        from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
        print("            ✓ psycopg2 library available\n")
    except ImportError:
        print("            ✗ psycopg2 not installed")
        print("            Install: pip install psycopg2-binary\n")
        return False
    
    # Step 4: Execute the update
    print("[Step 4/5] Executing update...")
    
    try:
        # Connect to database
        conn = psycopg2.connect(database_url)
        
        # Set autocommit mode for simple queries
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        
        cur = conn.cursor()
        
        # Check if user exists first
        print("            Checking current user...")
        cur.execute("SELECT id, email, full_name, role, is_active FROM users WHERE email = 'admin@motodvigni.ru'")
        current_user = cur.fetchone()
        
        if not current_user:
            print("            ✗ User 'admin@motodvigni.ru' not found in database!\n")
            cur.close()
            conn.close()
            return False
        
        print(f"            ✓ Found user ID: {current_user[0]}, Email: {current_user[1]}")
        print(f"              Name: {current_user[2]}, Role: {current_user[3]}, Active: {current_user[4]}\n")
        
        # Execute the UPDATE using simple query protocol
        print("            Executing UPDATE statement...")
        cur.execute(sql_update)
        
        # Get the number of affected rows
        rows_affected = cur.rowcount
        print(f"            ✓ UPDATE executed successfully")
        print(f"            Rows affected: {rows_affected}\n")
        
        cur.close()
        conn.close()
        
        if rows_affected == 0:
            print("            ⚠ Warning: No rows were updated\n")
            return False
        
    except Exception as e:
        print(f"            ✗ Database error: {e}\n")
        import traceback
        traceback.print_exc()
        if 'conn' in locals():
            try:
                conn.close()
            except:
                pass
        return False
    
    # Step 5: Verify the update
    print("[Step 5/5] Verifying update...")
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Query the updated user
        cur.execute("SELECT id, email, password_hash, full_name, role, is_active, updated_at FROM users WHERE email = 'admin'")
        updated_user = cur.fetchone()
        
        if not updated_user:
            print("            ✗ User with email 'admin' not found after update!\n")
            cur.close()
            conn.close()
            return False
        
        user_id, email, stored_hash, full_name, role, is_active, updated_at = updated_user
        
        print("            ✓ User found with new email 'admin'")
        print(f"              ID: {user_id}")
        print(f"              Email: {email}")
        print(f"              Name: {full_name}")
        print(f"              Role: {role}")
        print(f"              Active: {is_active}")
        print(f"              Updated: {updated_at}")
        print(f"              Hash: {stored_hash[:50]}...\n")
        
        # Verify password hash
        print("            Verifying password 'Belka1608' against stored hash...")
        password_match = bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))
        
        if password_match:
            print("            ✓ Password verification: SUCCESS\n")
        else:
            print("            ✗ Password verification: FAILED\n")
            cur.close()
            conn.close()
            return False
        
        cur.close()
        conn.close()
        
        # Success message
        print("=" * 80)
        print(" ✓✓✓ SUCCESS - ADMIN CREDENTIALS UPDATED AND VERIFIED ✓✓✓")
        print("=" * 80)
        print("\nUpdate Summary:")
        print("  Old Email:   admin@motodvigni.ru")
        print("  New Email:   admin")
        print("  Password:    Belka1608")
        print("  Password Hash: " + stored_hash)
        print(f"  User ID:     {user_id}")
        print(f"  Role:        {role}")
        print(f"  Active:      {is_active}")
        print("\nVerification Results:")
        print("  ✓ Email successfully changed to 'admin'")
        print("  ✓ Password hash successfully updated")
        print("  ✓ Password 'Belka1608' verified against stored hash")
        print("\nYou can now login with:")
        print("  Login/Email: admin")
        print("  Password:    Belka1608")
        print("=" * 80 + "\n")
        
        return True
        
    except Exception as e:
        print(f"            ✗ Verification error: {e}\n")
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
