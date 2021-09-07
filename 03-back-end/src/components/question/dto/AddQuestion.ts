import Ajv from "ajv";

interface IAddQuestion {
  text: string;
  type: string;
  arguments: string;
  surveyId: number;
  orderOfQuestion: number;
}

const ajv = new Ajv();

const IAddQuestionValidator = ajv.compile({
  type: "object",
  properties: {
    text: {
      type: "string",
      minLength: 2,
      maxLength: 256,
    },
    type: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
    arguments: {
      type: "string",
      minLength: 2,
      maxLength: 256,
    },
    surveyId: {
      type: "integer",
      minimum: 1,
    },
    orderOfQuestion: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["text", "type", "arguments","surveyId","orderOfQuestion"],
  additionalProperties: false,
});

export { IAddQuestion };
export { IAddQuestionValidator };
