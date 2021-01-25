const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', (client:any) => {
  client.on('event', (data:any) => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);