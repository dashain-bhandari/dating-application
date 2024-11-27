import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('connection')
// @UseGuards(JwtAuthenticationGuard)
@ApiTags('connection')
export class ConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly event: EventEmitter2,
  ) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getConnections(@Req() request: RequestWithUser) {
    return await this.connectionService.getConnections(request.user.id);
  }

  @Get("connection/:id")
  // @UseGuards(JwtAuthenticationGuard)
  async getConnectionFromId(@Param() id:any) {
    return await this.connectionService.getConnection(id.id);
  }

//for dashboard get all conncections route
  @Get('allConnections')
  async getAllConnections() {
    return await this.connectionService.getAllConnections();
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  async checkConnections(@Req() request: RequestWithUser,@Param('id') recepient:string) {
    return await this.connectionService.isConnection(request.user.id,recepient);
  }


  @Delete('deleteAdmin/:id')
  // @UseGuards(JwtAuthenticationGuard)
  async deleteConnectionAdmin(
   
    @Param('id') id: string,
  ) {
  
    const connection = await this.connectionService.deleteConnectionAdmin(id);
   
    return connection;
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthenticationGuard)
  async deleteConnection(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ) {
    const {
      user: { id: userId },
    } = request;
    const connection = await this.connectionService.deleteConnection({
      id,
      userId,
    });
    this.event.emit('connection.removed', { connection, userId });
    return connection;
  }


}




