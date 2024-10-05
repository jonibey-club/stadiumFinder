import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./models/order.model";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.orderModel.findByPk(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.orderModel.destroy({ where: { id } });
  }
}
