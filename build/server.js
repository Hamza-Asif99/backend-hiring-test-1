"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const appInstance_1 = __importDefault(require("./appInstance"));
const config_json_1 = __importDefault(require("./conf/config.json"));
const logger_1 = require("./utils/logger");
const server = (0, appInstance_1.default)({
    logger: true,
    connectionTimeout: config_json_1.default.serverConfig.appConnectionTimeout,
    https: config_json_1.default.serverConfig.https ? {
        key: config_json_1.default.serverConfig.keys.key,
        cert: config_json_1.default.serverConfig.keys.cert
    } : null,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.listen({ port: 8050, host: '0.0.0.0' });
    logger_1.logger.info(`Server started`);
}))();
//# sourceMappingURL=server.js.map