cp .env.staging .env.production.local
npm run build
rm .env.production.local
