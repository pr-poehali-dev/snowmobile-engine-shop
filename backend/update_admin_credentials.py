#!/usr/bin/env python3
'''
Complete script to update admin user credentials
Updates user admin@motodvigni.ru to have email='admin' and password='Belka1608'
'''

import os
import sys
import bcrypt

def generate_hash_and_sql():
    """Generate bcrypt hash and SQL statement"""
    new_password = "Belka1608"
    password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Escape single quotes in the hash for SQL (replace ' with '')
    escaped_hash = password_hash.replace("'", "''")
    
    # Generate the SQL UPDATE statement
    sql_update = f"UPDATE users SET email = 'admin', password_hash = '{escaped_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
    
    return password_hash, sql_update

def execute_update_with_db():
    """Execute the update if DATABASE_URL is available"""
    try:
        import psycopg2
    except ImportError:
        print("ERROR: psycopg2 not installed. Install with: pip install psycopg2-binary")
        return False
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        print("ERROR: DATABASE_URL environment variable not set")
        return False
    
    password_hash, sql_update = generate_hash_and_sql()
    
    print("=" * 80)
    print("EXECUTING ADMIN USER UPDATE")
    print("=" * 80)
    print()
    
    try:
        # Connect to database
        print("Connecting to database...")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Check current user
        print("\nChecking for user 'admin@motodvigni.ru'...")
        cur.execute("SELECT id, email, full_name, role, is_active FROM users WHERE email = %s", ('admin@motodvigni.ru',))
        result = cur.fetchone()
        
        if not result:
            print("ERROR: User 'admin@motodvigni.ru' not found in database!")
            cur.close()
            conn.close()
            return False
        
        user_id, old_email, full_name, role, is_active = result
        print(f"Found user:")
        print(f"  ID: {user_id}")
        print(f"  Email: {old_email}")
        print(f"  Name: {full_name}")
        print(f"  Role: {role}")
        print(f"  Active: {is_active}")
        
        # Execute update
        print("\nExecuting UPDATE...")
        print(f"Generated bcrypt hash: {password_hash}")
        print(f"\nSQL: {sql_update}")
        
        cur.execute(
            "UPDATE users SET email = %s, password_hash = %s, updated_at = NOW() WHERE email = %s",
            ('admin', password_hash, 'admin@motodvigni.ru')
        )
        
        rows_affected = cur.rowcount
        conn.commit()
        
        print(f"\nSUCCESS: Updated {rows_affected} row(s)")
        
        # Verify update
        print("\nVerifying update...")
        cur.execute("SELECT id, email, full_name, role, is_active FROM users WHERE email = %s", ('admin',))
        verify_result = cur.fetchone()
        
        if verify_result:
            print("Verified - User details after update:")
            print(f"  ID: {verify_result[0]}")
            print(f"  Email: {verify_result[1]}")
            print(f"  Name: {verify_result[2]}")
            print(f"  Role: {verify_result[3]}")
            print(f"  Active: {verify_result[4]}")
            print()
            print("=" * 80)
            print("✓ ADMIN LOGIN UPDATED SUCCESSFULLY!")
            print("=" * 80)
            print("New credentials:")
            print("  Login/Email: admin")
            print("  Password: Belka1608")
            print("=" * 80)
        else:
            print("WARNING: Could not verify the update!")
        
        cur.close()
        conn.close()
        return True
        
    except psycopg2.IntegrityError as e:
        print(f"\nERROR: Database integrity constraint violation")
        print(f"Details: {e}")
        print("This likely means a user with email 'admin' already exists")
        if 'conn' in locals():
            conn.rollback()
        return False
        
    except Exception as e:
        print(f"\nERROR: {e}")
        if 'conn' in locals():
            conn.rollback()
        return False

def main():
    print()
    print("=" * 80)
    print("ADMIN USER CREDENTIALS UPDATE SCRIPT")
    print("=" * 80)
    print()
    
    # Try to execute with database connection
    if os.environ.get('DATABASE_URL'):
        print("DATABASE_URL found - attempting direct database update...")
        success = execute_update_with_db()
        if success:
            return
    else:
        print("DATABASE_URL not found - generating SQL statement only...")
        print()
    
    # If database execution failed or not available, generate SQL
    password_hash, sql_update = generate_hash_and_sql()
    
    print("=" * 80)
    print("GENERATED UPDATE INFORMATION")
    print("=" * 80)
    print()
    print(f"Password: Belka1608")
    print(f"Bcrypt Hash: {password_hash}")
    print()
    print("SQL UPDATE Statement:")
    print("-" * 80)
    print(sql_update)
    print("-" * 80)
    print()
    print("Verification Query (run after update):")
    print("SELECT id, email, full_name, role, is_active FROM users WHERE email = 'admin';")
    print()
    print("=" * 80)
    print("MANUAL EXECUTION INSTRUCTIONS:")
    print("=" * 80)
    print("1. Copy the SQL UPDATE statement above")
    print("2. Connect to your database using your preferred client")
    print("3. Execute the UPDATE statement")
    print("4. Run the verification query")
    print("5. Test login with email='admin' and password='Belka1608'")
    print("=" * 80)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nFATAL ERROR: {e}")
        sys.exit(1)
