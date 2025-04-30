#!/bin/bash

# Copy .env if missing
[ ! -f .env ] && cp .env.example .env

# Wait for MySQL to be REALLY ready (not just accepting connections)
echo "Waiting for MySQL to start..."
timeout=30
while ! mysqladmin ping -h mysql --silent; do
    sleep 1
    timeout=$((timeout - 1))
    if [ $timeout -le 0 ]; then
        echo "MySQL did not start in time!"
        exit 1
    fi
done
echo "MySQL is ready!"

# Run migrations
php artisan migrate --force

# Start Apache
exec apache2-foreground