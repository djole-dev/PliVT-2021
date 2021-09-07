import Ajv from "ajv";

interface IEditQuestion {
  text: string;
  type: string;
  arguments: string;
  orderOfQuestion: number;
}

const ajv = new Ajv();

const IEditQuestionValidator = ajv.compile({
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
    orderOfQuestion: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["text", "type", "arguments","orderOfQuestion"],
  additionalProperties: false,
});

export { IEditQuestion };
export { IEditQuestionValidator };
