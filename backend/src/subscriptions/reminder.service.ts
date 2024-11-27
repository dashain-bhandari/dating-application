import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscriptionService } from './subscriptions.service';

import { EmailService } from 'src/email/email.service';

@Injectable()
export class ReminderService {
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly mailerService: EmailService,
    ) {}

    @Cron(' 0 0 * * *')  // Run every day at midnight
    async handleCron() {
        const subscriptions = await this.subscriptionService.findExpiringSubscriptions();
       console.log(subscriptions);
        for (const subscription of subscriptions) {
            const response=await this.mailerService.sendReminderMail({
                to: `${subscription?.user?.email}`,
                subject: 'Subscription Expiry Reminder',
              html:`<p>Your expiry date is near. Please  renew it.Thanks.`,
              
              
            },subscription.user);
            console.log(response)
            await this.subscriptionService.markReminderSent(subscription.id);
        }
    }

    @Cron(' 0 0 * * *')  // Run every day at midnight
    async updateStatus() {
        const subscriptions = await this.subscriptionService.findExpiredSubscriptions();
       console.log(subscriptions);
        for (const subscription of subscriptions) {
           
            await this.subscriptionService.updateSubscriptions(subscription.id);
        }
    }


    // @Cron('45 * * * * *')
    // async check(){
    //     console.log("scheduler running.")
    // }
}
