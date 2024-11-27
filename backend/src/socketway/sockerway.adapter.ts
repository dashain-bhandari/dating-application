import cookieParser from 'cookie-parser';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class SocketwayAdapter extends IoAdapter {
  
    constructor(
      private app: INestApplicationContext,
      // private configService: ConfigService
  ) {
      super(app)
  }
  createIOServer(port: number, options?: any) {
    const server :Server= super.createIOServer(port, options);
    server.use(async (socket: any, next) => {
      console.log(`Inside socket connection:${socket.id}`);

      //   const cookief = socket.handshake.headers.cookie;
      //   if (!cookief) {
      //     console.log('client has no cookies');
      //     return next(new Error('Not Authenticated, No cookie are sent.'));
      //   }
      //   const { Authentication } = cookie.parse(cookief);
      //   if (!Authentication) {
      //     console.log('Authentication cookie does not exist');
      //     return next(new Error('Not Authenticted'));
      //   }
      //   const user = await this.jwtService.verify(Authentication, {
      //     secret: 'kdieeldooejelsiejffoorloo',
      //   });
      //   console.log(user);
      //   if(!user) {
      //     return next(new Error(''))
      //   }
    });
    return server;
  }
}
