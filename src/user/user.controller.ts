import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRequestBody } from './user.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create Users' })
  @ApiBody(UserRequestBody)
  async signupUser(@Body() userData: { name?: string; email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
