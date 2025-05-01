
FROM php:8.2-apache

# Installer les extensions système
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    libonig-dev \
    libxml2-dev \
    curl \
    git \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql zip

# Activer le module rewrite d'Apache
RUN a2enmod rewrite

# Définir le dossier de travail
WORKDIR /var/www/html

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier les fichiers composer uniquement d'abord (pour optimiser le cache Docker)
COPY composer.json composer.lock ./

# Installer les dépendances PHP
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Copier le reste de l'application
COPY . .

# Copie le .env.example
COPY .env.example .env

# Copier le script d’entrée
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Configuration Apache : pointer vers le dossier public/ et activer .htaccess
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Gérer les permissions Laravel
RUN chown -R www-data:www-data /var/www/html && \
    mkdir -p storage/framework/{sessions,views,cache} && \
    chmod -R 775 storage bootstrap/cache

ENTRYPOINT ["/entrypoint.sh"]
