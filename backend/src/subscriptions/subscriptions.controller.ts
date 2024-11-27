import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';

import { SubscriptionService } from './subscriptions.service';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { number } from 'joi';


@Controller('subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Post()
    async createSubscriptions(
        @Body() input:any,
    ) {

        return await this.subscriptionService.createSubscription(input.userId, input.duration);
    }

    @Get()
    async findExpiringSubscriptions(

    ) {
        return await this.subscriptionService.findExpiringSubscriptions();
    }

    @Get("all")
    async findAllSubscriptions(

    ) {
        return await this.subscriptionService.findAllSubscriptions();
    }


    @Put(':subscriptionId')
    async updateReminder(
        @Param('subscriptionId') subscriptionId: string
    ) {
        return await this.subscriptionService.markReminderSent(subscriptionId);
    }


    @Get('user/:userId')
    async getSubscription(
        @Param('userId') userId: string
    ) {
        return await this.subscriptionService.getSubscription(userId);
    }

}
