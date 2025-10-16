#!/bin/bash

# Admin Credentials Update Script
# Updates admin@motodvigni.ru to email='admin' with password='Belka1608'

echo "=========================================="
echo "Admin User Credentials Update"
echo "=========================================="
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if bcrypt is installed
echo "Checking Python dependencies..."
if ! python3 -c "import bcrypt" 2>/dev/null; then
    echo "Installing bcrypt..."
    pip install bcrypt psycopg2-binary
fi

# Run the update script
echo ""
echo "Running update script..."
python3 backend/admin_update_complete.py

echo ""
echo "=========================================="
echo "Update process completed"
echo "=========================================="
