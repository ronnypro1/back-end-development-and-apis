import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api{/:date}", (req, res) => {
  const { date } = req.params;

  let parsed;
  if (!date) {
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    parsed = new Date(Number(date));
  } else {
    parsed = new Date(date);
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});