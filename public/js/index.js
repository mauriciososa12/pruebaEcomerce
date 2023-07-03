const socket = io();

let user = '';
const chatbox = document.getElementById('user_input')
const messagesContainer = document.getElementById('messages_container')


// Sweet Alert

Swal.fire({
  title: "Ingrese su email",
  input: "text",
  inputValidator: (value) => {
    return !value && "Debe ingresar su email";
  },
  icon: "success",
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("auth", user);
});

// capto el evento cuando el usuario hace enter
chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      saveMessage(user, chatbox.value);
      chatbox.value = "";
    }
  }
});


//funcion para leer los mensajes de la base de datos
const loadMessages = (callback) => {
  socket.on("server:messages", callback);
};

//funcion para enviar al servidor el nuevo mensaje
const saveMessage = (user, message) => {
  socket.emit("client:newMessage", {
    user,
    message,
  });
};

const loadNewMessage = (callback) => {
  socket.on("server:newMessage", callback);
};

// funcion que toma un mensaje y lo pinta en el DOM
const oneMessage = (message) => {
  const container = document.createElement("div");

  container.innerHTML = `
    <h3>${message.user}:</h3>
    <p>${message.message}</p>
  `;

  return container;
};







