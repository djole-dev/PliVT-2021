import SurveyModel from "./model";
import * as mysql2 from "mysql2/promise";
declare class SurveyService {
    private db;
    constructor(db: mysql2.Connection);
    protected adaptModel(row: any): Promise<SurveyModel>;
    getAll(): Promise<SurveyModel[]>;
    getById(surveyId: number): Promise<SurveyModel | null>;
}
export default SurveyService;
