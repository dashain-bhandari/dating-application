import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import User from 'src/users/user.entity';

@Controller('email')
export class EmailController {
    constructor(
        private emailService: EmailService
    ) {
    }
    @Get('')
    async getEmails() {
        return this.emailService.getMails()
    }

    @Post('reminder')
    async sendReminder(@Body() user: User) {
        const options = {
            to: `${user?.email}`,
            subject: 'Subscription Expiry Reminder',
            html: `<p>Your expiry date is near. Please  renew it.Thanks.`,
        }
        const mail = await this.emailService.sendReminderMail(
            options, user
        )
        return mail;
    }

    @Delete(":id")
    async deleteEmail(@Param() id:string){
return await this.emailService.deleteMails(id)
    }
}
