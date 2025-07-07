import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Interface for success response
interface SuccessResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errorCode: null;
  errors: unknown[];
}

@Injectable()
export class SucessResponseInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          isSuccess: true,
          message: 'success',
          data,
          errorCode: null,
          errors: [],
        };
      }),
    );
  }
}

export const successObject = {
  message: 'success',
};
