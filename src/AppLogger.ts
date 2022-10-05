import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from '@fuks-ru/common-backend';

@Injectable()
export class AppLogger implements LoggerService {
  public constructor(private readonly logger: Logger) {}

  public log(message: string, ...optionalParams: unknown[]): void {
    this.logger.log(message, {
      extra: optionalParams,
    });
  }

  public warn(message: string, ...optionalParams: unknown[]): void {
    this.logger.warn(message, {
      extra: optionalParams,
    });
  }

  public error(message: string, ...optionalParams: unknown[]): void {
    this.logger.error(message, {
      extra: optionalParams,
    });
  }

  public verbose(message: string, ...optionalParams: unknown[]): void {
    this.logger.verbose(message, {
      extra: optionalParams,
    });
  }
}
