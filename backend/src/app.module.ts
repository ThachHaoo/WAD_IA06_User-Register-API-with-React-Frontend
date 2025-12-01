import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 1. Import các thư viện cần thiết
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'; // Đảm bảo bạn đã tạo file này ở bước trước
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 2. Cấu hình đọc biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    // 3. Cấu hình kết nối Database (Supabase)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [User], // Khai báo bảng User
      synchronize: true, // Tự động tạo bảng (chỉ dùng cho dev)

      // QUAN TRỌNG: Cấu hình SSL cho Supabase
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    // Đăng ký module User vào đây (chúng ta sẽ tạo module này ngay sau bước này)
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
