const http = require('http');

const express = require ('express');
const socketio = require('socket.io');

const PORT = 3000

const app = express();
const server = http.createServer(app)
const io = socketio.listen(server)

io.on('connection',socket =>{
    console.log("Nuevo usuario coonectado")
});

app.use(express.static('.'));

server.listen(PORT,() =>{
    console.log("server on port "+PORT)
});