import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserAvatarService } from 'src/user-avatar/user-avatar.service';
import { ForgetPasswordService } from 'src/forget-password/forget-password.service';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EmailScheduleService } from 'src/email-schedule/email-schedule.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import {
  EducationParams,
  FamilyParams,
  PreferanceParams,
  ProfileParams,
} from 'src/utils/types';
import { ProfileService } from 'src/profile/profile.service';
import { FamilyService } from 'src/family/family.service';
import { PreferanceService } from 'src/preferance/preferance.service';
import { EducationService } from 'src/education/education.service';
import { Peer } from 'src/peer/peer.entity';
import { BannerService } from 'src/banner/banner.service';
import { query } from 'express';
import { ConnectionService } from 'src/connection/connection.service';
import Notification from 'src/notification/notification.entity';
import { ILike } from 'typeorm';
import { profile } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userAvatarService: UserAvatarService,
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly configService: ConfigService,
    private readonly emailScheduleService: EmailScheduleService,
    private readonly profileService: ProfileService,
    private readonly familyService: FamilyService,
    private readonly preferanceService: PreferanceService,
    private readonly educationService: EducationService,
    private readonly bannerService: BannerService,
    private readonly connectionService: ConnectionService,
    @InjectRepository(Peer) private readonly peerRepository: Repository<Peer>,
    private connection: Connection,
  ) { }

  async createWithGoogle(email: string, name: string, picture: string) {
    const newUser = this.usersRepository.create({
      email: email,
      username: name,
      googleAvatar: picture,
      isGoogleAuth: true,
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async create(userData: CreateUserDto) {
    console.log(userData);
    const peer = this.peerRepository.create();
    const newUser = this.usersRepository.create({ ...userData, peer });

    await this.usersRepository.save(newUser);
    return newUser;
  }


  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, { currentHashedRefreshToken });
  }

  async getByVisitedUserId(id: string, userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: [
        'profile',
        'family',
        'education',
        'preferance',
        'photos',
        'banner',
        "subscription"
      ],
    });
    const connection = this.connectionService.isConnection(id, userId);
    console.log(user);
    return {
      ...user,
      connection: connection,
    };
  }

  async getById(id: string) {
    // console.log('searching');
    if (id === 'research') {
      return;
    }
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: [
        'profile',
        'family',
        'education',
        'preferance',
        'photos',
        'banner',
        "subscription"
      ],
    });
     //console.log(user);
    if (user) {
      return user;
    }

    // throw new HttpException(
    //   'User with this id does not exist',
    //   HttpStatus.NOT_FOUND,
    // );
    return null;
  }

  async getOnlyUser(id: string) {
    // console.log('searching');
    if (id === 'research') {
      return;
    }
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: [

        'profile',
        'family',
        'education',
        'preferance',
        'photos',
        'banner',
        "subscription"
      ],
    });
    // console.log(user);
    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async updatelastReadNotification(
    userId: string,
    notification?: Notification,
  ) {
    const targetUser = await this.getById(userId);
    if (notification) {
      targetUser.lastReadNotification = notification.id;
    } else {
      targetUser.lastReadNotification = null;
    }
    return await this.usersRepository.save(targetUser);
  }

  async findByUserName(username: string) {
    console.log(username);
    const users = await this.usersRepository.find({
      // where: { profile: { fullname: Like(`%${username}%`) } },
      where: [
        //{ username: Like(`%${username}%`) },
        { profile: { fullname: ILike(`%${username}%`) },suspended:false ,role:"user"},
      ],
      relations: ['profile', 'family', 'education', 'preferance', "subscription"],
      // skip: page * limit,
      // take: limit,
    });
    console.log(users);
    return users.map((user) => {
      return {
        ...user,
        password: null,
        currentHashedRefreshToken: null,
        isGoogleAuth: null,
      };
    });
  }


  async findOneByUserName(email: string) {
    console.log(email);
    const users = await this.usersRepository.findOne({
      // where: { profile: { fullname: Like(`%${username}%`) } },
      where: [
        //{ username: Like(`%${username}%`) },
        { email: ILike(`%${email}%`) },
      ],
      relations: ['profile', 'family', 'education', 'preferance', "subscription"],
      // skip: page * limit,
      // take: limit,
    });
    console.log(users);
    return users;
  }

  async filterUser(query: any) {
    console.log('filtering users');
    console.log(query);
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.education', 'education')
      .leftJoinAndSelect('user.family', 'family')
      .where('user.profile IS NOT NULL');

    queryBuilder.andWhere('suspended = :susp', {
      susp: false
    })

    queryBuilder.andWhere('role = :role', {
      role: "user"
    })

    if (query.religion && query.religion !== 'null') {
      queryBuilder.andWhere('profile.religion = :religion', {
        religion: query.religion,
      });
    }

    if (query.minHeight && query.minHeight !== 'null') {
      queryBuilder.andWhere('profile.height >= :minHeight', {
        minHeight: query.minHeight,
      });
    }
    

    if (query.maxHeight && query.maxHeight !== 'null') {
      queryBuilder.andWhere('profile.height <= :maxHeight', {
        maxHeight: query.maxHeight,
      });
    }
    

    if (query.annualIncome && query.annualIncome !== 'null') {
      queryBuilder.andWhere('education.annualIncome = :annualIncome', {
        annualIncome: query.annualIncome,
      });
    }

    if (query.caste && query.caste !== 'null') {
      queryBuilder.andWhere('profile.caste = :caste', {
        caste: query.caste,
      });
    }

    // if (query.marital_status && query.marital_status !== 'null') {
    //   queryBuilder.andWhere('profile.marital_status = :marital_status', {
    //     marital_status: query.marital_status,
    //   });
    // }

    if (query.marital_status && query.marital_status !== 'null') {
      queryBuilder.andWhere('profile.marital_status ILIKE :marital_status', {
        marital_status: `%${query.marital_status}%`,
      });
    }

    if (query.gender && query.gender !== 'null') {
      console.log("hiii");
      queryBuilder.andWhere('profile.sex = :gender', {
        gender: query.gender,
      });
    }

    if (query.maxAge && query.maxAge !== 'null') {
      const currentYear = new Date().getFullYear();
      const minBirthyear = currentYear - query.maxAge - 1;

      queryBuilder.andWhere('profile.year >= :year', {
        year: minBirthyear,
      });
    }

    if (query.minAge && query.minAge !== 'null') {
      const currentYear = new Date().getFullYear();
      const maxBirthyear = currentYear - query.minAge;
      queryBuilder.andWhere(`profile.year <= :minYear`, {
        minYear: maxBirthyear,
      });
    }

    if (query.sector && query.sector !== 'null') {
      queryBuilder.andWhere('education.sector = :sector', {
        sector: query.sector,
      });
    }

    const result = await queryBuilder
      .skip(query.page * query.limit)
      .take(query.limit)
      .getMany();
    console.log(result, query.page, query.limit);
    return result;
  }

  // async letsBegin(query: any) {
  //   console.log(query);

  //   const queryBuilder = this.usersRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.profile', 'profile')
  //     .leftJoinAndSelect('user.education', 'education')
  //     .leftJoinAndSelect('user.family', 'family')
  //     //.where('user.profile IS NOT NULL');

  //   if (query.searchingFor) {
  //     queryBuilder.andWhere('profile.sex =:sex', {
  //       sex: `${query.searchingFor}`,
  //     });
  //   }

  //   // if (query.caste) {
  //   //   queryBuilder.andWhere('profile.caste ILIKE :caste', {
  //   //     caste: `%${query.caste}%`,
  //   //   });
  //   // }

  //   if (query.ageFrom) {
  //     const currentYear = new Date().getFullYear();
  //     const maxBirthyear = currentYear - Number(query.ageFrom);
  //     queryBuilder.andWhere('profile.year <= :year', {
  //       year: maxBirthyear,
  //     });
  //   }

  //   if (query.ageTo) {
  //     const currentYear = new Date().getFullYear();
  //     const minBirthyear = currentYear - Number(query.ageTo);

  //     queryBuilder.andWhere('profile.year >= :year', {
  //       year: minBirthyear,
  //     });
  //   }

  //   if (query.caste && query.caste !== 'null') {
  //     queryBuilder.andWhere('profile.caste = :caste', {
  //       caste: query.caste,
  //     });
  //   }

  //   const result = await queryBuilder
  //     // .skip(1 * 20)
  //     //  .take(20)
  //     .getMany();

  //   console.log(result);
  //   return result;
  // }

  async letsBegin(query: any) {
    console.log(query);

    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.education', 'education')
      .leftJoinAndSelect('user.family', 'family')
      .where('user.profile IS NOT NULL');

      queryBuilder.andWhere('suspended = :susp', {
        susp: false
      })

    if (query.searchingFor) {
      queryBuilder.andWhere('profile.sex ILIKE :sex', {
        sex: `${query.searchingFor}`,
      });
    }

    queryBuilder.andWhere('role = :role', {
      role: "user"
    })

    if (query.caste) {
      queryBuilder.andWhere('profile.caste ILIKE :caste', {
        caste: `%${query.caste}%`,
      });
    }

    if (query.ageFrom) {
      const currentYear = new Date().getFullYear();
      const maxBirthyear = currentYear - Number(query.ageFrom);
      queryBuilder.andWhere('profile.year <= :year', {
        year: maxBirthyear,
      });
    }

    if (query.ageTo) {
      const currentYear = new Date().getFullYear();
      const minBirthyear = currentYear - Number(query.ageTo);

      queryBuilder.andWhere('profile.year >= :year', {
        year: minBirthyear,
      });
    }

    // if (query.caste && query.caste !== 'null') {
    //   queryBuilder.andWhere('profile.caste = :caste', {
    //     caste: query.caste,
    //   });
    // }

    const result = await queryBuilder
      // .skip(1 * 20)
      //  .take(20)
      .getMany();

    console.log(result);
    return result;
  }



  async getRecommendation(user: User) {
    try {
   if(!user.profile || !user.preferance){
return []
   }
   else{
    console.log(user?.profile?.sex)
    const requiredGender = user?.profile?.sex === 'man' || user?.profile?.sex === 'Man' ? 'woman' : 'man';
    const requiredReligon =
      user?.preferance?.religion === 'any'
        ? '*'
        : user?.preferance?.religion;
    const requiredCaste = user?.preferance?.caste == 'any'
      ? '*'
      : user?.preferance?.caste;
    const today = new Date().getFullYear()
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.education', 'education')
      .leftJoinAndSelect('user.family', 'family')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .where('profile.sex = :sex', { sex: requiredGender })
      .andWhere('profile.religion = :religion', { religion: requiredReligon })
      .andWhere('profile.caste = :caste', { caste: requiredCaste })
      .andWhere('profile.year BETWEEN   :minAge AND :maxAge',{minAge:user.preferance.minAge,maxAge:user.preferance.maxAge})
     
     
    .andWhere('suspended = :susp', {
        susp: false
      })
      .andWhere('role = :role', {
        role: "user"
      })
      .andWhere(
        `EXTRACT(YEAR FROM AGE(MAKE_DATE(profile.year, profile.month, profile.day))) BETWEEN :minAge AND :maxAge`,
        { minAge: user.preferance.minAge, maxAge: user.preferance.maxAge }
      ).andWhere('user.profile IS NOT NULL')
      .orderBy('RANDOM()')
      .limit(20)
      .getMany();

    console.log(users)
    if (users && users.length == 0) {
      const moreUser = await this.usersRepository.find({
        where: { profile: { sex: requiredGender },suspended:false },
        relations: ['profile', 'education', 'family', "subscription"],
        take: 20,
      });
console.log(moreUser)
      return moreUser;
    }
    return users;
   }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // async getRecommendation(user: User) {
  //   console.log(user)
  //   const requiredGender = user?.profile?.sex === 'man' || user?.profile?.sex=="Man"? 'woman' : 'man';
  //   console.log(requiredGender) 
  //   const requiredReligon =
  //     user.preferance.religion === 'any'
  //       ? '*'
  //       : user.preferance.religion;

  //       console.log(requiredReligon)
  //   const requiredCaste = (user.preferance.caste = 'any'
  //     ? '*'
  //     : user.preferance.caste);

  //   const users = await this.usersRepository.find({

  //     where:[
  //       //  { profile: { sex: requiredGender , religion: requiredReligon ,caste: requiredCaste }, },
  //     //    {
  //     //   profile: { sex: requiredGender , religion: requiredReligon  },

  //     // },
  //     {
  //       profile: { sex: requiredGender ,religion: requiredReligon},
  //     }],
  //     relations: ['profile', 'education', 'family', "subscription"],
  //   })


  //   return users;
  // }


  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async getByEmail(email: string) {
//     const user = await this.usersRepository.findOne({
//       // where: { email: email,suspended:false },
//       where: { email: email },
//       relations: ['profile', 'family', 'education', 'preferance', "subscription"]
//     });
//     if (user) {
//       console.log(user)
//       return user;
//     }
// else{
//   console.log("hiii")
// throw new HttpException(
//       'User with this email does not exist',
//       HttpStatus.NOT_FOUND,
//     );
// }
    
const user = await this.usersRepository.findOne({
  // where: { email: email,suspended:false },
  where: { email: email },
  relations: ['profile', 'family', 'education', 'preferance', "subscription"]
});
  console.log(user)
  return user;

  }




  async removeRefreshToken(userId: string) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async updateUser(userId: string, userDetail: UpdateUserDto) {
    console.log(userDetail);
    await this.usersRepository.update(userId, { ...userDetail });
    const user = this.usersRepository.findOne({ where: { id: userId }, relations: ['profile', 'family', 'education', 'preferance', "subscription"] });
    if (user) {
      return user;
    }

    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: any) {
   let user=await this.usersRepository.findOne({
    where:{id:id}
   })
   user.suspended=!user.suspended;
   await this.usersRepository.save(user);
   return user
    // if (!deleteResponse.affected) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
  }

  async forgetPassword(user: User) {
    await this.forgetPasswordService.deleteForgetPassword(user.id);
    const resetPasswordToken = randomBytes(24).toString('hex');

    await this.forgetPasswordService.createForgetPassword(
      resetPasswordToken,
      user.id,
    );

    const subject = 'Forgot your Password';
    const content = `
    <h1>Forgot your password</h1>
    <p style="font-size: 16px; font-weight: 600;">Click the link below to reset your password</p>
    <a style="font-size: 14px;" href="${this.configService.get(
      'CLIENT_URL',
    )}/reset/password/${resetPasswordToken}" target="_blank">Click here to reset your password.</a>
 `;

    this.emailScheduleService.scheduleEmail({
      recipient: user.email,
      subject: subject,
      html: content,
      date: new Date(Date.now() + 1000 * 60),
    });
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new HttpException('Password must match', HttpStatus.NOT_FOUND);
    }
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['profile', 'family', 'education', 'preferance', "subscription"] });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.passwordVerify(oldPassword, user.password);

    const hashNewPassword = await this.hashPassword(newPassword);
    user.password = hashNewPassword;
    await this.usersRepository.save(user);
    console.log('password changed successfully');
    return user;
  }

  public async resetPassword(resetPassword: ResetPasswordDto, token: string) {
    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      throw new HttpException('Password must match', HttpStatus.NOT_FOUND);
    }

    const forgetPassword = await this.forgetPasswordService.getByToken(token);

    const user = await this.getById(forgetPassword.userId);

    if (!user) {
    }

    user.password = await this.hashPassword(resetPassword.newPassword);
    user.isGoogleAuth = false;
    // user.isEmailVerified = true;
    await this.forgetPasswordService.deleteForgetPassword(user.id);
    // await this.emailVerifyService.deleteEmailVerify(user.id);
    user.currentHashedRefreshToken = null;
    await this.usersRepository.save(user);
  }

  private async passwordVerify(oldPassword: string, newPassword: string) {
    const passwordMatched = await bcrypt.compare(oldPassword, newPassword);
    if (!passwordMatched) {
      throw new HttpException('Invalid Password', HttpStatus.NOT_FOUND);
    }
  }

  public async emailVerify(userId: string) {
    const user = await this.getById(userId);
    user.emailVerified = true;
    await this.usersRepository.save(user);
    return user;
  }

  private async hashPassword(newPassword: string) {
    return await bcrypt.hash(newPassword, 10);
  }

  async addBanner(userId: string, file: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
        relations: ['banner'],
      });
      const currentBannerId = user?.banner?.id;

      const banner = await this.bannerService.uploadUserBanner(
        file,
        queryRunner,
        user,
      );
      await queryRunner.manager.update(User, userId, {
        banner: banner,
      });
      if (currentBannerId) {
        await this.bannerService.deleteBannerWithQueryRunner(
          currentBannerId,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return banner;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    console.log(userId, filename);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId }, relations: ['profile', 'family', 'education', 'preferance', "subscription"]
      });
      const currentAvatarId = user.avatarId;

      const avatar = await this.userAvatarService.uploadUserAvatar(
        imageBuffer,
        filename,
        queryRunner,
      );
      await queryRunner.manager.update(User, userId, {
        avatarId: avatar.id,
      });

      if (currentAvatarId) {
        await this.userAvatarService.deleteFileWithQueryRunner(
          currentAvatarId,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return avatar;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async updateProfile(params: ProfileParams) {
    const user = await this.getById(params.userId);
    console.log(user);
    const currentProfile = user.profile;

    let profile;
    if (currentProfile) {
      console.log("hiii")
      profile = await this.profileService.updateProfile(
        user,
        params.profileDetail,
      );
    } else {
      console.log("byeee")
      profile = await this.profileService.createProfile(
        user,
        params.profileDetail,
      );
    }
    const newProfile = await this.profileService.getAProfile(params.userId);
    user.profile = newProfile;
    await this.usersRepository.save(user);
    return profile;
  }

  async updateFamily(params: FamilyParams) {
    const user = await this.getById(params.userId);

    const currentFamily = user.family;
    let family;
    if (currentFamily) {
      family = await this.familyService.updateFamily(user, params.familyDetail);
    } else {
      family = await this.familyService.createFamily(user, params.familyDetail);
    }

    const newFamily = await this.familyService.getFamilyDetail(user);
    user.family = newFamily;
    await this.usersRepository.save(user);
    return family;
  }

  async updateEducation(params: EducationParams) {
    const user = await this.getById(params.userId);

    const currentEducation = user.education;
    let education;
    if (currentEducation) {
      education = await this.educationService.updateEducationDetail(
        user,
        params.educationDetail,
      );
    } else {
      education = await this.educationService.createEducationDetail(
        user,
        params.educationDetail,
      );
    }

    const newEducation = await this.educationService.getEducationDetail(user);
    user.education = newEducation;
    await this.usersRepository.save(user);
    return education;
  }

  async updatePreferance(params: PreferanceParams) {
    const user = await this.getById(params.userId);

    const currentPreferance = user.preferance;
    let preferance;
    if (currentPreferance) {
      preferance = await this.preferanceService.updatePreferance(
        user,
        params.preferanceDetail,
      );
    } else {
      preferance = await this.preferanceService.createPreferance(
        user,
        params.preferanceDetail,
      );
    }

    const newPreferance = await this.preferanceService.getPreferanceDetail(
      user,
    );
    user.preferance = newPreferance;
    await this.usersRepository.save(user);
    return preferance;
  }



  async updateProfileCount(id: string, userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId }, relations: ['profile',
        'family',
        'education',
        'preferance',
        'photos',
        'banner',
        "subscription"]
    });
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.profiles) {
      if (!user.profiles.includes(id)) {
        user.profiles = [...user.profiles, id]
      }
    }
    else {
      user.profiles = [id]
    }

    await this.usersRepository.save(user);
    console.log(user)
    return user;
  }



  //for getting all users for dashboard
  async getAllUsers() {
    try {
      const users = await this.usersRepository.find({ relations: ['profile', 'subscription'],order:{subscription:{expiryDate:"ASC"}} });
      return users
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async activate(id:string){
try {
  
} catch (error) {
  
}
  }
}
