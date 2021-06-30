import * as express from "express";
import SurveyController from "./controller";
import SurveyService from "./service";
import { IApplicationResources } from "../../common/IApplicationResources";
import IRouter from '../../common/IRouter.interface';

export default class SurveyRouter implements IRouter {
  public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const surveyService: SurveyService = new SurveyService(resources.databaseConnection);
    const surveyController: SurveyController = new SurveyController(
      surveyService
    );

    application.get("/surveys", surveyController.getAll.bind(surveyController));
    application.get(
      "/surveys/:id",
      surveyController.getById.bind(surveyController)
    );
  }
}
