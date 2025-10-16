#!/usr/bin/env python3
import bcrypt

password = "Belka1608"
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
print(password_hash)
