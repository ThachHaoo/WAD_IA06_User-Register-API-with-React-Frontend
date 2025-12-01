import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đăng ký Entity User để Service dùng được
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
