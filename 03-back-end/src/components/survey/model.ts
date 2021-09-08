import IErrorResponse from '../../common/IErrorResponse.interface';
import IModel from '../../common/IModel.interface';
import QuestionModel from '../question/model';

class SurveyModel implements IModel {
   surveyId: number;
   identificationNumber: string;
   name: string;
   userId: number;
   createdAt: string;
   questions: QuestionModel[] | IErrorResponse;
};


export default SurveyModel;