// TODO:
// [X] Broadcast a message to connected users when someone connects or disconnects
// [X] Add support for nicknames
// [ ] Add “{user} is typing” functionality
// [ ] Show who’s online
// [ ] Add private messaging
// [ ] Share your improvements!

module.exports = function(http) {
	var io = require('socket.io')(http)

	io.on('connection', function(socket) {
		socket.userData = {}

		console.log('%s connected :)', socket.id)

		socket.on('nickname', function(nick) {
			console.log('%s set nick to %s', socket.id, nick)
			socket.userData.nick = nick

			io.emit('user joined', socket.userData.nick || socket.id)
		})

		socket.on('message', function(msg) {
			console.log('message from %s: %s', socket.id, msg)
			io.emit('message', { msg: msg, id: socket.userData.nick || socket.id })
		})

		socket.on('disconnect', function() {
			console.log('%s disconnected :(', socket.id)
			io.emit('user disconnected', socket.userData.nick || socket.id)
		})
	})

	return io;
}
