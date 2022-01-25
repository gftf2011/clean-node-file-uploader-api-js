set -e

psql -v ON_ERROR_STOP=1 --username="$POSTGRES_USER" --password="$POSTGRES_PASSWORD" --dbname="$POSTGRES_DB" --port="$POSTGRES_PORT"
