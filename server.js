const express = require('express'),
    port = 8000,
    app = express(),
    cors = require('cors'),
    server = app.listen(port,() => console.log(`Listening on port ${port}`)),
    io = require('socket.io')(server);


app.use(cors());


const chats = [];


io.on('connection', socket => {
    console.log(socket.id);

    socket.broadcast.emit("joined","another client joined the chat");

    //emit sends data only to the client that sent the event
    socket.emit("Welcome", {msg:"Hello from the server"});

    socket.on("addToChat",data => {
        socket.emit("sent","You send a message");
        chats.push(data);

        // sends to all clients
        io.emit("updatingMessages",chats);
    })
})