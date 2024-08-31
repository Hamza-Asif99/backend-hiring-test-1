"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const logger_1 = require("./utils/logger");
const twilio_routes_1 = __importDefault(require("./api/routes/twilio.routes"));
const activity_routes_1 = __importDefault(require("./api/routes/activity.routes"));
const plugins_1 = require("./utils/plugins");
const config_json_1 = __importDefault(require("./conf/config.json"));
const swaggerui_config_1 = __importDefault(require("./swagger_docs/swaggerui.config"));
const buildApp = (opts = {}) => {
    const app = (0, fastify_1.default)(opts);
    // global error handler
    app.setErrorHandler((error, req, res) => {
        logger_1.logger.error(`Error in error handler plugin`);
        logger_1.logger.error(`Error on req ${req.originalUrl}. ${error.stack}`);
        res
            .status(500)
            .send({ replyMessage: `An exception occured, Please contact support.` });
    });
    app.register(require('@fastify/formbody'));
    app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: "1 minute",
    });
    //swagger docs
    if (!config_json_1.default.swaggerConfig.disableSwaggerDocs) {
        app.register(swagger_1.default);
        app.register(swagger_ui_1.default, swaggerui_config_1.default.SWAGGER_UI);
    }
    //load all routers
    app.register(twilio_routes_1.default);
    app.register(activity_routes_1.default);
    //load plugins
    app.register(plugins_1.routeNotFoundHandler);
    app.register(plugins_1.swaggerDocumentationAuth);
    return app;
};
exports.default = buildApp;
//# sourceMappingURL=appInstance.js.map