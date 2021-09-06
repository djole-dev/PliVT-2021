import SurveyModel from "./model";
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSurvey } from "./dto/AddSurvey";
import BaseService from '../../services/BaseService';
declare class SurveyService extends BaseService<SurveyModel> {
    protected adaptModel(row: any): Promise<SurveyModel>;
    getAll(): Promise<SurveyModel[] | IErrorResponse>;
    getById(surveyId: number): Promise<SurveyModel | null | IErrorResponse>;
    add(data: IAddSurvey): Promise<SurveyModel | IErrorResponse>;
}
export default SurveyService;
