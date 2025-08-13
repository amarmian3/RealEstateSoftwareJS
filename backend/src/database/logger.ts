export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export class Logger {
  private static format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  public static info(message: string): void {
    console.log(this.format(LogLevel.INFO, message));
  }

  public static warn(message: string): void {
    console.warn(this.format(LogLevel.WARN, message));
  }

  public static error(message: string, err?: unknown): void {
    console.error(this.format(LogLevel.ERROR, message));
    if (err instanceof Error) {
      console.error(err.stack);
    } else if (err !== undefined) {
      console.error(err);
    }
  }

  public static debug(message: string): void {
    console.debug(this.format(LogLevel.DEBUG, message));
  }
}
