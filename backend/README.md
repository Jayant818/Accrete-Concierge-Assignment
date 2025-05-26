# Ping Chat Service

A simple chat "ping" service with a React frontend and NestJS backend, deployed to Kubernetes.

## Project Overview

This project implements a minimal chat service with the following components:

- **Backend API**: NestJS application with a `/ping` endpoint for sending messages
- **Frontend**: React application with a `PingWindow` component for displaying messages
- **Containerization**: Docker images for both frontend and backend
- **CI/CD**: GitHub Actions pipeline for testing, building, and deploying
- **Deployment**: Kubernetes manifests for deploying to GKE

## Features

- ✅ Real-time messaging with auto-scrolling
- ✅ Different styles for incoming and outgoing messages
- ✅ Dockerized applications for easy deployment
- ✅ Kubernetes deployment with ingress routing
- ✅ CI/CD pipeline for automated deployment


## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker
- kubectl (for deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ping-chat-service.git
   cd ping-chat-service
   ```

2. Start the backend:
   ```bash
   cd backend
   pnpm install
   pnpm start:dev
   ```

3. Start the frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

4. Open your browser at http://localhost:3000

### Docker Compose

You can also run the application using Docker Compose:

```bash
docker-compose up
```

## Deployment

The application is deployed to Google Kubernetes Engine (GKE) using GitHub Actions.

### Kubernetes Resources

- `k8s/deployment.yml`: Defines the backend and frontend deployments
- `k8s/service.yml`: Defines the services for accessing the deployments
- `k8s/ingress.yml`: Configures the ingress for routing traffic

### Manual Deployment

1. Build and push the Docker images:
   ```bash
   docker build -t yourusername/ping-chat-backend:latest ./backend
   docker build -t yourusername/ping-chat-frontend:latest ./frontend
   docker push yourusername/ping-chat-backend:latest
   docker push yourusername/ping-chat-frontend:latest
   ```

2. Apply the Kubernetes manifests:
   ```bash
   kubectl apply -f k8s/deployment.yml
   kubectl apply -f k8s/service.yml
   kubectl apply -f k8s/ingress.yml
   ```

## CI/CD Pipeline

The GitHub Actions workflow in `.github/workflows/ci-cd.yml` automates:

1. Testing the frontend and backend
2. Building Docker images
3. Pushing images to Docker Hub
4. Deploying to GKE

## Project Structure

```
├── backend/                # NestJS backend application
│   ├── src/                # Source code
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend application
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   └── services/       # API services
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json        # Frontend dependencies
├── k8s/                    # Kubernetes configuration
│   ├── deployment.yml      # Deployment configuration
│   ├── service.yml         # Service configuration
│   └── ingress.yml         # Ingress configuration
├── .github/workflows/      # GitHub Actions workflows
│   └── ci-cd.yml           # CI/CD pipeline configuration
└── docker-compose.yml      # Docker Compose configuration
```
