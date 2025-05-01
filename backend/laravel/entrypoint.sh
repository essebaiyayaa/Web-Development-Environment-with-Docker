#!/bin/bash

# Copier .env si absent
[ ! -f .env ] && cp .env.example .env

# Attente de MySQL prêt
echo "⏳ Waiting for MySQL to be ready..."

until mysql -h mysql -uuser -puserpass -e "SELECT 1;" &>/dev/null
do
  echo "⏱ MySQL not ready yet – sleeping..."
  sleep 3
done

echo "✅ MySQL is ready!"

# Lancer les migrations (en mode force pour prod)
php artisan migrate --force

# Démarrer Apache
exec apache2-foreground

