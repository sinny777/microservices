for d in accounts iot
do
  (cd services/$d && npm install && npm link ../core)
done

(cd client && npm install)

npm install -g forever