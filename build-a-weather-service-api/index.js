import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import weatherRouter from './weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
  });
});

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/docs', (req, res) => {
  res.redirect('/api/info');
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!`, name });
});

app.route('/api/data')
  .get((req, res) => {
    res.json({ data: [] });
  })
  .post((req, res) => {
    res.status(201).json({ message: 'Data created' });
  });

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
