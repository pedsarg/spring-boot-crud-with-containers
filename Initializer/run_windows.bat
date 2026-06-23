@echo off

echo.
echo ==========================================
echo    GENERATING NEW JAR AND STARTING DOCKER    
echo ==========================================
echo.

cd ../Backend
call mvnw.cmd clean package -DskipTests
cd ..

echo.
echo ==========================================
echo    RESTARTING DOCKER CONTAINERS       
echo ==========================================
echo.

docker compose down

docker compose up -d

echo.
echo ==========================================
echo    PROJECT RUNNING! READY FOR TESTING    
echo ==========================================
echo.
pause