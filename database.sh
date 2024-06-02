#!/bin/bash

# Variables
CONTAINER_NAME="postgres-db"
DATABASE_NAME="main"
USER="admin"
PASSWORD="admin"
DUMP_FILE="./database/db_backup.sql"

# Ensure the dump file exists
if [ ! -f "$DUMP_FILE" ]; then
  echo "Dump file $DUMP_FILE does not exist."
  exit 1
fi

# Run the import command
docker exec -i $CONTAINER_NAME psql -U $USER -d $DATABASE_NAME < $DUMP_FILE

if [ $? -eq 0 ]; then
  echo "Database import completed successfully."
else
  echo "Database import failed."
fi
