const logger = {
  log: (...args: any[]) => {
    console.log(...args);
  },
  info: (...args: any[]) => {
    console.info(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
  debug: (...args: any[]) => {
    if (process.env.DEBUG) {
      console.debug(...args);
    }
  },
};

export default logger;
