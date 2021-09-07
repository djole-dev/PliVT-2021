import IModel from '../../common/IModel.interface';
import SurveyModel from '../survey/model';
class QuestionModel implements IModel {
   questionId: number;
   text: string;
   type: string;
   arguments:string;
   surveyId: number;
   orderOfQuestion: number;
   survey: SurveyModel | null = null;
};


export default QuestionModel;