FROM php:8.2-apache

# System dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    libonig-dev \
    libxml2-dev \
    curl \
    git \
    default-mysql-client \ 
    && docker-php-ext-install pdo pdo_mysql zip

# Apache rewrite module
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy entrypoint
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy ONLY composer.json and composer.lock first (optimize Docker cache)
COPY composer.json composer.lock /var/www/html/

# Install Composer and dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Copy the rest of the application
COPY . /var/www/html

# Fix public directory and Apache settings
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Fix permissions
RUN chown -R www-data:www-data /var/www/html && \
    mkdir -p storage/framework/{sessions,views,cache} && \
    chmod -R 775 storage bootstrap/cache

ENTRYPOINT ["/entrypoint.sh"]
