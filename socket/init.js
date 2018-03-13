var socketio = require('socket.io');

module.exports = function(server) {
	var io = socketio(server);
	io.on('connection', function(socket){
		console.log('A user connected');
		socket.on('disconnect', function(socket){
			console.log('A user disconnected');
		});
		socket.on('add', function(data){
			console.log(data);
			if (global.names.indexOf(data) === -1) {
				io.emit('new', data);
				global.names.push(data);
			}
		});
		socket.on('del', function(i){
			global.names.splice(i, 1);
			io.emit('del', i);
		});
	});

}