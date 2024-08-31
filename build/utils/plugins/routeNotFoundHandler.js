'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const logger_1 = require("../logger");
function routeNotFoundHandler(fastify, options, done) {
    fastify.setNotFoundHandler({}, function (req, res, done) {
        logger_1.logger.error(`Route ${req.originalUrl} not found`);
        res.status(404).send({ responseAttributes: { replyMessage: `Twilio-Test server does not recognise this route: ${req.originalUrl}` } });
    });
    done();
}
exports.default = (0, fastify_plugin_1.default)(routeNotFoundHandler);
//# sourceMappingURL=routeNotFoundHandler.js.map