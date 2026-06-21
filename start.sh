#!/bin/bash
# CardioVasc Django Server Startup Script

echo "====================================="
echo "  CardioVasc - Django Web Application"
echo "====================================="

# Install dependencies
echo "[1/3] Installing dependencies..."
pip install -r requirements.txt --quiet

# Run migrations
echo "[2/3] Running database migrations..."
python manage.py migrate --run-syncdb

# Create superuser if none exists (optional)
echo "[3/3] Starting server..."
echo ""
echo "  Server running at: http://127.0.0.1:8000"
echo "  Admin panel:       http://127.0.0.1:8000/admin"
echo "  Press Ctrl+C to stop"
echo "====================================="

python manage.py runserver 0.0.0.0:8000
