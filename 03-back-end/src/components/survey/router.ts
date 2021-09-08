import * as express from "express";
import SurveyController from "./controller";
import SurveyService from "./service";
import IRouter from '../../common/IRouter.interface';
import IApplicationResources from "../../common/IApplicationResources";

export default class SurveyRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
   
    const surveyController: SurveyController = new SurveyController(
      resources
    );

    application.get("/surveys", surveyController.getAll.bind(surveyController));
    application.get(
      "/surveys/:id",
      surveyController.getById.bind(surveyController)
    );
    application.post("/surveys", surveyController.add.bind(surveyController));
    application.put("/surveys/:id", surveyController.edit.bind(surveyController));
    application.delete("/surveys/:id", surveyController.deleteById.bind(surveyController));
  }
}
