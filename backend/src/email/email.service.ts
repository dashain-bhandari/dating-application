import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Email } from './emai.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;
  constructor(readonly configService: ConfigService,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>) {
    this.nodemailerTransport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ourlifepartner@gmail.com",
        pass: "ahwv rzwo arkr upmf",
      },
    })
  }


  async sendReminderMail(options: Mail.Options, user: any) {
    try {
      let email = new Email();
      email.subject = options.subject;
      email.receiver = user;
      const emails = await this.emailRepository.save(email);
      console.log(emails)
      return this.nodemailerTransport.sendMail(options);
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async sendMail(options: Mail.Options) {

    try {
      return this.nodemailerTransport.sendMail(options);

    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async getMails() {
    try {
      const mails = await this.emailRepository.find({ relations: ["receiver", "receiver.profile"] ,order:{createdAt:"DESC"}});
      console.log(mails)
      return mails;
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  async deleteMails(id: string) {
    try {
     const mail=await this.emailRepository.delete(id)
     console.log(mail)
     return mail;
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
