#!/bin/bash

echo "Starting local web server for MSD Steel website..."
echo ""
echo "Choose your option:"
echo "1. PHP Built-in Server (if PHP is installed)"
echo "2. Python Simple Server (if Python is installed)"
echo "3. Node.js Server (if Node.js is installed)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "Starting PHP server on http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        php -S localhost:8000
        ;;
    2)
        echo "Starting Python server on http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        python3 -m http.server 8000 2>/dev/null || python -m http.server 8000
        ;;
    3)
        echo "Starting Node.js server on http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        npx http-server -p 8000
        ;;
    *)
        echo "Invalid choice. Please run the script again and choose 1, 2, or 3."
        ;;
esac