import bcrypt

password = "test123"
salt = bcrypt.gensalt()
password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

print(f"Password: {password}")
print(f"Hash: {password_hash}")

# Test verification
test = bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
print(f"Verification test: {test}")
