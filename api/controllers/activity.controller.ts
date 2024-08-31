import { FastifyReply, FastifyRequest } from "fastify"
import { logger } from "../../utils/logger"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchCallHistory = async (req:  FastifyRequest<{ Querystring: RequestQuery }>,res: FastifyReply) => {
    try{
        if(!req.query || !req.query.senderNumber){
            throw new Error('Query params missing: Please send a number to fetch history of')
        }

        const callRecords = await prisma.call.findMany({
            where: {
                fromNumber: req.query.senderNumber,
            },
        });

        if(!callRecords){
            throw new Error(`Call history for the number ${req.query.senderNumber} could not be fetched`)
        }

        res.send(callRecords)

    }catch(err){
        logger.error(err)
        res.status(400).send(err)
    }
}

export { fetchCallHistory}