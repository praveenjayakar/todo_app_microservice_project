# Todo Tracker Microservices Application

A modern, secure, and scalable todo tracking application built with a microservices architecture. This project demonstrates best practices in containerization, security, and modern web development.

## 👨‍💻 Authors

- **Praveen.Guntu** - *Author & Administrator* - [GitHub Profile](https://github.com/praveenjayakar)

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, read, update, and delete tasks
- **User Profiles**: Manage user information and preferences
- **Modern UI**: Responsive and intuitive user interface
- **Secure Architecture**: Built with security best practices

## 🏗️ Architecture

The application follows a microservices architecture with three main components:

### 1. Frontend Service
- Built with React + TypeScript
- Vite for fast development and building
- Nginx for serving static files
- Runs as non-root user for enhanced security
- Port: 80

### 2. Auth Service
- Spring Boot application
- Handles user authentication and authorization
- JWT-based security
- Uses distroless Java image for security
- Port: 8081

### 3. Task Service
- Spring Boot application
- Manages todo tasks
- RESTful API
- Uses distroless Java image for security
- Port: 8083

## 🔧 Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- Java 17 (for local development)

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo_app_microservice_project
   ```

2. Build and start the services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:80
   - Auth Service: http://localhost:8081
   - Task Service: http://localhost:8083

## 🔒 Security Features

- **Non-root Containers**: All services run as non-root users
- **Distroless Images**: Backend services use minimal base images
- **Environment Variables**: Sensitive configuration is managed through environment variables
- **Network Isolation**: Services communicate through a dedicated Docker network

## 📁 Project Structure

```
todo_app_microservice_project/
├── frontend/              # React + TypeScript frontend
│   ├── src/              # Source code
│   ├── public/           # Static files
│   ├── Dockerfile        # Frontend container configuration
│   └── nginx.conf        # Nginx configuration
├── auth-service/         # Authentication service
│   ├── src/              # Java source code
│   └── Dockerfile        # Auth service container configuration
├── task-service/         # Task management service
│   ├── src/              # Java source code
│   └── Dockerfile        # Task service container configuration
└── docker-compose.yml    # Container orchestration
```

## 🔄 Development Workflow

1. **Local Development**:
   - Frontend: `cd frontend && npm install && npm run dev`
   - Backend: Use your preferred Java IDE

2. **Building for Production**:
   ```bash
   docker-compose build
   ```

3. **Running Tests**:
   - Frontend: `cd frontend && npm test`
   - Backend: Use Maven test commands

## 🛡️ Security Considerations

- All services run with least privilege
- No shell access in production containers
- Minimal attack surface in backend services
- Proper file permissions and ownership
- Network isolation between services

## 📚 API Documentation

### Auth Service (8081)
- POST /auth/register - Register new user
- POST /auth/login - User login
- GET /auth/profile - Get user profile

### Task Service (8083)
- GET /tasks - List all tasks
- POST /tasks - Create new task
- PUT /tasks/{id} - Update task
- DELETE /tasks/{id} - Delete task

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React and TypeScript communities
- Spring Boot team
- Docker and containerization community
- All contributors and maintainers
- Special thanks to Praveen.Guntu for architecting and maintaining this project 