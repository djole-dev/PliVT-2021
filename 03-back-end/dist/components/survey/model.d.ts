import IModel from '../../common/IModel.interface';
declare class SurveyModel implements IModel {
    surveyId: number;
    identificationNumber: string;
    name: string;
    userId: number;
    createdAt: string;
}
export default SurveyModel;
