# 🏦 Net Banking Application

A full-stack **Net Banking system** built using **Spring Boot**, **React + TypeScript (Vite)**, and **MySQL**, fully containerized with **Docker Compose**.  
It supports **secure authentication**, **account management**, **fund transfers**, and **persistent data storage** through Docker volumes.

---

## ✨ Features

- 🔐 **JWT Authentication** using Spring Security  
- 👤 **User Registration & Login** with encrypted passwords and profile management 
- 🏦 **Account Management** for Savings, Current, and Fixed Deposit accounts  
- 💳 **Card Management** (Debit & Credit cards)  
- 💸 **Fund Transfers** between accounts with real-time validation  
- 📊 **Transaction History** for all accounts  
- 🐳 **Dockerized Setup** (Frontend + Backend + MySQL)  
- 🎨 **Modern React UI** using Vite, TailwindCSS, and Axios
- 🔒 **Security**: Password encryption, JWT tokens, and secure API endpoints 

---

## 🏗️ Project Structure
```
NET-BANKING/
├── backend/                                 # Spring Boot Backend
│   ├── docker-compose.yml                   # (Lives inside backend)
│   ├── Dockerfile                           # Backend Docker image
│   ├── pom.xml                              # Maven build
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/netbanking/
│   │   │   │   ├── controller/             # REST API Controllers
│   │   │   │   ├── service/                # Business Logic
│   │   │   │   ├── repository/             # JPA Repositories
│   │   │   │   ├── entity/                 # Entity Classes
│   │   │   │   ├── dto/                    # Data Transfer Objects (NEW)
│   │   │   │   └── security/               # JWT + Security Config
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                           # (Optional) Backend tests
│   └── target/                             # (Generated) Build artifacts
│
├── frontend/                                # React + Vite Frontend
│   ├── Dockerfile                           # Frontend Docker image
│   ├── package.json                         # Dependencies & scripts
│   ├── vite.config.ts                       # Vite config
│   ├── tsconfig.json                        # TypeScript config
│   ├── .env                                 # VITE_API_BASE_URL, etc. (optional)
│   └── src/
│       ├── components/                      # Reusable UI Components
│       ├── pages/                           # Login, Register, Dashboard, etc.
│       ├── services/                        # API calls (Axios wrappers)
│       └── lib/axios.ts                     # Axios base instance
│
└── README.md                                # Project documentation

