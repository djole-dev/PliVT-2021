"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAddSurveyValidator = void 0;
const ajv_1 = require("ajv");
const ajv = new ajv_1.default();
const IAddSurveyValidator = ajv.compile({
    type: "object",
    properties: {
        identificationNumber: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        name: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        userId: {
            type: "integer",
            minimum: 1
        }
    },
    required: [
        "identificationNumber",
        "name",
        "userId"
    ],
    additionalProperties: false,
});
exports.IAddSurveyValidator = IAddSurveyValidator;
//# sourceMappingURL=AddSurvey.js.map