import express from "express";
import helmet from "helmet";

import authRoutes from "./routes/auth.js";
import watchlistRoutes from "./routes/watchlist.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
