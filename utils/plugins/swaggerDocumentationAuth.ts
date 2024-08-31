'use strict'

import fp from 'fastify-plugin'
// const config = require('../../conf/config')
import config from '../../conf/config.json'

function swaggerDocumentationAuth(fastify: any, options: any, done: any){
   
    fastify.addHook('onRequest',  (req: any, res: any, next: any)  => {
        
        if(!config.swaggerConfig.swaggerDocsAuth.isEnabled || !req.url.includes('documentation')){
            return next()
        }
        
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
            res.header('WWW-Authenticate', 'Basic')
            return res.status(401).send({ message: "Authorization Header is missing in request" })
        }
        
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        
        if(username !== config.swaggerConfig.swaggerDocsAuth.username || password !== config.swaggerConfig.swaggerDocsAuth.password){
            return res.status(401).send({ message: "Invalid Authentication Credentials" })
        }
        
        req.user = username
        
        next()
        
    })

    done()
}

export default fp(swaggerDocumentationAuth)