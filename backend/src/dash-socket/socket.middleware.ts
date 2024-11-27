import { JwtService } from '@nestjs/jwt';
import { auth } from 'google-auth-library';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';


export interface AuthSocket extends Socket {
  userId: string;

}
export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void


export const WSAuthMiddleware = (jwtService: JwtService, userService: UsersService): SocketMiddleware => {

  return async (socket: AuthSocket, next) => {
    console.log("hii");
    const cookies = socket.handshake.headers['cookie']?.split('; ');
    const authorization = cookies
      ?.find((cookie) => cookie.startsWith('Authentication'))
      ?.split('=')[1];

    if (authorization) {
      try {
        const jwtPayload = jwtService.verify(authorization);
        console.log(jwtPayload);

        if (jwtPayload) {
          const user = await userService.getById(jwtPayload.userId);
          if (user) {
            socket.userId=jwtPayload.userId
            next();
          }

        } else {
          next({
            name: 'Unauthorized',
            message: 'Unauthorized',
          });
        }
      } catch (error) {
        console.error('JWT verification error:', error.message);
        next({
          name: 'Unauthorized',
          message: 'Unauthorized',
        });
      }
    } else {
      next({
        name: 'Unauthorized',
        message: 'Unauthorized',
      });
    }
  };
};
