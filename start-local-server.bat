@echo off
echo Starting local web server for MSD Steel website...
echo.
echo Choose your option:
echo 1. PHP Built-in Server (if PHP is installed)
echo 2. Python Simple Server (if Python is installed)
echo 3. Node.js Server (if Node.js is installed)
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting PHP server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    php -S localhost:8000
) else if "%choice%"=="2" (
    echo Starting Python server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    python -m http.server 8000
) else if "%choice%"=="3" (
    echo Starting Node.js server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    npx http-server -p 8000
) else (
    echo Invalid choice. Please run the script again and choose 1, 2, or 3.
    pause
)

pause