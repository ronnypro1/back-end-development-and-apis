import http from "http";
import { readFileSync } from "fs";
import { WebSocketServer, WebSocket } from "ws";

const PORT = 3001;

const server = http.createServer((req, res) => {
  if (req.url === "/script.js") {
    const script = readFileSync("./public/script.js");
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end(script);
    return;
  }
  const html = readFileSync("./public/index.html");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

const wss = new WebSocketServer({ server });

function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on("connection", (socket, req) => {
  const username = new URL(req.url, "http://localhost").searchParams.get(
    "username",
  );
  broadcast({ type: "system", text: `${username} joined` });

  socket.on("message", (data) => {
    const { username, text } = JSON.parse(data);
    broadcast({ type: "chat", username, text });
  });

  socket.on("close", () => {
    broadcast({ type: "system", text: `${username} left` });
  });
});

server.listen(PORT, () => console.log(`Chat server running at http://localhost:${PORT}`));
