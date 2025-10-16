# 🔐 Admin Password Update - Quick Reference

## ⚡ Execute This Command

```bash
python3 backend/EXECUTE_THIS_update_admin.py
```

**Prerequisites:**
```bash
pip install bcrypt psycopg2-binary
export DATABASE_URL='postgresql://user:password@host:5432/database'
```

## 🎯 What This Does

Changes admin user credentials from:
- ❌ Email: `admin@motodvigni.ru` (old)
- ✅ Email: `admin` (new)
- ✅ Password: `Belka1608` (new, bcrypt hashed)

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/EXECUTE_THIS_update_admin.py` | **RUN THIS** - Main update script |
| `backend/verify_admin_update.py` | Verify update worked |
| `EXECUTE_ADMIN_UPDATE.md` | Complete guide |
| `backend/README_ADMIN_UPDATE.md` | Detailed docs |

## ✅ Verify It Worked

```bash
python3 backend/verify_admin_update.py
```

## 🧪 Test Login

**New credentials:**
- Login: `admin`
- Password: `Belka1608`

## 📚 Documentation

- **Quick Start**: This file
- **Complete Guide**: `EXECUTE_ADMIN_UPDATE.md`
- **Technical Details**: `ADMIN_UPDATE_SUMMARY.md`
- **Full Summary**: `ADMIN_UPDATE_COMPLETE.txt`

## 🔒 Security

- ✅ Bcrypt password hashing
- ✅ Parameterized SQL queries
- ✅ No plain text passwords
- ✅ Proper escaping

---

**Ready?** Run: `python3 backend/EXECUTE_THIS_update_admin.py`
