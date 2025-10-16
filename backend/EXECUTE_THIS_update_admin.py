#!/usr/bin/env python3
"""
MAIN SCRIPT TO UPDATE ADMIN CREDENTIALS

This script updates the admin user in the database:
- Changes email from 'admin@motodvigni.ru' to 'admin'
- Sets password to 'Belka1608'

Prerequisites:
  pip install bcrypt psycopg2-binary

Set environment variable:
  export DATABASE_URL='your_database_connection_string'

Then run:
  python3 backend/EXECUTE_THIS_update_admin.py
"""

import bcrypt
import os
import sys

def main():
    print("\n" + "=" * 80)
    print(" ADMIN USER CREDENTIALS UPDATE")
    print("=" * 80 + "\n")
    
    # Step 1: Generate bcrypt hash
    password = "Belka1608"
    print(f"[1/4] Generating bcrypt hash for password: {password}")
    
    try:
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        print(f"      ✓ Hash generated: {password_hash[:50]}...\n")
    except Exception as e:
        print(f"      ✗ Error generating hash: {e}\n")
        return False
    
    # Step 2: Check database connection
    print("[2/4] Checking database connection...")
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        print("      ✗ DATABASE_URL environment variable not set")
        print("\n" + "-" * 80)
        print("MANUAL EXECUTION REQUIRED")
        print("-" * 80)
        print("\nGenerated SQL statement:")
        print(f"\nUPDATE users")
        print(f"SET email = 'admin',")
        print(f"    password_hash = '{password_hash}',")
        print(f"    updated_at = NOW()")
        print(f"WHERE email = 'admin@motodvigni.ru';")
        print("\nVerification query:")
        print("SELECT id, email, full_name, role FROM users WHERE email = 'admin';")
        print("\n" + "=" * 80 + "\n")
        return False
    
    try:
        import psycopg2
        print("      ✓ psycopg2 available\n")
    except ImportError:
        print("      ✗ psycopg2 not installed")
        print("      Install it: pip install psycopg2-binary\n")
        return False
    
    # Step 3: Connect and verify current state
    print("[3/4] Connecting to database and checking current user...")
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Check if user exists
        cur.execute(
            "SELECT id, email, full_name, role, is_active FROM users WHERE email = %s",
            ('admin@motodvigni.ru',)
        )
        result = cur.fetchone()
        
        if not result:
            print("      ✗ User 'admin@motodvigni.ru' not found in database!\n")
            cur.close()
            conn.close()
            return False
        
        user_id, email, full_name, role, is_active = result
        print(f"      ✓ Found user:")
        print(f"        - ID: {user_id}")
        print(f"        - Email: {email}")
        print(f"        - Name: {full_name}")
        print(f"        - Role: {role}")
        print(f"        - Active: {is_active}\n")
        
        # Step 4: Execute update
        print("[4/4] Executing update...")
        
        cur.execute(
            """UPDATE users 
               SET email = %s, password_hash = %s, updated_at = NOW() 
               WHERE email = %s 
               RETURNING id, email""",
            ('admin', password_hash, 'admin@motodvigni.ru')
        )
        
        updated = cur.fetchone()
        conn.commit()
        
        if updated:
            print(f"      ✓ Successfully updated user (ID: {updated[0]}, New email: {updated[1]})")
            
            # Verify the update
            cur.execute(
                "SELECT id, email, full_name, role, is_active FROM users WHERE email = %s",
                ('admin',)
            )
            verify = cur.fetchone()
            
            if verify:
                print("\n" + "-" * 80)
                print("VERIFICATION - User details after update:")
                print("-" * 80)
                print(f"  ID: {verify[0]}")
                print(f"  Email: {verify[1]}")
                print(f"  Name: {verify[2]}")
                print(f"  Role: {verify[3]}")
                print(f"  Active: {verify[4]}")
                print("-" * 80 + "\n")
        else:
            print("      ✗ Update failed - no rows returned\n")
            cur.close()
            conn.close()
            return False
        
        cur.close()
        conn.close()
        
        # Success message
        print("=" * 80)
        print(" ✓ SUCCESS - ADMIN CREDENTIALS UPDATED")
        print("=" * 80)
        print("\nNew login credentials:")
        print("  Login/Email: admin")
        print("  Password:    Belka1608")
        print("\n" + "=" * 80 + "\n")
        
        return True
        
    except psycopg2.IntegrityError as e:
        print(f"      ✗ Database constraint error: {e}")
        print("      This usually means email 'admin' already exists\n")
        if 'conn' in locals():
            conn.rollback()
        return False
        
    except psycopg2.Error as e:
        print(f"      ✗ Database error: {e}\n")
        if 'conn' in locals():
            conn.rollback()
        return False
        
    except Exception as e:
        print(f"      ✗ Unexpected error: {e}\n")
        if 'conn' in locals():
            try:
                conn.rollback()
            except:
                pass
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
