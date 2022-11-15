import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
    colorize: true,
    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  })

export  const logger = pino({ name: 'cook-unity', level: 'info'}, stream)

