#!/usr/bin/env python3
"""
Simple script to generate bcrypt hash for password 'Belka1608'
Run this to get the hash for the database migration
"""
import bcrypt

password = "Belka1608"
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

print(f"Password: {password}")
print(f"Bcrypt Hash: {password_hash}")
print()
print("Copy this hash to use in your SQL migration file")
