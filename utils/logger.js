const winston = require('winston');
const { createLogger, format, transports, addColors } = require('winston');
const { combine, colorize, label, timestamp, json, prettyPrint, printf } = format
let myCustomFormat = format.combine(
  colorize({ all: true }),
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  printf(info => {
    if(info instanceof Error) {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
}));
let FormatFile = format.combine(
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  printf(
    (info) =>
      ` ${info.label} ${info.timestamp}  ${info.level} : ${info.message} `
  )
);

addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({ format: combine(myCustomFormat) }),
    new winston.transports.File({
      format: combine(FormatFile),
      level: 'error',
      filename: 'logs/example.log'
    }),
    new winston.transports.File({
      format: combine(FormatFile),
      level: 'info',

      filename: 'logs/info.log'
    })
  ],
});
winston.add(logger)




module.exports = logger;