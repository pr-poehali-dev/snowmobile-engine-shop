#!/usr/bin/env python3
"""
Verification Script - Check if admin credentials were updated successfully

This script checks:
1. If user with email 'admin' exists
2. If password 'Belka1608' works with the stored hash
3. User details (role, active status, etc.)

Usage:
  export DATABASE_URL='your_database_connection_string'
  python3 backend/verify_admin_update.py
"""

import os
import sys
import bcrypt

def main():
    print("\n" + "=" * 80)
    print(" ADMIN CREDENTIALS VERIFICATION")
    print("=" * 80 + "\n")
    
    # Check DATABASE_URL
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        print("✗ DATABASE_URL environment variable not set")
        print("\nSet it with:")
        print("  export DATABASE_URL='postgresql://user:password@host:port/database'\n")
        return False
    
    # Import psycopg2
    try:
        import psycopg2
    except ImportError:
        print("✗ psycopg2 not installed")
        print("\nInstall it with:")
        print("  pip install psycopg2-binary\n")
        return False
    
    try:
        # Connect to database
        print("[1/3] Connecting to database...")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        print("      ✓ Connected\n")
        
        # Check if user with email 'admin' exists
        print("[2/3] Checking for user with email 'admin'...")
        cur.execute(
            """SELECT id, email, password_hash, full_name, role, is_active, 
                      created_at, updated_at 
               FROM users 
               WHERE email = %s""",
            ('admin',)
        )
        result = cur.fetchone()
        
        if not result:
            print("      ✗ User with email 'admin' NOT FOUND")
            print("\n      The update may not have been executed yet.")
            print("      Check if user 'admin@motodvigni.ru' still exists:\n")
            
            cur.execute("SELECT email FROM users WHERE email = %s", ('admin@motodvigni.ru',))
            old_user = cur.fetchone()
            if old_user:
                print("      ⚠ Found user with old email: admin@motodvigni.ru")
                print("      Run the update script: python3 backend/EXECUTE_THIS_update_admin.py\n")
            
            cur.close()
            conn.close()
            return False
        
        user_id, email, password_hash, full_name, role, is_active, created_at, updated_at = result
        
        print("      ✓ User found with email 'admin'")
        print("\n      User details:")
        print(f"        - ID: {user_id}")
        print(f"        - Email: {email}")
        print(f"        - Name: {full_name}")
        print(f"        - Role: {role}")
        print(f"        - Active: {is_active}")
        print(f"        - Created: {created_at}")
        print(f"        - Updated: {updated_at}")
        print(f"        - Password hash: {password_hash[:50]}...\n")
        
        # Verify password
        print("[3/3] Verifying password 'Belka1608' against stored hash...")
        
        test_password = "Belka1608"
        try:
            password_match = bcrypt.checkpw(
                test_password.encode('utf-8'), 
                password_hash.encode('utf-8')
            )
            
            if password_match:
                print("      ✓ Password verification SUCCESSFUL")
                print(f"      ✓ Password 'Belka1608' matches the stored hash\n")
            else:
                print("      ✗ Password verification FAILED")
                print(f"      ✗ Password 'Belka1608' does NOT match the stored hash")
                print("\n      The password may not have been updated correctly.\n")
                cur.close()
                conn.close()
                return False
                
        except Exception as e:
            print(f"      ✗ Error during password verification: {e}\n")
            cur.close()
            conn.close()
            return False
        
        cur.close()
        conn.close()
        
        # Success summary
        print("=" * 80)
        print(" ✓ VERIFICATION SUCCESSFUL")
        print("=" * 80)
        print("\nAdmin credentials are correctly configured:")
        print("  Login/Email: admin")
        print("  Password:    Belka1608")
        print(f"  User ID:     {user_id}")
        print(f"  Role:        {role}")
        print(f"  Active:      {is_active}")
        print("\nYou can now login using these credentials.")
        print("=" * 80 + "\n")
        
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}\n")
        return False

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠ Verification cancelled by user\n")
        sys.exit(130)
    except Exception as e:
        print(f"\n\n✗ FATAL ERROR: {e}\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)
