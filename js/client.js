const socket=io('http://localhost:8000');

const form = document.getElementById('send-container');
const messInput = document.getElementById('msgInput');
const messageContainer = document.querySelector(".container");


const append = (message , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
}
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('new-user-joined' , data=> {
    append(`${name} joined the chat`, 'right');
})

socket.on('recieve', data => {
    append(`${data.name}:${data.message}`,'left')
});

// If user leaves chat send update to container
socket.on('leave', data => {
    append(`${data.name} left the chat`,'right')
});

// If form gets submitted send it to sever 
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messInput.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message)
    messInput.value = ''
})