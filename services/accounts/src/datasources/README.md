# Datasources

This directory contains config for datasources used by this app.

Currently using Postgresql for user accounts, roles and permissions.  Below are some of the important commands for setting up Postgresql.

 ## Installing Postgresql on Mac Os

 * Remove previous versions of PostgreSQL
```

brew uninstall --force postgresql
rm -rf /usr/local/var/postgres
```

 * Install Postgres with Homebrew
```

brew install postgresql
 ```

  * Start PostgreSQL server
```

pg_ctl -D /usr/local/var/postgres start
```

  * Stop PostgreSQL server
```

pg_ctl -D /usr/local/var/postgres stop
```

 * Create admin user with password
```

createuser --interactive --pwprompt
```

 * Create Database
```

createdb -O admin accounts
```
