import express from "express";
import { main } from "./database.js";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//? DB CONNECTION
main().catch((err) => console.log("DB Error:", err));

app.use(cors());
app.use(express.json());


app.use("/api/profiles", profileRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});