import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { skip } from 'rxjs';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { ConnectionRequestsService } from 'src/connection-requests/connection-requests.service';
import { ConnectionService } from 'src/connection/connection.service';
import { UsersService } from 'src/users/users.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(
    private readonly usersService: UsersService,
    private readonly connectionRequestService: ConnectionRequestsService,
    private readonly connectionService: ConnectionService,
  ) {}

  @Delete('delete')
  @UseGuards(JwtAuthenticationGuard)
  async deleteUser(@Req() request: RequestWithUser) {
    await this.connectionService.deleteConnectionOfUser(request.user.id);
    await this.connectionRequestService.deleteAllUsersConnectionRequest(
      request.user.id,
    );
    return await this.usersService.deleteUser(request.user.id);
  }
  @Get('filter')
  @UseGuards(JwtAuthenticationGuard)
  async filterUser(
    @Req() request: RequestWithUser,
    @Query('minHeight') minHeight?: string,
    @Query('maxHeight') maxHeight?: string,
    @Query('minAge') minAge?: string,
    @Query('maxAge') maxAge?: string,
    @Query('marital_status') marital_status?: string,
    @Query('religion') religion?: string,
    @Query('gender') gender?: string,
    @Query('caste') caste?: string,
    @Query('sector') sector?: string,
    @Query('annualIncome') annualIncome?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    console.log('we are here');
    console.log("sector",sector)
    console.log(marital_status)
    const result = await this.usersService.filterUser({
      minHeight,
      maxHeight,
      minAge,
      maxAge,
      marital_status,
      religion,
      caste,
      annualIncome,
      page,
      gender,
      sector,
      limit,
    });

    return Promise.all(
      result.map(async (user) => {
        return {
          id: user.id,
          fullname: user.profile.fullname,
          year: user.profile.year,
          month: user.profile.month,
          day: user.profile.day,
          address: user.profile.address,
          caste: user.profile.caste,
          religion: user.profile.religion,
          avatarId: user.avatarId,
          occupation: user.education.occupation,
          isConnected: (await this.connectionService.isConnection(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
          isPending: (await this.connectionRequestService.isPending(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
        };
      }),
    );
  }

  @Get('letsBegin')
  @UseGuards(JwtAuthenticationGuard)
  async searchFromHome(
    @Req() request: RequestWithUser,
    @Query('searching_for') searchingFor: string,
    @Query('ageFrom') ageFrom: string,
    @Query('ageTo') ageTo: string,
    @Query('caste') caste: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    console.log('we are herre');
    const result = await this.usersService.letsBegin({
      searchingFor,
      ageFrom,
      ageTo,
      caste,
      user:request.user,
      page,
      limit,
    }

    );
console.log(result)
    return Promise.all(
      result.map(async (user) => {
        return {
          id: user.id,
          fullname: user.profile.fullname,
          year: user.profile.year,
          month: user.profile.month,
          day: user.profile.day,
          address: user.profile.address,
          caste: user.profile.caste,
          height: user.profile.height,
          religion: user.profile.religion,
          avatarId: user.avatarId,
          occupation: user.education.occupation,
          isConnected: (await this.connectionService.isConnection(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
          isPending: (await this.connectionRequestService.isPending(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
        };
      }),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async getUserById(@Req() request: RequestWithUser, @Param('id') id: string) {
    const user = await this.usersService.getById(id);
    return {
      ...user,
      currentHashedRefreshToken: null,
      password: null,
      isGoogleAuth: null,
      isConnected: await this.connectionService.isConnection(
        request.user.id,
        user.id,
      ),
      isPending: (await this.connectionRequestService.isPending(
        request.user.id,
        user.id,
      ))
        ? true
        : false,
    };
  }

  @Get('search')
  @UseGuards(JwtAuthenticationGuard)
  async searchUser(
    @Req() request: RequestWithUser,
    @Query('username') username: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    console.log(username);
    const result = await this.usersService.findByUserName(
      username
    );
    return Promise.all(
      result.map(async (user) => {
        return {
          id: user.id,
          fullname: user.profile.fullname,
          year: user.profile.year,
          month: user.profile.month,
          day: user.profile.day,
          address: user.profile.address,
          caste: user.profile.caste,
          religion: user.profile.religion,
          avatarId: user.avatarId,
          occupation: user.education.occupation,
          isConnected: (await this.connectionService.isConnection(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
          isPending: (await this.connectionRequestService.isPending(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
        };
      }),
    );
  }

  @Get('research/:username')
  @UseGuards(JwtAuthenticationGuard)
  async researchUser(
    @Req() request: RequestWithUser,
    @Param('username') username: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    console.log(username);
    const result = await this.usersService.findByUserName(
      username
    );
    console.log(result);
    return Promise.all(
      result.map(async (user) => {
        return {
          id: user.id,
          fullname: user.profile.fullname,
          year: user.profile.year,
          month: user.profile.month,
          day: user.profile.day,
          address: user.profile.address,
          caste: user.profile.caste,
          religion: user.profile.religion,
          avatarId: user.avatarId,
          occupation: user.education.occupation,
          isConnected: (await this.connectionService.isConnection(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
          isPending: (await this.connectionRequestService.isPending(
            request.user.id,
            user.id,
          ))
            ? true
            : false,
        };
      }),
    );
  }

  @Get('recommend/user')
  @UseGuards(JwtAuthenticationGuard)
  async recommendUsers(@Req() request: RequestWithUser) {
    const result = await this.usersService.getRecommendation(request.user);
    const resultToReturn = result.map(async (user) => {
      return {
        id: user.id,
        fullname: user?.profile?.fullname,
        year: user?.profile?.year,
        month: user?.profile?.month,
        day: user?.profile?.day,
        address: user?.profile?.address,
        caste: user?.profile?.caste,
        religion: user?.profile?.religion,
        avatarId: user?.avatarId,
        occupation: user?.education?.occupation,
        isConnected: (await this.connectionService.isConnection(
          request.user.id,
          user.id,
        ))
          ? true
          : false,
        isPending: (await this.connectionRequestService.isPending(
          request.user.id,
          user.id,
        ))
          ? true
          : false,
      };
    });
    return Promise.all(resultToReturn);
  }
}
