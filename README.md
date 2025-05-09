# Bio-System

Ett fullstack-webbapplikation för biografhantering.

## 🚀 Funktioner

- Hantering av filmer och visningar
- Användarhantering
- Bokningssystem

## 🛠️ Teknisk Stack

### Frontend

- React
- Vite
- Moderna UI-komponenter

### Backend

- Node.js
- Express
- Sqlite

## 📋 Förutsättningar

- Node.js (version 18 eller högre)
- npm (kommer med Node.js)
- Git

## 🚀 Installation och Start

### Backend

1. Navigera till backend-mappen:

```bash
cd backend
```

2. Installera beroenden:

```bash
npm install
```

3. Starta servern:

```bash
nodemon server.js
```

### Frontend

1. Navigera till frontend-mappen:

```bash
cd frontend
```

2. Installera beroenden:

```bash
npm install
```

3. Starta utvecklingsservern:

```bash
npm run dev
```

## 🔧 Miljövariabler

### Frontend

Skapa en `.env` fil i frontend-mappen med följande variabler:

```
VITE_API_URL=http://localhost:5000
```

## 📁 Projektstruktur

```
bio-system/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/
    └── server.js
```
