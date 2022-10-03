 #!/usr/bin/env bash

set -e

PGPASSWORD=$POSTGRES_PASSWORD psql -v ON_ERROR_STOP=1 --username postgres postgres <<-EOSQL
    CREATE DATABASE k8sdisturber ENCODING 'UTF8';
    GRANT ALL PRIVILEGES ON DATABASE k8sdisturber TO postgres;

EOSQL