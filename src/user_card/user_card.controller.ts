import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  @Post('create')
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardService.create(createUserCardDto);
  }

  @Get('get')
  findAll() {
    return this.userCardService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.userCardService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserCardDto: UpdateUserCardDto) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userCardService.remove(+id);
  }
}
