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
const twilio_schema_1 = __importDefault(require("../../swagger_docs/twilio.schema"));
const twilio_controller_1 = require("../controllers/twilio.controller");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        const routePrefix = "/apiv1/twilio";
        fastify.post(`${routePrefix}/ivr-welcome`, {
            schema: twilio_schema_1.default.TWILIO_REQUEST.schema,
        }, (req, res) => {
            (0, twilio_controller_1.ivrWelcome)(req, res);
        });
        fastify.post(`${routePrefix}/ivr-menu`, {
            schema: twilio_schema_1.default.TWILIO_REQUEST.schema,
        }, (req, res) => {
            (0, twilio_controller_1.ivrMenu)(req, res);
        });
        fastify.post(`${routePrefix}/voicemail`, {
            schema: twilio_schema_1.default.TWILIO_REQUEST.schema,
        }, (req, res) => {
            (0, twilio_controller_1.voiceMail)(req, res);
        });
    });
}
exports.default = routes;
//# sourceMappingURL=twilio.routes.js.map