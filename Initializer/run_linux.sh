#!/bin/bash
echo
echo "=========================================="
echo "   GENERATING NEW JAR AND STARTING DOCKER   "
echo "=========================================="

cd ../Backend
./mvnw clean package -DskipTests
cd ..

echo
echo "=========================================="
echo "   RESTARTING DOCKER CONTAINERS       "
echo "=========================================="

docker compose down

docker compose up -d
echo
echo "=========================================="
echo "   PROJECT RUNNING! READY FOR TESTING    "
echo "=========================================="
echo

read -p "Press [Enter] key to close..."