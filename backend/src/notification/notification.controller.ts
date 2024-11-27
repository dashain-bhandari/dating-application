import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async markNotificationAsRead(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.notificationService.markAsRead(request.user.id, id);
  }

  @Get('count/:id')
  @UseGuards(JwtAuthenticationGuard)
  async countUnreadNotification(
    @Req() request: RequestWithUser,
    @Param('id') id?: string,
  ) {
    console.log('ok nice', id);
    return await this.notificationService.countTopUnreadNotification(
      request.user.id,
      id,
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getNotifications(
    @Req() request: RequestWithUser,
    @Query('page') page = 1,
    @Query('limit') limit = 30,
  ) {
    return await this.notificationService.getNotificationOfUser(
      request.user.id,
      page,
      limit,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteNotification(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ) {
    console.log(id);
    return await this.notificationService.delete(request.user.id, id);
  }
}
