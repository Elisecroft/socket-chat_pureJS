document.addEventListener('DOMContentLoaded', () => { 
  // make connection
  const socket = io.connect('http://localhost:3000');
  
  // buttons and inputs
	const message = document.getElementById('message');
	const username = document.getElementById('username');
	const send_message = document.getElementById('send_message');
	const send_username = document.getElementById('send_username');
	const chatroom = document.getElementById('chatroom');
	const feedback = document.getElementById('feedback');
  
  //Emit a username
	send_username.addEventListener('click', () => {
    socket.emit('change_username', {username : username.value});
  });
  
  //Emit message
	send_message.addEventListener('click', () => {
		socket.emit('new_message', {message : message.value});
  });
  
  //Listen on new_message
	socket.on("new_message", (data) => {
		feedback.textContent = '';
    message.value = '';
    let p = document.createElement('p');
    p.className = 'message';
    p.innerHTML  = `${data.username} : ${data.message}`;
    chatroom.appendChild(p);
  });
  
  //Emit typing
	message.addEventListener('keypress', () => {
		socket.emit('typing')
	});

	//Listen on typing
	socket.on('typing', (data) => {
    let p = document.createElement('p');
    let i = document.createElement('i');
    i.innerHTML = `${data.username} is typing a message...`;
    p.appendChild(i);
		feedback.innerHTML = p.innerHTML;
	});

}, false);
