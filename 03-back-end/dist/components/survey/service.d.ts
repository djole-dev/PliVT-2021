import SurveyModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSurvey } from "./dto/AddSurvey";
declare class SurveyService {
    private db;
    constructor(db: mysql2.Connection);
    protected adaptModel(row: any): Promise<SurveyModel>;
    getAll(): Promise<SurveyModel[] | IErrorResponse>;
    getById(surveyId: number): Promise<SurveyModel | null | IErrorResponse>;
    add(data: IAddSurvey): Promise<SurveyModel | IErrorResponse>;
}
export default SurveyService;
