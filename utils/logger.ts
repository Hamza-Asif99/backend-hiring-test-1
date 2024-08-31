const appName = "twilio_test";

import {loggerConfig} from '../conf/config.json'

let {
  consoleModeEnable,
  fileModeEnable,
  logDirectory,
  logLevel,
} = loggerConfig;

let opts = {
  logDirectory: logDirectory,
  fileNamePattern: `${appName}-<date>.log`,
  dateFormat: "YYYY.MM.DD-HHa",
};

let manager;
if (fileModeEnable) {
    manager = require("simple-node-logger").createLogManager(opts);
    if(consoleModeEnable){
      manager.createConsoleAppender()
    }
} else if(consoleModeEnable) {
    manager = require("simple-node-logger").createLogManager();
}

const logger = manager.createLogger(appName);
logger.setLevel(logLevel)

export {
  logger
};
