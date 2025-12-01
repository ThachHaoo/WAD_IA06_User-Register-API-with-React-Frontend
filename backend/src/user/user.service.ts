import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

type PgError = {
  code?: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error: unknown) {
      // Thu hẹp kiểu trước khi dùng .code
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const { code } = error as PgError;

        if (code === '23505') {
          throw new ConflictException('Email đã tồn tại');
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
