import IModel from '../../common/IModel.interface';
import QuestionModel from '../question/model';

class AnswerModel implements IModel {
   answerId: number;
   questionId: number;
   value:string;
   question: QuestionModel | null = null;
};


export default AnswerModel;