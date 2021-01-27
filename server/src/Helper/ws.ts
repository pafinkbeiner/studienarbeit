import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import { Subject } from 'rxjs';

const httpServer = http.createServer();
const io = new SocketIOServer(httpServer);

const PORT = process.env.PORT || 7000;

httpServer.listen(PORT, () => {
    console.log(`HTTP server listening on http://localhost:${PORT}`);
});

export default io;