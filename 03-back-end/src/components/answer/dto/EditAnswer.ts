import Ajv from "ajv";

interface IEditAnswer {
 
  value: string;
  
}

const ajv = new Ajv();

const IEditAnswerValidator = ajv.compile({
  type: "object",
  properties: {
    value: {
      type: "string",
      minLength: 2,
      maxLength: 256,
    }
  },
  required: ["value"],
  additionalProperties: false,
});

export { IEditAnswer };
export { IEditAnswerValidator };
