import Ajv from "ajv";

interface IEditSurvey {
  name: string;
}

const ajv = new Ajv();

const IEditSurveyValidator = ajv.compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
  },
  required: [
      "name",
  ],
  additionalProperties: false,
});

export { IEditSurvey };
export { IEditSurveyValidator };
