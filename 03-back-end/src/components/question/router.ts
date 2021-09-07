import * as express from "express";
import SurveyController from "./controller";
import SurveyService from "./service";
import { IApplicationResources } from "../../common/IApplicationResources";
import IRouter from '../../common/IRouter.interface';
import QuestionService from "./service";
import QuestionController from "./controller";

export default class QuestionRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const questionService: QuestionService = new QuestionService(resources.databaseConnection);
    const questionController: QuestionController = new QuestionController(
      questionService
    );

    application.get("/question/:id", questionController.getById.bind(questionController));
    application.get("/survey/:sid/question", questionController.getAllInSurvey.bind(questionController));
    application.post("/question", questionController.add.bind(questionController));
    application.put("/question/:id", questionController.edit.bind(questionController));
   
  }
}
