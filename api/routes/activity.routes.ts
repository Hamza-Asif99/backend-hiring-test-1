import { FastifyInstance, FastifyRequest } from "fastify";
import swaggerActivitySchema from "../../swagger_docs/activity.schema";
import { fetchCallHistory } from "../controllers/activity.controller";

async function routes(fastify: FastifyInstance) {
  const routePrefix = "/apiv1/activity";

  //fetch the call history of a sender
  fastify.get(
    `${routePrefix}/call-history`,
    {
      schema: swaggerActivitySchema.CALL_HISTORY.schema,
    },
    (req: FastifyRequest<{ Querystring: RequestQuery }>, res) => {
        fetchCallHistory(req, res);
    }
  );

}

export default routes;
