import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interfaces';

export interface IGatewaySessionManager {
  getUserSocket(id: string): AuthenticatedSocket;
  setUserSocket(id: string, socket: AuthenticatedSocket): void;
  removeUserSocket(id: string): void;
  getSockets(): Map<string, AuthenticatedSocket>;
}

@Injectable()
export class SessionManagerService {
  readonly sessions: Map<string, AuthenticatedSocket> = new Map();

  getUserSocket(id: string) {
    console.log(id);
    console.log(this.sessions);
    console.log(this.sessions.get(id));
    return this.sessions.get(id);
  }

  setUserSocket(id: string, socket: AuthenticatedSocket): void {
    console.log(id);
    console.log(socket);
    this.sessions.set(id, socket);
  }

  removeUserSocket(userId: string) {
    this.sessions.delete(userId);
  }

  getSockets(): Map<string, AuthenticatedSocket> {
    return this.sessions;
  }
}
