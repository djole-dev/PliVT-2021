import * as express from "express";
import IRouter from '../../common/IRouter.interface';
import QuestionController from "./controller";
import IApplicationResources from "../../common/IApplicationResources";
import AnswerController from "./controller";

export default class AnswerRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const answerController: AnswerController = new AnswerController(
      resources
    );

    application.get("/answer/:id", answerController.getById.bind(answerController));
    application.get("/question/:sid/answer", answerController.getAllInAnswer.bind(answerController));
    application.post("/answer", answerController.add.bind(answerController));
    application.put("/answer/:id", answerController.edit.bind(answerController));
   
  }
}
