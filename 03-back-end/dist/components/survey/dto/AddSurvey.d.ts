interface IAddSurvey {
    identificationNumber: string;
    name: string;
    userId: number;
}
declare const IAddSurveyValidator: import("ajv").ValidateFunction<unknown>;
export { IAddSurvey };
export { IAddSurveyValidator };
