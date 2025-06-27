
# Web Development Environment with Docker

This project provides a standardized **web development environment** using **Docker** and **Docker Compose**, allowing front-end, back-end, and database services to run seamlessly across different operating systems.

---

##  Technologies Included

- **Frontend**: Angular (or HTML/CSS/JS)
- **Backend**: PHP / Laravel
- **Database**: MySQL
- **Web Server**: Nginx
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Version Control**: Git + GitHub
- **Task Management**: Jira 

---

##  Repository Structure

```
Web-Development-Environment-with-Docker/
├── backend/              # Laravel or PHP backend
│   └── Dockerfile
├── frontend/             # Angular or frontend app
│   └── Dockerfile
├── mysql/                # (Optional) MySQL Docker setup
│   └── Dockerfile
├── docker-compose.yml    # Orchestrates all services
├── .env                  # Environment variables
├── .github/
│   └── workflows/ci.yml  # GitHub Actions CI config
└── README.md             # Project documentation
```

---

##  Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/essebaiyayaa/Web-Development-Environment-with-Docker.git
   cd Web-Development-Environment-with-Docker
   ```

2. **Build and run**

   ```bash
   docker-compose up --build
   ```

3. **Access the applications**

   - Backend (Laravel): `http://localhost:8000`
   - Frontend (Angular): `http://localhost:4200` (or your configured port)
   - MySQL DB: via port `3306`

---

##  CI/CD Integration

Configured through **GitHub Actions**:

- Automatically builds both frontend and backend
- Runs tests (Laravel PHPUnit)
- Invokes database service during pipeline
- CI files located in `.github/workflows/ci.yml`

---

##  Project Context

- Academic project (Operating Systems module) – ENSA, 2024/2025
- Demonstrates containerization, CI/CD, and collaborative development environment

---

##  Contributors

- Aya Essebaiy – Project Manager
- Fatima Elmessaoudi – Developer
- Hajar Hajjou – CI 
- Oumaima Zerbouhi – Docker 
- Nouha Erraboun – Docker & GitHub Specialist

---

##  Related Repositories & Resources

- Sample app using this environment: **THE PEARL** (restaurant ordering system)
- Docker images available on Docker Hub (MySQL, frontend, backend)

---

##  License

Academic project – no license applied.

