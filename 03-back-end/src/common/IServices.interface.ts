import QuestionService from "../components/question/service";
import SurveyService from "../components/survey/service";
import AnswerService from '../components/answer/service';

export default interface IServices{
    surveyService: SurveyService;
    questionService: QuestionService;
    answerService: AnswerService;
};