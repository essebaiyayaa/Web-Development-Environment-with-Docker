FROM mysql:8.0

# Set default environment variables (override in docker-compose)
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=hotel_reservation
ENV MYSQL_USER=laravel
ENV MYSQL_PASSWORD=laravel

# Copy custom MySQL config file
COPY my.cnf /etc/mysql/conf.d/
RUN chmod 644 /etc/mysql/conf.d/my.cnf

# Copy initialization scripts
COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

# Fix permissions for MySQL runtime
RUN mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/run/mysqld