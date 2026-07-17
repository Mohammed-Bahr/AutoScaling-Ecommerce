<div align="center">

# 🛒 MERN E-Commerce Platform (Depi Project)

**A full-featured, production-grade e-commerce platform built with the MERN stack, containerized with Docker, and orchestrated on Kubernetes with GitOps workflows.**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-20+-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-kind-326CE5?logo=kubernetes&logoColor=white)](https://kind.sigs.k8s.io)
[![Argo CD](https://img.shields.io/badge/Argo%20CD-2.13-EF7B4D?logo=argo&logoColor=white)](https://argo-cd.readthedocs.io)
[![PayPal](https://img.shields.io/badge/PayPal-Integration-00457C?logo=paypal&logoColor=white)](https://developer.paypal.com)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Backend Structure](#-backend-structure)
- [Frontend Structure](#-frontend-structure)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [DevOps & Deployment](#-devops--deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Project Roadmap](#-project-roadmap)

---

## 📖 Project Overview

A complete e-commerce web application built as the **Depi Project** — designed to demonstrate modern full-stack development practices, DevOps automation, and cloud-native deployments. It includes:

- **User-facing features:** Product browsing, shopping cart, wishlist (favorites), checkout with PayPal, order tracking
- **Admin dashboard:** Product/category/user/order management, sales analytics with interactive charts
- **DevOps pipeline:** Docker containers, Kubernetes orchestration, GitOps with Argo CD, automated CI/CD via GitHub Actions, static code analysis with SonarQube, and DAST security scanning with OWASP ZAP

---

## 🛠 Tech Stack

### Frontend (`/frontend`)

| Technology | Version | Purpose |
|---|---|---|
| **React** | ^18.2.0 | UI library |
| **React Router** | ^6.17.0 | Client-side routing |
| **Redux Toolkit (RTK Query)** | ^1.9.7 | State management & API data fetching |
| **Vite** | ^4.4.5 | Build tool & dev server |
| **Tailwind CSS** | ^3.3.5 | Utility-first CSS framework |
| **Flowbite** | ^2.0.0 | Tailwind UI component library |
| **ApexCharts** | ^4.0.0 | Interactive charts (admin dashboard) |
| **React ApexCharts** | ^1.9.0 | React wrapper for ApexCharts |
| **React Icons** | ^4.11.0 | Icon library |
| **React Slick** | ^0.29.0 | Product carousel |
| **React Toastify** | ^9.1.3 | Toast notifications |
| **PayPal JS** | ^8.1.3 | PayPal payment integration |
| **Moment.js** | ^2.29.4 | Date formatting |
| **PostCSS** | ^8.4.31 | CSS post-processor |
| **Autoprefixer** | ^10.4.16 | CSS vendor prefixes |
| **ESLint** | ^8.45.0 | Code linting |

### Backend (`/backend`)

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20.x | Runtime |
| **Express** | ^4.18.2 | Web framework |
| **Mongoose** | ^7.6.3 | MongoDB ODM |
| **MongoDB** | 7.0 | Database |
| **JSON Web Token** | ^9.0.2 | Authentication |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **Cookie-Parser** | ^1.4.6 | Cookie parsing |
| **Multer** | ^1.4.5-lts.1 | File uploads |
| **Express-Formidable** | ^1.2.0 | Form data parsing |
| **Express-Async-Handler** | ^1.2.0 | Async error handling |
| **dotenv** | ^16.6.1 | Environment variables |
| **CORS** | ^2.8.5 | Cross-origin requests |
| **Nodemon** | ^3.0.1 | Development auto-reload |
| **Concurrently** | ^8.2.2 | Run frontend & backend simultaneously |

### DevOps & Infrastructure

| Technology | Version | Purpose |
|---|---|---|
| **Docker** | 20+ | Containerization |
| **kind** | v1.29.2 | Local Kubernetes clusters |
| **Kubernetes** | - | Container orchestration |
| **Kustomize** | - | Kubernetes manifest templating |
| **Argo CD** | v2.13.1 | GitOps deployment |
| **ingress-nginx** | v1.11.2 | Ingress controller |
| **Helm** | - | Kubernetes package manager |
| **GitHub Actions** | - | CI/CD pipelines |
| **SonarQube** | - | Static code analysis |
| **TruffleHog** | - | Secret scanning |
| **OWASP ZAP** | - | DAST security scanning |
| **local-path-provisioner** | v0.0.30 | Kubernetes storage provisioner |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
└──────────────┬────────────────────┬──────────────────┘
               │                    │
        ┌──────▼──────┐     ┌──────▼──────┐
        │  Frontend   │     │   Ingress    │
        │  (React +   │     │  (nginx)     │
        │   Vite)     │     │              │
        │  Port: 5173 │     │  Port: 80    │
        └──────┬──────┘     └──────┬──────┘
               │                    │
               └────────┬───────────┘
                        │
               ┌────────▼────────┐
               │    Backend      │
               │   (Express)     │
               │   Port: 5000    │
               └────────┬────────┘
                        │
               ┌────────▼────────┐
               │     MongoDB     │
               │   Port: 27017   │
               └─────────────────┘
```

### In-Cluster Architecture (Kubernetes)

```
┌─────────────────────────────────────────────────────┐
│                 kind Cluster                         │
│                                                      │
│  ┌──────────────┐    ┌──────────────┐               │
│  │  Frontend     │    │   Backend    │               │
│  │  (nginx:80)   │    │  (Express:   │               │
│  │  Replicas: 1  │    │   5000)      │               │
│  └──────┬───────┘    │  Replicas: 1  │               │
│         │            └──────┬───────┘               │
│         │                   │                        │
│         │            ┌──────▼───────┐               │
│         │            │   MongoDB    │               │
│         │            │  StatefulSet │               │
│         │            │  PVC: 5Gi    │               │
│         │            └──────────────┘               │
│         │                                            │
│  ┌──────▼──────────────────────────────────────┐    │
│  │          Ingress (nginx)                    │    │
│  │  /api/* → backend, /* → frontend            │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │          Argo CD (GitOps)                   │    │
│  │  Syncs from Manifests/overlays/dev          │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Backend Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── categoryController.js     # Category CRUD operations
│   ├── orderController.js        # Order management, payments, delivery
│   ├── productController.js      # Product CRUD, reviews, filtering
│   └── userController.js         # User auth, profile, admin user management
├── middlewares/
│   ├── asyncHandler.js           # Async error wrapper
│   ├── authMiddleware.js         # JWT authentication & admin authorization
│   └── checkId.js                # MongoDB ObjectId validation
├── models/
│   ├── categoryModel.js          # Category schema
│   ├── orderModel.js             # Order schema with items, shipping, payment
│   ├── productModel.js           # Product schema with reviews
│   └── userModel.js              # User schema
├── routes/
│   ├── categoryRoutes.js         # /api/category endpoints
│   ├── orderRoutes.js            # /api/orders endpoints
│   ├── productRoutes.js          # /api/products endpoints
│   ├── uploadRoutes.js           # /api/upload (image upload via multer)
│   └── userRoutes.js             # /api/users endpoints
├── utils/
│   └── createToken.js            # JWT token generation + HTTP-only cookie
├── index.js                      # Express app entry point
├── seed.js                       # Database seeder (categories, users, products)
├── dockerfile                    # Docker build for production
└── package.json
```

---

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CategoryForm.jsx      # Category creation/editing form
│   │   ├── Header.jsx            # Homepage hero/banner
│   │   ├── Loader.jsx            # Loading spinner
│   │   ├── Message.jsx           # Alert/error messages
│   │   ├── Modal.jsx             # Reusable modal dialog
│   │   ├── PrivateRoute.jsx      # Auth guard for authenticated routes
│   │   └── ProgressSteps.jsx     # Checkout progress indicator
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx  # Analytics dashboard (charts)
│   │   │   ├── AdminMenu.jsx       # Admin sidebar navigation
│   │   │   ├── AdminRoute.jsx      # Admin authorization guard
│   │   │   ├── AllProducts.jsx     # All products view
│   │   │   ├── CategoryList.jsx    # Category management
│   │   │   ├── OrderList.jsx       # Order management
│   │   │   ├── ProductList.jsx     # Paginated product management
│   │   │   ├── ProductUpdate.jsx   # Edit product
│   │   │   └── UserList.jsx        # User management
│   │   ├── Auth/
│   │   │   ├── Login.jsx           # User login
│   │   │   ├── Navigation.jsx      # Top navigation bar
│   │   │   └── Register.jsx        # User registration
│   │   ├── Orders/
│   │   │   ├── Order.jsx           # Order details
│   │   │   ├── PlaceOrder.jsx      # Order confirmation
│   │   │   └── Shipping.jsx        # Shipping address form
│   │   ├── Products/
│   │   │   ├── Favorites.jsx       # Wishlist page
│   │   │   ├── FavoritesCount.jsx  # Wishlist badge
│   │   │   ├── HeartIcon.jsx       # Favorite toggle button
│   │   │   ├── Product.jsx         # Product card
│   │   │   ├── ProductCard.jsx     # Detailed product card
│   │   │   ├── ProductCarousel.jsx # Top products carousel
│   │   │   ├── ProductDetails.jsx  # Single product view
│   │   │   ├── ProductTabs.jsx     # Reviews & description tabs
│   │   │   ├── Products.jsx        # Products grid
│   │   │   ├── Ratings.jsx         # Star rating component
│   │   │   └── SmallProduct.jsx    # Compact product card
│   │   ├── Cart.jsx                # Shopping cart
│   │   ├── Home.jsx                # Landing page
│   │   ├── Shop.jsx                # Product listing with filters
│   │   └── User/
│   │       ├── Profile.jsx         # User profile editing
│   │       └── UserOrder.jsx       # User order history
│   ├── redux/
│   │   ├── api/
│   │   │   ├── apiSlice.js         # RTK Query base API
│   │   │   ├── categoryApiSlice.js # Category API endpoints
│   │   │   ├── orderApiSlice.js    # Order API endpoints
│   │   │   ├── productApiSlice.js  # Product API endpoints
│   │   │   └── usersApiSlice.js    # User API endpoints
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── authSlice.js    # Auth state management
│   │   │   ├── cart/
│   │   │   │   └── cartSlice.js    # Cart state management
│   │   │   ├── favorites/
│   │   │   │   └── favoriteSlice.js # Wishlist state management
│   │   │   └── shop/
│   │   │       └── shopSlice.js    # Shop filters state
│   │   ├── constants.js            # API URL constants
│   │   └── store.js                # Redux store configuration
│   └── Utils/
│       ├── cartUtils.js            # Cart calculation utilities
│       └── localStorage.js         # LocalStorage helpers
├── Assets/
│   ├── index.html                  # HTML entry point
│   ├── nginx.conf                  # Nginx SPA configuration
│   ├── dockerfile                  # Docker build (Vite → nginx)
│   ├── vite.config.js              # Vite config with proxy
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── postcss.config.js           # PostCSS configuration
```

---

## 🌐 API Endpoints

### Users — `/api/users`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `POST` | `/` | - | - | Register a new user |
| `GET` | `/` | ✅ | ✅ | Get all users |
| `POST` | `/auth` | - | - | Login user |
| `POST` | `/logout` | - | - | Logout user (clear cookie) |
| `GET` | `/profile` | ✅ | - | Get current user profile |
| `PUT` | `/profile` | ✅ | - | Update current user profile |
| `GET` | `/:id` | ✅ | ✅ | Get user by ID |
| `PUT` | `/:id` | ✅ | ✅ | Update user by ID |
| `DELETE` | `/:id` | ✅ | ✅ | Delete user by ID |

### Categories — `/api/category`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `POST` | `/` | ✅ | ✅ | Create a category |
| `PUT` | `/:categoryId` | ✅ | ✅ | Update a category |
| `DELETE` | `/:categoryId` | ✅ | ✅ | Delete a category |
| `GET` | `/categories` | - | - | List all categories |
| `GET` | `/:id` | - | - | Get single category |

### Products — `/api/products`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `GET` | `/` | - | - | Fetch products (with pagination & keyword search) |
| `POST` | `/` | ✅ | ✅ | Create a product (formidable) |
| `GET` | `/allproducts` | - | - | Fetch all products (populated with category) |
| `POST` | `/filtered-products` | - | - | Filter products by category & price range |
| `GET` | `/top` | - | - | Get top-rated products (top 4) |
| `GET` | `/new` | - | - | Get newest products (top 5) |
| `GET` | `/:id` | - | - | Get product by ID |
| `PUT` | `/:id` | ✅ | ✅ | Update product (formidable) |
| `DELETE` | `/:id` | ✅ | ✅ | Delete product |
| `POST` | `/:id/reviews` | ✅ | - | Add product review |

### Orders — `/api/orders`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `POST` | `/` | ✅ | - | Create a new order |
| `GET` | `/` | ✅ | ✅ | Get all orders |
| `GET` | `/mine` | ✅ | - | Get current user's orders |
| `GET` | `/total-orders` | - | - | Get total order count |
| `GET` | `/total-sales` | - | - | Get total sales amount |
| `GET` | `/total-sales-by-date` | - | - | Get sales aggregated by date |
| `GET` | `/:id` | ✅ | - | Get order by ID |
| `PUT` | `/:id/pay` | ✅ | - | Mark order as paid |
| `PUT` | `/:id/deliver` | ✅ | ✅ | Mark order as delivered |

### Upload — `/api/upload`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `POST` | `/` | - | - | Upload an image (jpeg/png/webp via multer) |

### Config — `/api/config`

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| `GET` | `/paypal` | - | - | Get PayPal client ID |

---

## 💾 Database Models

### User Model
| Field | Type | Constraints |
|-------|------|-------------|
| `username` | String | required |
| `email` | String | required, unique |
| `password` | String | required |
| `isAdmin` | Boolean | default: `false` |
| `timestamps` | - | createdAt, updatedAt |

### Product Model
| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | required |
| `image` | String | required |
| `brand` | String | required |
| `quantity` | Number | required |
| `category` | ObjectId (ref: Category) | required |
| `description` | String | required |
| `reviews` | [ReviewSchema] | embedded subdocument |
| `rating` | Number | default: 0 |
| `numReviews` | Number | default: 0 |
| `price` | Number | default: 0 |
| `countInStock` | Number | default: 0 |
| `timestamps` | - | createdAt, updatedAt |

#### Review Subdocument
| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | required |
| `rating` | Number | required |
| `comment` | String | required |
| `user` | ObjectId (ref: User) | required |
| `timestamps` | - | createdAt, updatedAt |

### Category Model
| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | required, unique, maxLength: 32, trimmed |

### Order Model
| Field | Type | Constraints |
|-------|------|-------------|
| `user` | ObjectId (ref: User) | required |
| `orderItems` | [OrderItemSchema] | embedded subdocuments |
| `shippingAddress` | { address, city, postalCode, country } | all required |
| `paymentMethod` | String | required |
| `paymentResult` | { id, status, update_time, email_address } | optional |
| `itemsPrice` | Number | default: 0.0 |
| `taxPrice` | Number | default: 0.0 |
| `shippingPrice` | Number | default: 0.0 |
| `totalPrice` | Number | default: 0.0 |
| `isPaid` | Boolean | default: `false` |
| `paidAt` | Date | optional |
| `isDelivered` | Boolean | default: `false` |
| `deliveredAt` | Date | optional |
| `timestamps` | - | createdAt, updatedAt |

---

## ☸ DevOps & Deployment

### Docker

Two multi-stage Docker images:

- **Backend** (`/backend/dockerfile`): `node:20-alpine` → installs deps → runs `node index.js` on port 5000
- **Frontend** (`/frontend/dockerfile`): `node:20-alpine` (build) → `nginx:1.25-alpine` (serve) on port 80 with SPA routing

The frontend nginx configuration (`/frontend/nginx.conf`) handles:
- SPA fallback routing (`try_files $uri /index.html`)
- API proxy to backend at `/api/`
- Uploads proxy to backend at `/uploads/`

### Kubernetes (kind)

Complete Kubernetes manifests located in `/Manifests/`:

```
Manifests/
├── base/                              # Base Kustomize manifests
│   ├── 00-namespace.yaml              # Namespace: ecom
│   ├── 10-mongo-secret.yaml           # MongoDB credentials
│   ├── 11-mongo-pvc.yaml              # 5Gi persistent volume claim
│   ├── 12-mongo-statefulset.yaml      # MongoDB StatefulSet + Services
│   ├── 13-mongo-init-configmap.yaml   # MongoDB init script (app user)
│   ├── 20-backend-secret.yaml         # JWT secret, PayPal ID, MONGO_URI
│   ├── 21-backend-deployment.yaml     # Backend Deployment + Service
│   ├── 30-frontend-configmap.yaml     # VITE_API_BASE_URL config
│   ├── 31-frontend-deployment.yaml    # Frontend Deployment + Service
│   ├── 40-ingress.yaml                # Ingress (nginx) with path rewrite
│   └── kustomization.yaml
├── overlays/
│   └── dev/                           # Dev environment patches
│       └── kustomization.yaml         # Override secrets & scale replicas
├── argocd/
│   └── application.yaml               # Argo CD Application definition
└── scripts/
    ├── kind-config.yaml               # Cluster config with port mapping
    ├── 00-create-cluster.sh           # Create kind cluster
    ├── 01-install-storage.sh          # Install local-path-provisioner
    ├── 02-install-ingress.sh          # Install ingress-nginx
    ├── 03-install-argocd.sh           # Install Argo CD + apply application
    ├── 04-build-and-load-images.sh    # Build & load Docker images
    └── 05-port-forward-ui.sh          # Port-forward frontend
```

#### Key Kubernetes Features

- **StatefulSet** for MongoDB (stable network identity, ordered scaling)
- **Headless Service** (`mongodb`) + **ClusterIP Service** (`mongodb-client`) for MongoDB
- **initContainers**: fix MongoDB data permissions + wait for Mongo before starting backend
- **ConfigMap** mounted at `/docker-entrypoint-initdb.d` for MongoDB user initialization
- **PersistentVolumeClaim** (5Gi) using `local-path` storage class
- **Ingress** with path-based routing: `/api/*` → backend, `/*` → frontend
- **Readiness & Liveness probes** for all pods
- **Resource requests/limits** for all containers
- **RollingUpdate** strategy with zero downtime

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

Located in `.github/workflows/` and `XFiles/`:

#### 1. General CI Pipeline (`XFiles/mahmoud-ci.yml`)
Triggered on push/PR to `main` branch:

| Stage | Tool | Description |
|-------|------|-------------|
| **Secret Scan** | TruffleHog | Scans for leaked credentials |
| **Lint, Test & Build** | ESLint, npm | Runs on Node 20 for both backend & frontend |
| **Static Analysis** | SonarQube | Code quality & security analysis |
| **DAST & Functional** | OWASP ZAP | Dynamic security scanning |

#### 2. Backend CD (`XFiles/mahmoud-ImageB.yml`)
Triggered on push to `mahmoud` branch with changes to `backend/**`:
- Builds Docker image → pushes to Docker Hub (tagged with `run_id` & `latest`)
- Updates Helm `values.yaml` with new image tag
- Commits & pushes infrastructure changes

#### 3. Frontend CD (`XFiles/mahmoud-ImageF.yml`)
Triggered on push to `mahmoud` branch with changes to `frontend/**`:
- Builds Docker image → pushes to Docker Hub (tagged with `run_id` & `latest`)
- Updates Helm `values.yaml` with new image tag
- Commits & pushes infrastructure changes

#### 4. Docker Hub Publish (`XFiles/BB-Image.yml` — commented out)
Alternative workflow for building & pushing both images to Docker Hub.

### SonarQube Configuration (`sonar-project.properties`)

```properties
sonar.organization=mohammed-bahr
sonar.projectKey=Mohammed-Bahr_AutoScaling-Ecommerce
sonar.sources=backend,frontend/src
sonar.inclusions=**/*.js,**/*.jsx,**/*.ts,**/*.tsx
sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**
```

### GitOps with Argo CD

Argo CD is configured with:
- **Auto-sync** with `prune: true` and `selfHeal: true`
- **ServerSideApply** for field-manager compatibility
- **Retry** with exponential backoff (up to 5 minutes)
- **Kustomize** pointing at `Manifests/overlays/dev`
- **Revision history** of 10 deployments

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x
- MongoDB 7.0 (local or Atlas)
- Docker (for containerization)
- kind + kubectl (for Kubernetes deployment)
- Helm (optional, for Argo CD)

### Local Development Setup

1. **Clone the repository**

```bash
git clone <repo-url>
cd depi-project
```

2. **Install dependencies**

```bash
# Root (dev tools)
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

3. **Set up environment variables**

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/depi-project
JWT_SECRET=your-secret-key
PAYPAL_CLIENT_ID=your-paypal-client-id
PORT=5000
NODE_ENV=development
```

4. **Seed the database**

```bash
npm run seed
```

This populates:
- **10 categories** (Electronics, Fashion, Home & Kitchen, Sports & Outdoors, Books, Beauty & Personal Care, Toys & Games, Automotive, Health & Wellness, Office Supplies)
- **11 users** (10 regular + 1 admin)
- **500+ products** with reviews and ratings

**Admin credentials:** `admin@example.com` / `admin123`

5. **Start development servers**

```bash
npm run dev
```

Runs both frontend (Vite dev server on port 5173) and backend (Express on port 5001) concurrently.

### Docker Deployment

```bash
# Build & run backend
cd backend
docker build -t mern-backend .
docker run -p 5000:5000 mern-backend

# Build & run frontend
cd frontend
docker build -t mern-frontend .
docker run -p 80:80 mern-frontend
```

### Kubernetes (kind) Deployment

```bash
# 1. Create the cluster
./Manifests/scripts/00-create-cluster.sh

# 2. Install storage
./Manifests/scripts/01-install-storage.sh

# 3. Install ingress
./Manifests/scripts/02-install-ingress.sh

# 4. Install Argo CD
./Manifests/scripts/03-install-argocd.sh

# 5. Build images & load into cluster
./Manifests/scripts/04-build-and-load-images.sh

# 6. Access the app
# Via ingress: http://localhost
# Via port-forward: ./Manifests/scripts/05-port-forward-ui.sh → http://localhost:8080
```

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `concurrently "npm run frontend" "npm run backend"` | Start both servers |
| `npm run backend` | `nodemon backend/index.js` | Start backend (port 5001) |
| `npm run frontend` | `npm run dev --prefix frontend` | Start frontend (port 5173) |
| `npm run seed` | `node backend/seed.js` | Seed database with sample data |
| `npm run build` (frontend) | `vite build` | Build frontend for production |
| `npm run lint` (frontend) | `eslint . --ext js,jsx` | Lint frontend code |
| `npm run preview` (frontend) | `vite preview` | Preview production build |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `PAYPAL_CLIENT_ID` | ❌ | PayPal REST API client ID |
| `PORT` | ❌ | Backend port (default: 5000) |
| `NODE_ENV` | ❌ | Environment (development/production) |

---

## 🧩 Key Features

### User Features
- ✅ User registration & login with JWT (HTTP-only cookies)
- ✅ Product browsing with search, category & price filtering
- ✅ Product carousel (top-rated & newest arrivals)
- ✅ Product reviews & star ratings
- ✅ Shopping cart management
- ✅ Wishlist (favorites) — persisted in localStorage
- ✅ Checkout flow (shipping → payment → confirmation)
- ✅ PayPal payment integration
- ✅ Order history & tracking
- ✅ Profile management

### Admin Features
- ✅ Admin dashboard with interactive charts (ApexCharts)
  - Sales overview
  - Daily sales trends
  - Order statistics
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ User management (list, edit, delete)
- ✅ Order management (view, mark delivered)
- ✅ Image upload for products

### Technical Features
- ✅ RTK Query for efficient API caching & state management
- ✅ Lazy loading & code splitting
- ✅ Responsive Tailwind CSS design
- ✅ SPA routing with React Router v6
- ✅ Server-side pagination
- ✅ Async error handling middleware
- ✅ MongoDB ObjectId validation
- ✅ Cookie-based JWT authentication
- ✅ Admin authorization middleware
- ✅ File upload with type validation (jpeg/png/webp)

---

## 🧪 Testing & Quality

- **Static Analysis**: SonarQube scanning backend & frontend source
- **Secret Scanning**: TruffleHog prevents credential leaks
- **Dynamic Testing**: OWASP ZAP baseline security scan
- **Linting**: ESLint with React & React Hooks plugins
- **Future**: Backend & frontend test suites (placeholders in CI)

---

## 📦 Dependencies Summary

### Root (dev orchestrator)
| Package | Purpose |
|---------|---------|
| `bcryptjs` | Password hashing (root-level dep) |
| `concurrently` | Run multiple npm scripts |
| `cookie-parser` | Parse cookies |
| `cors` | CORS headers |
| `dotenv` | Environment variables |
| `express` | Web framework |
| `express-async-handler` | Async error handling |
| `express-formidable` | Form data parsing |
| `jsonwebtoken` | JWT auth |
| `mongoose` | MongoDB ODM |
| `multer` | File uploads |
| `nodemon` | Dev auto-restart |
| `prop-types` | React prop types |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**HuXn WebDev** — Initial work and architecture.

---

## 🙏 Acknowledgements

- [MERN Stack](https://www.mongodb.com/mern-stack) — Full-stack JavaScript framework
- [Redux Toolkit](https://redux-toolkit.js.org/) — State management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) — Data fetching & caching
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Vite](https://vitejs.dev/) — Next-gen build tool
- [kind](https://kind.sigs.k8s.io/) — Kubernetes in Docker
- [Argo CD](https://argo-cd.readthedocs.io/) — GitOps CD tool
- [PayPal Developer](https://developer.paypal.com/) — Payment gateway

---

<div align="center">
Made with ❤️ as part of the DEPI Program
</div>
