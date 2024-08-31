"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUiConfig = {
    SWAGGER_UI: {
        theme: {
            title: 'Twilio-Test-Server Documentation'
        },
        routePrefix: '/documentation',
    },
    REGISTER_FASTIFY: {
        swagger: {
            info: {
                title: 'Twilio-Test-Server Documentation',
                description: 'Documentation for the Twilio-Test-Server API',
                version: '1.0.0'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        }
    },
};
exports.default = swaggerUiConfig;
//# sourceMappingURL=swaggerui.config.js.map