docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
bash ./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5431/postgres" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
npm run test
docker compose down