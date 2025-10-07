import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@Injectable()
@WebSocketGateway({ namespace: "/projects", cors: { origin: true, credentials: true } })
export class ProjectsGateway {
  @WebSocketServer() server!: Server;

  @SubscribeMessage("watch")
  watch(@MessageBody() projectId: string, @ConnectedSocket() socket: Socket) {
    // NEXORA: TODO authenticate socket (verify JWT + tenant membership) before joining
    socket.join(`project:${projectId}`);
    return { ok: true };
  }

  emitProgress(projectId: string, payload: { step: string; status: string }) {
    this.server?.to(`project:${projectId}`).emit("progress", payload);
  }
}
