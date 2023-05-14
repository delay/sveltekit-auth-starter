docker-compose --env-file .env -f docker-compose.yml build
docker-compose --env-file .env -f docker-compose.yml up --build -d
echo "started sveltekit auth starter app example"