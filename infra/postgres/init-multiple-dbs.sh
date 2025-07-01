#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE nexora_shadow;
  GRANT ALL PRIVILEGES ON DATABASE nexora_shadow TO $POSTGRES_USER;
EOSQL
