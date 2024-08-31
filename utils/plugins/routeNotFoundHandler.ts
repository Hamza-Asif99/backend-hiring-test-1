'use strict'

import fp from 'fastify-plugin'
import { logger } from '../logger'
import { FastifyReply, FastifyRequest } from 'fastify'

function routeNotFoundHandler(fastify:any, options:any, done:any) {

    fastify.setNotFoundHandler({}, function (req:FastifyRequest<{ Body: RequestBody }>, res:FastifyReply, done:void) {
        logger.error(`Route ${req.originalUrl} not found`)
        res.status(404).send({ responseAttributes: { replyMessage: `Twilio-Test server does not recognise this route: ${req.originalUrl}`}})
    })

    done()

}

export default fp(routeNotFoundHandler)