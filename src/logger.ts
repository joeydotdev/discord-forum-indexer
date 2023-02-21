const logger = {
  log: (...args: unknown[]) => {
    console.log(...args);
  },
  info: (...args: unknown[]) => {
    console.info(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
  debug: (...args: unknown[]) => {
    if (process.env.DEBUG) {
      console.debug(...args);
    }
  },
};

export default logger;
