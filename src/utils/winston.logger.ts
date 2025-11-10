import * as Winston from 'winston';

export const Logger = Winston.createLogger({
  exitOnError: false,
  format: Winston.format.combine(
    Winston.format.colorize({ level: true }),
    Winston.format.splat(),
    Winston.format.simple()
  ),
  transports: [
    // use console and file transports
    new Winston.transports.File({ filename: 'logs.log' }),
    new Winston.transports.Console()
  ]
});
