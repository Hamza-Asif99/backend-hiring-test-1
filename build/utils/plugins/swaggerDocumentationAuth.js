'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
// const config = require('../../conf/config')
const config_json_1 = __importDefault(require("../../conf/config.json"));
function swaggerDocumentationAuth(fastify, options, done) {
    fastify.addHook('onRequest', (req, res, next) => {
        if (!config_json_1.default.swaggerConfig.swaggerDocsAuth.isEnabled || !req.url.includes('documentation')) {
            return next();
        }
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
            res.header('WWW-Authenticate', 'Basic');
            return res.status(401).send({ message: "Authorization Header is missing in request" });
        }
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        if (username !== config_json_1.default.swaggerConfig.swaggerDocsAuth.username || password !== config_json_1.default.swaggerConfig.swaggerDocsAuth.password) {
            return res.status(401).send({ message: "Invalid Authentication Credentials" });
        }
        req.user = username;
        next();
    });
    done();
}
exports.default = (0, fastify_plugin_1.default)(swaggerDocumentationAuth);
//# sourceMappingURL=swaggerDocumentationAuth.js.map