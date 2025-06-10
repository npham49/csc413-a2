const express = require("express");
const { SerialPort } = require("serialport"); // ✅ Fixed
const { ReadlineParser } = require("@serialport/parser-readline");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

let clients = [];

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

// Replace with your correct serial port path
const port = new SerialPort({ path: "/dev/cu.usbmodem1301", baudRate: 9600 }); // ✅ Fixed
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (line) => {
  console.log(">>", line.trim());
  clients.forEach((res) => res.write(`data: ${line.trim()}\n\n`));
});

app.listen(PORT, () =>
  console.log(`RFID Server running at http://localhost:${PORT}`)
);
