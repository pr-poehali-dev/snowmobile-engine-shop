#!/usr/bin/env python3
# Simple bcrypt hash generator for password "Belka1608"
# Run: python3 generate_hash_simple.py

import bcrypt

password = "Belka1608"
hash_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
hash_string = hash_bytes.decode('utf-8')

print(hash_string)
