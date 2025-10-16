import bcrypt
password = "Belka1608"
hash_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print(hash_bytes.decode('utf-8'))
