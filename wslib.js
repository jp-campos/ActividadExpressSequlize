const WebSocket = require("ws");
const Message = require('./persistencia/messages-sql')

const clients = [];
const messages = [];


const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      obj = JSON.parse(message)
      obj['ts'] = Date.now()
      
      Message.create({author:obj.author, message:obj.message, ts:obj.ts})
      //messages.push(obj);
      
      sendMessages();
    });
  });

  const sendMessage = (msg) =>{
    //messages.push(msg)
    Message.create({author:msg.author, message:msg.message, ts:msg.ts})
    sendMessages()
  }

  const sendMessages = () => {
    Message.findAll().then((result)=>{
      clients.forEach((client) => client.send(JSON.stringify(result)));  
    })

  };

  return sendMessage
};

exports.wsConnection = wsConnection;