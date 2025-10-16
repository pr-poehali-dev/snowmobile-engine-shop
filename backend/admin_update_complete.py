#!/usr/bin/env python3
"""
Complete solution to update admin@motodvigni.ru credentials
New credentials: email='admin', password='Belka1608'

This script will:
1. Generate bcrypt hash for 'Belka1608'
2. Create a SQL migration file
3. Optionally execute the update directly if DATABASE_URL is available

Usage:
  python backend/admin_update_complete.py
"""

import bcrypt
import os
import sys

def generate_bcrypt_hash(password):
    """Generate bcrypt hash for given password"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_migration_file(password_hash):
    """Create SQL migration file"""
    migration_number = "V0006"
    migration_name = "update_admin_to_login_admin_password_belka1608"
    filename = f"db_migrations/{migration_number}__{migration_name}.sql"
    
    sql_content = f"""-- Update admin user credentials
-- Change email from admin@motodvigni.ru to 'admin'
-- Set password to 'Belka1608' (bcrypt hash)

UPDATE users 
SET 
    email = 'admin',
    password_hash = '{password_hash}',
    updated_at = NOW()
WHERE email = 'admin@motodvigni.ru';
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(sql_content)
    
    return filename

def execute_update_directly(password_hash):
    """Execute update directly if DATABASE_URL is available"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return False, "DATABASE_URL not set"
    
    try:
        import psycopg2
    except ImportError:
        return False, "psycopg2 not installed"
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Check current state
        cur.execute("SELECT id, email, full_name, role FROM users WHERE email = %s", 
                   ('admin@motodvigni.ru',))
        result = cur.fetchone()
        
        if not result:
            cur.close()
            conn.close()
            return False, "User admin@motodvigni.ru not found"
        
        user_id, old_email, full_name, role = result
        
        # Execute update
        cur.execute(
            """UPDATE users 
               SET email = %s, password_hash = %s, updated_at = NOW() 
               WHERE email = %s""",
            ('admin', password_hash, 'admin@motodvigni.ru')
        )
        
        rows_updated = cur.rowcount
        conn.commit()
        
        # Verify
        cur.execute("SELECT id, email, full_name, role FROM users WHERE email = %s", 
                   ('admin',))
        verify = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if verify and rows_updated == 1:
            return True, f"Successfully updated user (ID: {verify[0]}, Email: {verify[1]})"
        else:
            return False, f"Update executed but verification failed (rows: {rows_updated})"
            
    except Exception as e:
        if 'conn' in locals():
            try:
                conn.rollback()
            except:
                pass
        return False, f"Database error: {str(e)}"

def main():
    print("=" * 80)
    print("ADMIN CREDENTIALS UPDATE - COMPLETE SOLUTION")
    print("=" * 80)
    print()
    
    # Step 1: Generate hash
    print("Step 1: Generating bcrypt hash for password 'Belka1608'...")
    password = "Belka1608"
    password_hash = generate_bcrypt_hash(password)
    print(f"✓ Generated hash: {password_hash}")
    print()
    
    # Step 2: Create migration file
    print("Step 2: Creating SQL migration file...")
    try:
        migration_file = create_migration_file(password_hash)
        print(f"✓ Created migration: {migration_file}")
        print()
    except Exception as e:
        print(f"✗ Failed to create migration: {e}")
        migration_file = None
    
    # Step 3: Show SQL statement
    print("Step 3: SQL UPDATE statement:")
    print("-" * 80)
    sql = f"UPDATE users SET email = 'admin', password_hash = '{password_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
    print(sql)
    print("-" * 80)
    print()
    
    # Step 4: Try direct execution
    print("Step 4: Attempting direct database update...")
    success, message = execute_update_directly(password_hash)
    
    if success:
        print(f"✓ {message}")
        print()
        print("=" * 80)
        print("SUCCESS! Admin credentials have been updated.")
        print("=" * 80)
        print("New login credentials:")
        print("  Email/Login: admin")
        print("  Password: Belka1608")
        print("=" * 80)
    else:
        print(f"✗ Direct update failed: {message}")
        print()
        print("=" * 80)
        print("MANUAL STEPS REQUIRED")
        print("=" * 80)
        if migration_file:
            print(f"1. Review the migration file: {migration_file}")
            print("2. Apply the migration to your database")
        else:
            print("1. Execute the SQL statement shown above")
        print("3. Test login with email='admin' and password='Belka1608'")
        print("=" * 80)
    
    print()
    print("Verification query (run this to confirm):")
    print("SELECT id, email, full_name, role, is_active FROM users WHERE email = 'admin';")
    print()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nCancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nFATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
