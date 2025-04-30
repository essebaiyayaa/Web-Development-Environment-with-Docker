# Hotel Reservation System (Laravel + Angular + Docker)

A full-stack web application with Laravel backend, Angular frontend, and MySQL database, containerized with Docker for easy development and deployment.

## 🚀 Features
- **Backend**: Laravel REST API
- **Frontend**: Angular SPA
- **Database**: MySQL 8.0
- **DevOps**: Dockerized environment with:
  - Hot-reloading for Angular
  - Persistent MySQL data
  - Pre-configured Apache/Nginx

## 📋 Prerequisites
- Docker Compose 2.0+
- Docker
- Git

## 🛠️ Setup
# 1. Clone the repository (if not already cloned)
- git clone https://github.com/Taha7486/first_try.git

- cd first_try


# 3. Start all containers 
- docker compose pull

- docker compose up 

- docker compose exec backend php artisan migrate


# 4. **Access applications**

  -  Frontend: http://localhost:4300

  -  Backend: http://localhost:8000

## Checks
  - http://localhost:8000/api/example (Frontend-Backend Communication)
  - http://localhost:8000/test-db     (Test API Endpoint)
