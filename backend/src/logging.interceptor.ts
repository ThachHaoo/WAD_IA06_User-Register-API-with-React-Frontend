import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      // Trường hợp Thành công (Success)
      tap(() => {
        const time = Date.now() - now;
        this.logger.log(`${method} ${url} -> Success (+${time}ms)`);
      }),
      // Trường hợp Thất bại (Failed)
      catchError((error: unknown) => {
        const time = Date.now() - now;
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(
          `${method} ${url} -> Failed (+${time}ms) - Error: ${message}`,
        );
        return throwError(() => error);
      }),
    );
  }
}
