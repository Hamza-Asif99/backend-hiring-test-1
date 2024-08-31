"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const appName = "twilio_test";
const config_json_1 = require("../conf/config.json");
let { consoleModeEnable, fileModeEnable, logDirectory, logLevel, } = config_json_1.loggerConfig;
let opts = {
    logDirectory: logDirectory,
    fileNamePattern: `${appName}-<date>.log`,
    dateFormat: "YYYY.MM.DD-HHa",
};
let manager;
if (fileModeEnable) {
    manager = require("simple-node-logger").createLogManager(opts);
    if (consoleModeEnable) {
        manager.createConsoleAppender();
    }
}
else if (consoleModeEnable) {
    manager = require("simple-node-logger").createLogManager();
}
const logger = manager.createLogger(appName);
exports.logger = logger;
logger.setLevel(logLevel);
//# sourceMappingURL=logger.js.map