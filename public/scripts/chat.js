// TODO:
// [X] Escape HTML in messages

var socket = io()

// Send nickname
socket.emit('nickname', prompt('Enter a nickname'))

// Message submission handler
$('form').submit(function() {
	socket.emit('message', $('#m').val());
	$('#m').val('');

	return false;
});

// Events

socket.on('user joined', function(id) {
	id = escapeHtml(id)

	$('#messages').append('<li><b>' + id + '</b> joined!')
})

socket.on('user disconnected', function(id) {
	id = escapeHtml(id)

	$('#messages').append('<li><b>' + id + '</b> left.')
})

socket.on('message', function(pkt) {
	pkt.id = escapeHtml(pkt.id)
	pkt.msg = escapeHtml(pkt.msg)

	$('#messages').append('<li><b>' + pkt.id + '</b>: ' + pkt.msg + '</li>')
})
