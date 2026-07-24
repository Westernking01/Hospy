export const logger = {
  info: (message: string, data?: Record<string, any>) => {
    console.log(JSON.stringify({ level: "info", message, ...data, timestamp: new Date().toISOString() }));
  },
  warn: (message: string, data?: Record<string, any>) => {
    console.warn(JSON.stringify({ level: "warn", message, ...data, timestamp: new Date().toISOString() }));
  },
  error: (message: string, error?: Error, data?: Record<string, any>) => {
    console.error(JSON.stringify({ 
      level: "error", 
      message, 
      error: error?.message, 
      stack: error?.stack, 
      ...data, 
      timestamp: new Date().toISOString() 
    }));
  },
  debug: (message: string, data?: Record<string, any>) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(JSON.stringify({ level: "debug", message, ...data, timestamp: new Date().toISOString() }));
    }
  }
};
