import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(@InjectModel(UserWallet) private userWalletModel: typeof UserWallet){}
  create(createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletModel.create(createUserWalletDto);
  }

  findAll() {
    return this.userWalletModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.userWalletModel.findOne({ include: { all: true } });
  }

  update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    return this.userWalletModel.update(updateUserWalletDto,{where: {id},returning: true});
  }

  remove(id: number) {
    return this.userWalletModel.destroy({where: {id}});
  }
}
