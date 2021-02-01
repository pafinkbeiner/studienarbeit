import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';

const httpServer = http.createServer();
const io = new SocketIOServer(httpServer);

const PORT = process.env.WS_PORT || 7000;

httpServer.listen(PORT, () => {
    console.log(`HTTP server listening on http://localhost:${PORT}`);
});

export default io;