@echo off
echo === CardioVasc Setup Script ===
echo.
echo 1. Installing requirements...
pip install -r requirements.txt
echo.
echo 2. Running database migrations...
python manage.py migrate
echo.
echo 3. Creating superuser (optional)...
python manage.py createsuperuser
echo.
echo === Setup complete! ===
echo Run: python manage.py runserver
pause
