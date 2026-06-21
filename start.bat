@echo off
echo =====================================
echo   CardioVasc - Django Web Application
echo =====================================

echo [1/3] Installing dependencies...
pip install -r requirements.txt

echo [2/3] Running database migrations...
python manage.py migrate

echo [3/3] Starting server...
echo.
echo   Open your browser at: http://127.0.0.1:8000
echo   Admin panel at:       http://127.0.0.1:8000/admin
echo   Press Ctrl+C to stop
echo =====================================

python manage.py runserver
