import QuestionService from "../components/question/service";
import SurveyService from "../components/survey/service";
import AnswerService from '../components/answer/service';
import UserService from '../components/user/service';

export default interface IServices{
    surveyService: SurveyService;
    questionService: QuestionService;
    answerService: AnswerService;
    userService: UserService;
};