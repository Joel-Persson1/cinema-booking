import express from "express";
import cors from "cors";
import session from "express-session";
import SQLiteStoreFactory from "better-sqlite3-session-store";
import db from "./utilities/database.js";

import movieRoutes from "./routes/movieRoutes.js";
import { authRouter } from "./routes/authRouter.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const SQLiteStore = SQLiteStoreFactory(session);

app.use(express.json());

app.use(
  session({
    secret: "SebbeÄlskarAttSparkaSparkcykel",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
    store: new SQLiteStore({ client: db }),
  })
);

// Ifall en ny routes fil skapas. Addera den här nedanför...

app.use(movieRoutes);

app.use("/auth", authRouter);

app.listen(3000, () => console.log("Listening to port 3000"));
