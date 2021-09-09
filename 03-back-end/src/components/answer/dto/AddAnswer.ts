import Ajv from "ajv";

interface IAddAnswer {
  questionId: number;
  value: string;
}

const ajv = new Ajv();

const IAddAnswerValidator = ajv.compile({
  type: "object",
  properties: {
    questionId: {
      type: "integer",
      minimum: 1,
    },
    value: {
        type: "string",
        minLength: 2,
        maxLength: 256,
      },
  },
  required: ["questionId","value"],
  additionalProperties: false,
});

export { IAddAnswer };
export { IAddAnswerValidator };