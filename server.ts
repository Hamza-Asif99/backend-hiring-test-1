require('dotenv').config()

import fastifyInstance from './appInstance'
import config from './conf/config.json'
import { logger } from './utils/logger';

const server = fastifyInstance({
    logger: true,
    connectionTimeout: config.serverConfig.appConnectionTimeout,
    https: config.serverConfig.https ? {
      key: config.serverConfig.keys.key,
      cert: config.serverConfig.keys.cert
    } : null,
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 8050;
(async ()=>{

  await server.listen({port: port, host:'0.0.0.0'})
  logger.info(`Server started`)

})();