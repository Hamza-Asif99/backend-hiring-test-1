import { FastifyReply, FastifyRequest } from "fastify";
import twilio from "twilio";
import { PrismaClient } from '@prisma/client';
import { logger } from "../../utils/logger";

const prisma = new PrismaClient();

const ivrWelcome = (req: FastifyRequest<{ Body: RequestBody }>, res: FastifyReply) => {
    try{

        const twiml = new twilio.twiml.VoiceResponse();
        
        twiml.say("Hello, thank you for calling.");
        twiml
        .gather({
            numDigits: 1,
            action: "/apiv1/twilio/ivr-menu",
            method: "POST",
        })
        .say("Press 1 to forward the call. Press 2 to leave a voicemail.");
        
        res.send(twiml.toString())
    }catch(error){
        logger.error('Could not provide IVR menu options')
    }
};

const ivrMenu = (req: FastifyRequest<{ Body: RequestBody }>, res: FastifyReply) => {
    try{

        const twiml = new twilio.twiml.VoiceResponse();
        
        const digits = req.body.Digits
        
        if(digits === '1'){
            
            twiml.say('Forwarding your call.');
            twiml.dial(process.env.TO_NUMBER);  
            storeCallData(req)
            
        }   
        else{
            twiml.say('Leave a message after the beep.');
            twiml.record({
                maxLength: 5,
                playBeep: true,
                action:'/apiv1/twilio/voicemail',
                method: 'POST'
            })
        }
        
        res.send(twiml.toString())
    }catch(error){
        logger.error('Could not forward call or record voicemail')
    }
}

const storeCallData = async (req: FastifyRequest<{ Body: RequestBody }>) => {
    try {

        const newCall = await prisma.call.create({
          data: {
            fromNumber: req.body.From,
            toNumber: req.body.To,
            // startTime:"",
            status: req.body.CallStatus,
            duration: req.body.Duration,
            callRecordingUrl: req.body.RecordingUrl
          },
        });
        logger.info('Call added:', newCall);
    } catch (error) {
        logger.error('Error adding call:', error);
    }
}

const voiceMail = (req: FastifyRequest<{ Body: RequestBody }>, res: FastifyReply) => {

  try{

      //AccountSid, CallSid, CallStatus, From, RecordingSid, RecordingUrl, To
      // RecordingDuration
      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say("Thank you for your message. Goodbye.");
      storeCallData(req)
      res.send(twiml.toString());
   }catch(error){
    logger.error('Error adding call:', error);
   }
};

export { ivrWelcome, voiceMail , ivrMenu};
