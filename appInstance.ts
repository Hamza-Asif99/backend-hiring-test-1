import fastify, { FastifyReply, FastifyRequest } from "fastify";
import rateLimiter from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { logger } from "./utils/logger";
import twilioRoutes from './api/routes/twilio.routes';
import activityRoutes from './api/routes/activity.routes'
import {routeNotFoundHandler, swaggerDocumentationAuth} from './utils/plugins';

import config from './conf/config.json';
import swaggerUIConfig from "./swagger_docs/swaggerui.config";


const buildApp = (opts = {}) => {
  const app = fastify(opts);

  // global error handler
  app.setErrorHandler((error: Error, req: FastifyRequest<{ Body: RequestBody }>, res: FastifyReply) => {
    logger.error(`Error in error handler plugin`);
    logger.error(`Error on req ${req.originalUrl}. ${error.stack}`);
    res
      .status(500)
      .send({ replyMessage: `An exception occured, Please contact support.` });
  });

  app.register(require('@fastify/formbody'))

  app.register(rateLimiter, {
    max: 100,
    timeWindow: "1 minute",
  });

  //swagger docs
  if (!config.swaggerConfig.disableSwaggerDocs) {
    app.register(fastifySwagger);
    app.register(
      swaggerUi,
      swaggerUIConfig.SWAGGER_UI
    );
  }

  //load all routers
  app.register(twilioRoutes);
  app.register(activityRoutes);
  
  //load plugins
  app.register(routeNotFoundHandler);
  app.register(swaggerDocumentationAuth);

  return app;
};

export default buildApp;
