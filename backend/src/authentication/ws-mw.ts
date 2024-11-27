import { Socket } from 'socket.io';
import { WsAuthGuard } from './ws-auth.guard';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { JwtService } from '@nestjs/jwt';

export type SocketAuthMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};
export const SocketIOMiddleware = (jwtService:JwtService): SocketAuthMiddleware => {
  return (client: AuthenticatedSocket, next) => {
    try {
      // const jwtPayload = jwtService.verify(
      //   client.handshake.auth.jwt || client.handshake.headers['token'],
      // ) 

      const cookies = client.handshake.headers['cookie'].split('; ');
      // const token: string = authorization.split(' ')[1];
      const authorization = cookies
        .find((cookie) => cookie.startsWith('Authentication'))
        .split('=')[1];
      console.log(authorization);
       //console.log(cookies?.Authentication)
      // console.log(token);
      const jwtPayload = jwtService.verify(authorization);
      if (jwtPayload) {
        client.userId = jwtPayload.user;
       
        next();
      } else {
        next({
          name: 'Unauthorizaed',
          message: 'Unauthorizaed',
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
