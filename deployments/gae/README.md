
## Google Cloud SQL (PostgreSQL)

  - Start a Google Cloud SQL instance of PostgreSQL
  - Connect using PGAdmin or psql client.  For eg.

```

  psql "sslmode=verify-ca sslrootcert=server-ca.pem \
      sslcert=client-cert.pem sslkey=client-key.pem \
      hostaddr=34.87.171.228 \
      port=5432 \
      user=postgres dbname=postgres"
```