import { FastifyInstance, FastifyRequest } from "fastify";
import swaggerTwilioSchemas from "../../swagger_docs/twilio.schema";
import { ivrWelcome, ivrMenu, voiceMail } from "../controllers/twilio.controller";

async function routes(fastify: FastifyInstance) {
  const routePrefix = "/apiv1/twilio";

  fastify.post(
    `${routePrefix}/ivr-welcome`,
    {
      schema: swaggerTwilioSchemas.TWILIO_REQUEST.schema,
    },
    (req: FastifyRequest<{ Body: RequestBody }>, res) => {
        ivrWelcome(req, res);
    }
  );

  fastify.post(
    `${routePrefix}/ivr-menu`,
    {
      schema: swaggerTwilioSchemas.TWILIO_REQUEST.schema,
    },
    (req: FastifyRequest<{ Body: RequestBody }>, res) => {
        ivrMenu(req, res);
    }
  );

  fastify.post(
    `${routePrefix}/voicemail`,
    {
      schema: swaggerTwilioSchemas.TWILIO_REQUEST.schema,
    },
    (req: FastifyRequest<{ Body: RequestBody }>, res) => {
      voiceMail(req, res)  
    }
  );
}

export default routes;
