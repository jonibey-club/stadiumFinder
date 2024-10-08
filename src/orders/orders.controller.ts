import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("create")
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get("get")
  findAll() {
    return this.ordersService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}