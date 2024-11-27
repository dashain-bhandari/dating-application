import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/Register.dto';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import CreateAdminDto from './dto/requestCreateAdmin.dto';
import { AdminService } from 'src/admin/admin.service';
import { randomBytes } from 'crypto';
import { EmailScheduleService } from 'src/email-schedule/email-schedule.service';
import { EmailVerification } from 'src/email-verification/email-verification.entity';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { PostgresErrorCode } from 'pg';
import { SessionManagerService } from 'src/session-manager/session-manager.service';
import GoogleDto from './dto/google.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly emailScheduleService: EmailScheduleService,
    private readonly sessionManagerService: SessionManagerService,
  ) { }

  // Method to register data
  public async register(registrationData: RegisterDto) {
    const hashedPassword = await this.hashPassword(registrationData.password);
    try {
      const user = await this.usersService.getByEmail(registrationData.email)
      console.log(user);
      if (user) {
        console.log(user);
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const createdUser = await this.usersService.create({
          ...registrationData,
          password: hashedPassword,
        });
        console.log(createdUser)
        return createdUser;
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async adminRegister(registrationData: any) {
    const hashedPassword = await this.hashPassword(registrationData.password);
    const user = await this.usersService.getByEmail("ourlifepartner@gmail.com");
    if (user) {
      await this.verifyPassword(registrationData.password, user.password);
      return user;
    }

    else {
      try {
        const createdUser = await this.usersService.create({
          ...registrationData, password: hashedPassword, email: "ourlifepartner@gmail.com"
        });
        console.log(createdUser)
        return createdUser;
      } catch (error) {
        console.log(error.message)
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }


  public async googleRegister(registrationData: GoogleDto) {
    console.log(registrationData)
    const user = await this.usersService.findOneByUserName(registrationData.email);
    console.log(user);

    if (user) {
      if (user.suspended) {
        throw new HttpException(
          "This account has been suspended. Contact admin for more information.",
          HttpStatus.BAD_REQUEST,
        );
      }
      else {
        return user;
      }
    }

    else {
      try {
        const createdUser = await this.usersService.create({
          ...registrationData, password: null
        });
        console.log(createdUser)
        return createdUser;
      } catch (error) {
        console.log(error.message)
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }


  }


  public async hashPassword(newPassword: string) {
    return await bcrypt.hash(newPassword, 10);
  }

  public async generateVerificationToken(length: number) {
    console.log(length);
    return randomBytes(length).toString('hex');
  }

  public async sendVerificaitonEmail(userId: string, email: string) {
    console.log(userId, email);
    const verificationToken = await this.generateVerificationToken(24);
    const client_url = this.configService.get('CLIENT_URL');
    console.log(client_url)
    await this.emailVerificationService.create(userId, verificationToken);
    const recipient = email;
    const subject = `Verify Email`;
    const html = `
    <h1>Verify your email address</h1>
    <p style="font-size: 16px; font-weight: 400">Thank you for signing up! Please verify your email address by clicking the link below: </p>
    <br />
    <a style = "font-size: 14px;" href=${client_url}/email/verify/${verificationToken}?userId=${userId}> Click here to verify your email </a>

    <p style="font-size: 14px; font-weight: 500; color: red;">Ignore this if you don't ask for it</p>
    <p>Best regards</p>
    <p>Ourlifepartner</p>
`;

    this.emailScheduleService.scheduleEmail({
      recipient,
      subject,
      html,
      date: new Date(Date.now() + 1000 * 10),
    });
  }
  // Method to register admin
  public async registerAdmin(adminDetail: CreateAdminDto) {
    if (adminDetail.password !== adminDetail.confirmPassword) {
      throw new HttpException(
        'password and confirmPassword must match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await this.hashPassword(adminDetail.password);

    try {
      const createdAdmin = await this.adminService.createAdmin({
        ...adminDetail,
        password: hashedPassword,
      });

      createdAdmin.password = undefined;
      return createdAdmin;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('Invalid Admin', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      console.log("hiii")
      const user = await this.usersService.getByEmail(email);
      //console.log(user)
      if (user?.suspended) {
        throw new HttpException("This account has been suspended. Contact admin for more information.", 401);
      }
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      console.log("hiii")
      console.log(error.message)
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      // expiresIn: `${this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')}d`,
      expiresIn: `1d`,
    });
    var date: any;
    date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));

    // return `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
    //   'ACCESS_TOKEN_EXPIRATION_TIME',
    // )}d;HttpOnly;Secure=true;SameSite=None`;

    return `Authentication=${token}; Path=/; Max-Age=86400;HttpOnly;Secure=true;SameSite=None`;


    // return `Authentication=${token}; Path=/; Max-Age=${+date.toUTCString()};HttpOnly;Secure=false;SameSite=None`;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      // expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME')}d`,
      expiresIn: `30d`,
    });

    const cookie = `Refresh=${token}; Path=/;  Max-Age=${this.configService.get(
      'REFRESH_TOKEN_EXPIRATION_TIME',
    )}d`;
    return { cookie, token };
  }

  public getCookiesForLogOut() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async verifyPasswordforChange(
    oldPassword: string,
    hashedPassword: string,
  ) {
    await this.verifyPassword(oldPassword, hashedPassword);
  }

  public async resendVerificationEmail(userId: string, email: string) {
    const emailVerification = await this.emailVerificationService.getByUserId(
      userId,
    );
    if (emailVerification) {
      await this.emailVerificationService.deleteEmailVerification(
        emailVerification.id,
      );
    }

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('Invalid Email', HttpStatus.NOT_FOUND);
    } else if (user && userId !== user.id) {
      throw new HttpException('Invalid Email', HttpStatus.NOT_FOUND);
    } else if (user && user.emailVerified) {
      throw new HttpException('Email already verified', HttpStatus.NOT_FOUND);
    }
    await this.sendVerificaitonEmail(userId, email);
  }

  public async verifyEmail(userId: string, resetToken: string) {
    console.log('we reached to ');
    const emailVerification = await this.emailVerificationService.getByToken(
      resetToken,
    );
    if (!emailVerification) {
      console.log(emailVerification);
      throw new HttpException('Invalid link', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.emailVerify(userId);
    await this.emailVerificationService.deleteEmailVerification(
      emailVerification.id,
    );
    console.log('email');
    return user;
  }
}
