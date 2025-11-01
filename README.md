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
├── backend/                                  # Spring Boot Backend
│   ├── docker-compose.yml                    # (Compose kept inside backend)
│   ├── Dockerfile                            # Backend image
│   ├── pom.xml                               # Maven build
│   └── src/
│       └── main/
│           ├── java/com/netbanking/
│           │   ├── controller/               # REST Controllers
│           │   ├── service/                  # Business logic
│           │   ├── repository/               # JPA Repos
│           │   ├── entity/                   # Entities
│           │   ├── dto/                      # Data Transfer Objects
│           │   └── security/                 # JWT + Security config
│           └── resources/
│               └── application.properties
│
├── frontend/                                 # React + Vite Frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .gitignore
│   ├── .env                                 
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json                   
│   ├── vite.config.ts                        # Vite config
│   └── src/
│       ├── app/                              # App-level routing/layout
│       ├── assets/                           # Images/fonts
│       ├── components/                       # Reusable UI components
│       ├── context/                          # React contexts (Auth etc.)
│       ├── lib/                              # Libraries
│       │   └── axios.ts                      # Axios base instance
│       ├── pages/                            # Login/Register/Dashboard pages
│       ├── services/                         # services
│       ├── types/                            # TS types/interfaces
│       ├── utils/                            # Utility functions
│       ├── App.css
│       ├── index.css
│       └── main.tsx                          # Application entry
│
└── README.md                                 # Root project docs
```


## 🚀 Quick Start (with Docker)

### 🧩 Prerequisites
- Docker & Docker Compose installed  
- Git installed  

### ⚙️ Run Application
```bash
git clone https://github.com/vaishnavi11P/Net-Banking.git
cd Net-Banking
docker-compose up --build
```
This command will:
-Build & run the Spring Boot backend
-Build & run the React frontend
-Start a MySQL container with persistent data storage

