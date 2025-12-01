import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user') // Định nghĩa prefix đường dẫn là /user
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register') // Định nghĩa endpoint là /register
  @UsePipes(ValidationPipe) // Kích hoạt bộ kiểm tra dữ liệu (DTO)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}
