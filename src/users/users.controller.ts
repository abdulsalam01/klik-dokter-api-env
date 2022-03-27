import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { User } from './users.entity';
import { LoginData } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async find(@Query() query) {
    return this.usersService.findAll({
      take: query?.take | 10,
      skip: query?.skip | 0,
    })
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('login')
  async findOne(@Body() params: LoginData) {
    return this.usersService.login(params);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('create')
  async create(@Body() data: User) {
    return this.usersService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('delete')
  async delete(@Body('id') data: number) {
    return this.usersService.delete({ id: data });
  }    
}
