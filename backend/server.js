import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ifall en ny routes fil skapas. Addera den här nedanför...

app.use(movieRoutes);

app.listen(3000, () => console.log("Listening to port 3000"));
