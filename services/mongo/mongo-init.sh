
# mongo --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD'); db = db.getSiblingDB('$DB_NAME'); db.createUser({ user: '$DB_USERNAME', pwd: '$DB_PASSWORD', roles: [{ role: 'readWrite', db: '$DB_NAME' }] });"

# db.auth('admin', '1SatnamW');

# db.auth( 'admin', passwordPrompt() );

# db = db.getSiblingDB('smartthings');

# db.createUser({ user: 'sinny777', pwd: '1SatnamW', roles: [{ role: 'readWrite', db: 'smartthings' }] });

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var authDB = '$MONGO_INITDB_DATABASE';
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB(authDB);
    admin.auth(rootUser, rootPassword);

    db = db.getSiblingDB('$DB_NAME');
    var user = '$DB_USERNAME';
    var passwd = '$DB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF