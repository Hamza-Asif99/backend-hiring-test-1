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

(async ()=>{

  await server.listen({port: 8050, host:'0.0.0.0'})
  logger.info(`Server started`)

})();