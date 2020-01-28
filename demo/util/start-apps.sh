echo "starting application"

PORT=3000 forever start services/accounts
PORT=3001 forever start services/iot

echo "all node applications started"

echo "serving client"
(cd client && DEBUG="" PORT=443 HTTPS=true npm run start)