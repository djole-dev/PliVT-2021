import Ajv from "ajv";

interface IAddSurvey {
  identificationNumber: string;
  name: string;
  userId: number;
}

const ajv = new Ajv();

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

export { IAddSurvey };
export { IAddSurveyValidator };
