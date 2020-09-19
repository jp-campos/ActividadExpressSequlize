const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>[${item.author}:${item.ts}] ${item.message}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const nombre = document.getElementById("nombre");

  objM = {
    'message': message.value,
    'author': nombre.value
  }

  ws.send(JSON.stringify(objM));
  message.value = "";
  nombre.value = ""
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);