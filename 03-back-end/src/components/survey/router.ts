import * as express from "express";
import SurveyController from "./controller";
import SurveyService from "./service";
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from "../../common/IApplicationResources";
import AuthMiddleware from '../../middleware/auth.middleware';

export default class SurveyRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
   
    const surveyController: SurveyController = new SurveyController(
      resources
    );

    application.get("/surveys",
    AuthMiddleware.getVerifier("user"),
     surveyController.getAll.bind(surveyController));
    application.get(
      "/surveys/:id",
      surveyController.getById.bind(surveyController)
    );
    application.post("/surveys", surveyController.add.bind(surveyController));
    application.put("/surveys/:id", surveyController.edit.bind(surveyController));
    application.delete("/surveys/:id", surveyController.deleteById.bind(surveyController));
  }
}
