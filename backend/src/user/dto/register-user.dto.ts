import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  // Kiểm tra phải là email hợp lệ
@IsEmail({}, { message: 'Email không đúng định dạng' })
email: string;

@IsNotEmpty({ message: 'Mật khẩu không được để trống' })
@MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
password: string;

}
