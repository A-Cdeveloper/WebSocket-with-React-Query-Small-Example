import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const dataPath = path.join(__dirname, "data.json");
const people = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

app.get("/api/people", (req, res) => {
  const sortedPeople = people.sort((a, b) => b.id - a.id);
  res.json(sortedPeople);
});

app.post("/api/people", (req, res) => {
  const newPerson = { id: people.length + 1, ...req.body };
  people.push(newPerson);
  fs.writeFileSync(dataPath, JSON.stringify(people, null, 2), "utf-8");
  res.json(newPerson);

  const message = JSON.stringify({
    type: "new-person",
    key: "people",
    payload: newPerson,
  });
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const index = people.findIndex((person) => person.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Person not found" });
  }
  people.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(people, null, 2), "utf-8");
  res.json({ message: "Person deleted" });
  const message = JSON.stringify({
    type: "person-deleted",
    key: "people",
    payload: { id: parseInt(id) },
  });
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
});

const server = app.listen(4002, () => {
  console.log("Server running on http://localhost:4002");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  console.log("Client connected");
});
