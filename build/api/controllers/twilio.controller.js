"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ivrMenu = exports.voiceMail = exports.ivrWelcome = void 0;
const twilio_1 = __importDefault(require("twilio"));
// import { PrismaClient } from '@prisma/client';
const logger_1 = require("../../utils/logger");
// const prisma = new PrismaClient();
const ivrWelcome = (req, res) => {
    try {
        const twiml = new twilio_1.default.twiml.VoiceResponse();
        twiml.say("Hello, thank you for calling.");
        twiml
            .gather({
            numDigits: 1,
            action: "/apiv1/twilio/ivr-menu",
            method: "POST",
        })
            .say("Press 1 to forward the call. Press 2 to leave a voicemail.");
        res.send(twiml.toString());
    }
    catch (error) {
        logger_1.logger.error('Could not provide IVR menu options');
    }
};
exports.ivrWelcome = ivrWelcome;
const ivrMenu = (req, res) => {
    try {
        const twiml = new twilio_1.default.twiml.VoiceResponse();
        const digits = req.body.Digits;
        if (digits === '1') {
            twiml.say('Forwarding your call.');
            twiml.dial(process.env.TO_NUMBER);
            storeCallData(req);
        }
        else {
            twiml.say('Leave a message after the beep.');
            twiml.record({
                maxLength: 5,
                playBeep: true,
                action: '/apiv1/twilio/voicemail',
                method: 'POST'
            });
        }
        res.send(twiml.toString());
    }
    catch (error) {
        logger_1.logger.error('Could not forward call or record voicemail');
    }
};
exports.ivrMenu = ivrMenu;
const storeCallData = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const newCall = await prisma.call.create({
    //       data: {
    //         fromNumber: req.body.From,
    //         toNumber: req.body.To,
    //         // startTime:"",
    //         status: req.body.CallStatus,
    //         duration: req.body.Duration,
    //         callRecordingUrl: req.body.RecordingUrl
    //       },
    //     });
    //     logger.info('Call added:', newCall);
    // } catch (error) {
    //     logger.error('Error adding call:', error);
    // }
});
const voiceMail = (req, res) => {
    try {
        //AccountSid, CallSid, CallStatus, From, RecordingSid, RecordingUrl, To
        // RecordingDuration
        const twiml = new twilio_1.default.twiml.VoiceResponse();
        twiml.say("Thank you for your message. Goodbye.");
        storeCallData(req);
        res.send(twiml.toString());
    }
    catch (error) {
        logger_1.logger.error('Error adding call:', error);
    }
};
exports.voiceMail = voiceMail;
//# sourceMappingURL=twilio.controller.js.map