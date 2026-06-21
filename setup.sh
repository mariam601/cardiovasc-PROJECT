#!/bin/bash
echo "=== CardioVasc Setup Script ==="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.10+"
    exit 1
fi

echo "1. Installing requirements..."
pip install -r requirements.txt

echo ""
echo "2. Running database migrations..."
python3 manage.py migrate

echo ""
echo "3. Creating superuser (optional - press Ctrl+C to skip)..."
python3 manage.py createsuperuser

echo ""
echo "4. Collecting static files..."
python3 manage.py collectstatic --noinput 2>/dev/null || echo "(collectstatic skipped - OK for development)"

echo ""
echo "=== Setup complete! ==="
echo "Run the server with: python3 manage.py runserver"
