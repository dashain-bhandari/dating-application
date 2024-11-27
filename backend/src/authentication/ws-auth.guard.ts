import {
  CanActivate,
  ExecutionContext,
  Logger,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  logger = new Logger('WsAuthGuard');

  canActivate(context: ExecutionContext) {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    WsAuthGuard.validateToken(client);
    // this.getRequest(context);
    return true;
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }

  static validateToken(client: Socket) {
    const cookie:any = client.handshake.headers['token'];
  console.log(cookie)
    // const token: string = authorization.split(' ')[1];
    
    // console.log(authorization);
    // console.log(cookies?.Authentication)
    // console.log(token);
    const payload = verify(cookie, 'kdieeldooejelsiejffoorloo');
    console.log(payload)
    return payload;
  }
}
