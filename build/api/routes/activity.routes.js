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
const activity_schema_1 = __importDefault(require("../../swagger_docs/activity.schema"));
const activity_controller_1 = require("../controllers/activity.controller");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        const routePrefix = "/apiv1/activity";
        //fetch the call history of a sender
        fastify.get(`${routePrefix}/call-history`, {
            schema: activity_schema_1.default.CALL_HISTORY.schema,
        }, (req, res) => {
            (0, activity_controller_1.fetchCallHistory)(req, res);
        });
    });
}
exports.default = routes;
//# sourceMappingURL=activity.routes.js.map