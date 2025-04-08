# Teaterbokningssystem

Detta är ett teaterbokningssystem med en React-frontend och Node.js-backend.

## Förutsättningar

- Node.js (version 18 eller senare)
- npm (kommer med Node.js)

## Installation

1. Klona projektet:
```bash
git clone [projekt-url]
cd [projekt-mapp]
```

2. Installera backend-beroenden:
```bash
cd backend
npm install
```

3. Installera frontend-beroenden:
```bash
cd frontend
npm install
```

## Starta projektet

### Starta backend-servern

1. Öppna en terminal och navigera till backend-mappen:
```bash
cd backend
npm start
```

Backend-servern kommer att starta på `http://localhost:3000`

### Starta frontend-servern

1. Öppna en ny terminal och navigera till frontend-mappen:
```bash
cd frontend 
npm run dev
```

Frontend-servern kommer att starta på `http://localhost:5173` (eller en annan port om 5173 är upptagen)

## Utveckling med Nodemon

För att underlätta utvecklingen av backend-servern kan du använda nodemon, som automatiskt startar om servern när du gör ändringar i koden.

1. Installera nodemon globalt (om du inte redan har det):
```bash
npm install -g nodemon
```

2. Starta backend-servern med nodemon:
```bash
cd backend
nodemon server.js
```

Nu kommer servern automatiskt att starta om när du sparar ändringar i backend-filerna.

## Användning

1. Öppna din webbläsare och gå till `http://localhost:5173` (eller den port som visas i terminalen)
2. Backend-API:et är tillgängligt på `http://localhost:3000`

## Stoppa servrarna

För att stoppa servrarna:
1. Tryck `Ctrl+C` i respektive terminalfönster
2. Alternativt kan du använda följande kommando för att hitta och avsluta processerna:
```bash
lsof -i :3000,5173 | grep LISTEN
```

## Felsökning

Om du stöter på problem med portar som redan används:
1. Kontrollera att inga andra processer använder portarna
2. Frontend-servern kommer automatiskt att välja en annan port om 5173 är upptagen
3. Om backend-porten (3000) är upptagen, ändra porten i `backend/server.js` 
