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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCallHistory = void 0;
const logger_1 = require("../../utils/logger");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fetchCallHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query || !req.query.senderNumber) {
            throw new Error('Query params missing: Please send a number to fetch history of');
        }
        const callRecords = yield prisma.call.findMany({
            where: {
                fromNumber: req.query.senderNumber,
            },
        });
        if (!callRecords) {
            throw new Error(`Call history for the number ${req.query.senderNumber} could not be fetched`);
        }
        res.send(callRecords);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.status(400).send(err);
    }
});
exports.fetchCallHistory = fetchCallHistory;
//# sourceMappingURL=activity.controller.js.map