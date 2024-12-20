import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import RegisterDto from './dto/Register.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import JwtRefreshGuard from './jwt-refresh.guard';
import { UsersService } from 'src/users/users.service';
import CreateAdminDto from './dto/requestCreateAdmin.dto';
import { ReturnCreateAdminDto } from './dto/returnCreateAdmin.dto';
import { AdminService } from 'src/admin/admin.service';
import { ApiBody, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import LoginDto from './dto/login.dto';
import { ResendEmailDto } from './dto/resendEmail.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { SessionManagerService } from 'src/session-manager/session-manager.service';
import { Session } from 'inspector';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Socket } from 'socket.io';
import GoogleDto from './dto/google.dto';
import { use } from 'passport';
@ApiTags('Authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
// @SerializeOptions({
//   strategy: 'excludeAll',
// })
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly sessionManagerService: SessionManagerService,
  ) {}

  @Post('/register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: RegisterDto })
  async register(
    @Body() registrationData: RegisterDto,
    @Req() request: Request,
  ) {
    const newUser = await this.authenticationService.register(registrationData);
    await this.authenticationService.sendVerificaitonEmail(
      newUser.id,
      newUser.email,
    );
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      newUser.id,
    );
    const { cookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(newUser.id);

    await this.usersService.setCurrentRefreshToken(token, newUser.id);
    console.log(token);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    console.log(newUser, 'jjjjjjjjjjjjjjjjjj');
    return newUser;
  }


  @Post('/admin')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: RegisterDto })
  async registerSuperAdmin(
    @Body() registrationData: any,
    @Req() request: Request,
  ) {
    const newUser = await this.authenticationService.adminRegister({...registrationData,emailVerified:true,role:"super-admin"});
   
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      newUser.id,
    );
    const { cookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(newUser.id);

    await this.usersService.setCurrentRefreshToken(token, newUser.id);
    console.log(token);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    console.log(newUser, 'jjjjjjjjjjjjjjjjjj');
    return newUser;
  }



  @Post('/google/login')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: GoogleDto })
  async googleRegister(
    @Body() registrationData: GoogleDto,
    @Req() request: Request,
  ) {
    
    const newUser = await this.authenticationService.googleRegister(registrationData);
   console.log(newUser);
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      newUser.id,
    );
    const { cookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(newUser.id);

    await this.usersService.setCurrentRefreshToken(token, newUser.id);
    console.log(token);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    console.log(newUser, 'jjjjjjjjjjjjjjjjjj');
    return newUser;
  }


  @Post('/register-admin')
  @ApiBody({ type: CreateAdminDto })
  async registerAdmin(
    @Body() adminDetail: CreateAdminDto,
    @Req() request: Request,
  ) {
    const adminresult = await this.authenticationService.registerAdmin(
      adminDetail,
    );
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      adminresult.id,
    );

    const { cookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(adminresult.id);

    await this.adminService.setCurrentRefreshToken(token, adminresult.id);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return adminresult;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  @ApiBody({ type: LoginDto })
  async login(@Req() request: RequestWithUser) {
    let socket: AuthenticatedSocket;
    const { user } = request;
    console.log(user)
    console.log("hiii")
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
    );

    const { cookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(token, user.id);
    const newUser = await this.usersService.getById(user.id);
    console.log(accessTokenCookie, cookie);
    //   const user2: AuthenticatedSocket = {
    // ...socket,
    //   userId:user.id,
    //   };

    //setting userId property on socket of type auth
    //socket.userId = user.id;
    //this.sessionManagerService.setUserSocket(user.id, socket);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return newUser;
  }

  @Get('email/verify/:resetToken')
  // @UseGuards(JwtAuthenticationGuard)
  async emailVerification(
    @Param('resetToken') resetToken: string,
    @Query('userId') userId: string,
    @Req() request: Request,
  ) {
    console.log(resetToken, userId);
    const verifiedUser = await this.authenticationService.verifyEmail(
      userId,
      resetToken,
    );
    const accessTokenCookie =
      await this.authenticationService.getCookieWithJwtToken(verifiedUser.id);

    const { cookie, token } =
      await this.authenticationService.getCookieWithJwtRefreshToken(
        verifiedUser.id,
      );

    await this.usersService.setCurrentRefreshToken(token, verifiedUser.id);
    const newUser = await this.usersService.getById(verifiedUser.id);
    console.log(accessTokenCookie, cookie);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return newUser;
  }

  @Put('resend/email')
  @UseGuards(JwtAuthenticationGuard)
  async resendEmail(
    @Req() request: RequestWithUser,
    @Body() resendEmail: ResendEmailDto,
  ) {
    console.log('resend email apit hit');
    await this.authenticationService.resendVerificationEmail(
      request.user.id,
      resendEmail.email,
    );
  }

  // @Post('forget/password')
  // async forgetPassword(@Body() values: ResendEmailDto) {
  //   return await this.usersService.forgetPassword(values.email);
  // }

  // @Put('reset/password/:token')
  // async resetPassword(
  //   @Body() values: ResetPasswordDto,
  //   @Param('token') token: string,
  // ) {
  //   return await this.usersService.resetPassword(values, token);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @ApiCookieAuth()
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
    
  }

  @Post('log-out-after-delete')
  async logOutAfterDelete(@Req() request: Request) {
    request.res.setHeader(
      'Set-cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    console.log(user)
    // const newUser = await this.usersService.getOnlyUser(user.id);
    // newUser.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
