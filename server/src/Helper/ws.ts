import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import { Subject } from 'rxjs';

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer);

const machines: string[] = [];
const subject = new Subject<{ name: string, color: { red: number, green: number, blue: number }}>();

const PORT = process.env.PORT || 3000;

io.on('connection', (socket: Socket) => {

    socket.emit('set machines', machines);
    
    socket.on('color change', colorInfo => {
        subject.next(colorInfo);
        socket.broadcast.emit('color change', colorInfo);
    });

});

httpServer.listen(PORT, () => {
    console.log(`HTTP server listening on http://localhost:${PORT}`);
});