```
NET-BANKING/
├── backend/ # Spring Boot Backend
│ ├── src/main/java/com/netbanking/
│ │ ├── controller/ # REST API Controllers
│ │ ├── service/ # Business Logic
│ │ ├── repository/ # JPA Repositories
│ │ ├── entity/ # Entity Classes
│ │ └── security/ # JWT + Security Config
│ ├── src/main/resources/
│ │ └── application.properties
│ ├── pom.xml # Maven Build File
│ └── Dockerfile # Backend Docker Image Setup
│
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable UI Components
│ │ ├── pages/ # Pages (Login, Register, Dashboard)
│ │ ├── services/ # API Calls (Axios)
│ │ └── lib/axios.ts # Axios Config File
│ ├── vite.config.ts # Vite Config File
│ ├── package.json # Dependencies
│ └── Dockerfile # Frontend Docker Image Setup
│
├── docker-compose.yml # Runs Frontend, Backend & MySQL together
└── README.md # This File
```
