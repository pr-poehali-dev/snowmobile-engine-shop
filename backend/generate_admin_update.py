#!/usr/bin/env python3
'''
Script to generate bcrypt hash and SQL UPDATE statement for admin user
This script generates the necessary SQL to update admin@motodvigni.ru to use:
- Email/login: admin
- Password: Belka1608
'''

import bcrypt

def generate_update_sql():
    # Generate bcrypt hash for the new password
    new_password = "Belka1608"
    password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    print("=" * 80)
    print("ADMIN USER CREDENTIALS UPDATE")
    print("=" * 80)
    print()
    
    print("Step 1: Generated bcrypt hash for password 'Belka1608'")
    print("-" * 80)
    print(f"Password: {new_password}")
    print(f"Bcrypt Hash: {password_hash}")
    print()
    
    # Escape single quotes in the hash for SQL (replace ' with '')
    escaped_hash = password_hash.replace("'", "''")
    
    print("Step 2: SQL UPDATE Statement")
    print("-" * 80)
    
    # Generate the SQL UPDATE statement
    sql_update = f"UPDATE users SET email = 'admin', password_hash = '{escaped_hash}', updated_at = NOW() WHERE email = 'admin@motodvigni.ru';"
    
    print("SQL Statement:")
    print(sql_update)
    print()
    
    print("Step 3: Verification Query (run after update)")
    print("-" * 80)
    print("SELECT id, email, full_name, role, is_active FROM users WHERE email = 'admin';")
    print()
    
    print("=" * 80)
    print("INSTRUCTIONS:")
    print("=" * 80)
    print("1. Copy the SQL UPDATE statement above")
    print("2. Execute it using your database client or perform_sql_query tool")
    print("3. Run the verification query to confirm the update")
    print("4. Test login with:")
    print("   - Email/Login: admin")
    print("   - Password: Belka1608")
    print()
    print("Note: The password_hash has been properly escaped for SQL")
    print("=" * 80)
    
    return sql_update, password_hash

if __name__ == "__main__":
    sql_update, password_hash = generate_update_sql()
