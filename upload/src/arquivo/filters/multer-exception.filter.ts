import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MulterError } from 'multer';

@Catch(MulterError, Error)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const isFileSizeError = exception instanceof MulterError && exception.code === 'LIMIT_FILE_SIZE';
    const status = isFileSizeError
      ? HttpStatus.PAYLOAD_TOO_LARGE // Retorna 413 quando o arquivo ultrapassa o limite
      : HttpStatus.BAD_REQUEST;

    const message = isFileSizeError
      ? 'Arquivo excede o limite de 5MB.'
      : exception.message;

    response.status(status).json({
      statusCode: status,
      error: status === HttpStatus.PAYLOAD_TOO_LARGE ? 'Payload Too Large' : 'Bad Request',
      message,
    });
  }
}
