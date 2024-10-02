import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ActivateAdminDto } from "./dto/activate-admin.dto";
import { DeactivateAdminDto } from "./dto/deactivate-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";
import { CreatorGuard } from "../guards/creator.guard";
import { AdminSelfGuard } from "../guards/admin-self.guard";


@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(CreatorGuard)
  @Post("create")
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({
    status: 201,
    description: "The new admin has been successfully created",
    type: Admin,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "View all admins" })
  @ApiResponse({
    status: 200,
    description: "list of all admins",
    type: [Admin],
  })
  @UseGuards(CreatorGuard)
  @Get("all")
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "View one admin by id" })
  @ApiResponse({
    status: 200,
    description: "view one admin by id",
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Update the admin by id" })
  @UseGuards(CreatorGuard)
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Delete the admin by id " })
  @UseGuards(CreatorGuard)
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @ApiOperation({ summary: "Activate the admin" })
  @UseGuards(CreatorGuard)
  @HttpCode(200)
  @Post("activate")
  activateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminDto);
  }

  @ApiOperation({ summary: "Deactivate the admin" })
  @UseGuards(CreatorGuard)
  @HttpCode(200)
  @Post("deactivate")
  deactivateAdmin(@Body() deactivateAdminDto: DeactivateAdminDto) {
    return this.adminService.activateAdmin(deactivateAdminDto);
  }
}
