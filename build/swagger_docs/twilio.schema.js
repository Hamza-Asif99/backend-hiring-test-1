"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerTwilioSchemas = {
    TWILIO_REQUEST: {
        schema: {
            description: "Twilio Request Format",
            tags: ["Twilio"],
            body: {
                type: "object",
                properties: {
                    From: {
                        type: "string",
                        description: "The number of the caller"
                    },
                    To: {
                        type: "string",
                        description: "The number of the receiver",
                    },
                    CallStatus: {
                        type: "string",
                        description: "The status of the call"
                    },
                    Duration: {
                        type: "string",
                        description: "how long the call went on"
                    },
                    RecordingUrl: {
                        type: "string",
                        description: "The url of voicemail, if recorded"
                    },
                    Digits: {
                        type: "string",
                        description: "The user input entered on the IVR menu"
                    }
                },
            }
        },
    },
};
exports.default = swaggerTwilioSchemas;
//# sourceMappingURL=twilio.schema.js.map