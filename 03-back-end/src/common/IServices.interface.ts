import QuestionService from "../components/question/service";
import SurveyService from "../components/survey/service";

export default interface IServices{
    surveyService: SurveyService;
    questionService: QuestionService;
};