@echo off
echo =============================================
echo   RIZOTIC - Applying Update (Static Site)
echo =============================================
cd /d "%~dp0"
echo [1/3] Stopping containers...
docker-compose down
echo [2/3] Building fresh...
docker-compose build --no-cache
echo [3/3] Starting...
docker-compose up -d
echo.
echo Done! Open http://localhost in your browser.
pause
