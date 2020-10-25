var app = require('./config/server');
var socketio = require('socket.io');

var server = app.listen(3000, function () {
                console.log("servidor online");
            });

var io = socketio.listen(server);

app.set('io', io);

io.on('connection', function (socket) {
    console.log('Usuário conectou');

    socket.on('disconnect', function () {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function (data) {
        socket.emit('msgParaCliente', { apelido : data.apelido, mensagem : data.mensagem } );
        socket.broadcast.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem});

        if (parseInt(data.apelidoAtualizadoNosClientes) == 0) {
            socket.emit('ParticipantesParaCliente', { apelido : data.apelido } );
            socket.broadcast.emit('ParticipantesParaCliente', { apelido : data.apelido } );            
        } 
    });

});