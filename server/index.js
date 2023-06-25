const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
var path = require("path");
var players = [];
var numerosCantados = [];

const app = express();
app.use("/", express.static(path.join(__dirname, "../app")));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("se conecto el cliente " + socket.id);

  socket.on("newNumber", function (numeroCantado) {
    socket.broadcast.emit("newNumberFromBingoCaller", numeroCantado);
    numerosCantados.push(numeroCantado);
  });
  socket.on("joinGame", function (nombre) {
    console.log("se conecto " + nombre);
    players.push({
      name: nombre,
      id: socket.id,
    });
  });
  socket.on("newCarton", function (data) {
    console.log(data);
    let player = players.find(function (_player) {
      return _player.name == data.name;
    });
    if (player) {
      player.carton = data.carton;
    }
  });
  socket.on("bingo", function () {
    let player = players.find(function (_player) {
      return _player.id == socket.id;
    });
    if (player) {
      for (let i = 0; player.carton.length > i; i++) {
        if (!numerosCantados.includes(player.carton[i])) {
          socket.broadcast.emit("mentiroso", player.name);
          break;
        }
      }
    }
  });
});

app.get("/api/players", function (req, res) {
  res.json(players);
});

httpServer.listen(process.env.PORT || 3030, function () {
  console.log("lalala");
});
