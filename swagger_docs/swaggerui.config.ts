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
}

export default swaggerUiConfig
