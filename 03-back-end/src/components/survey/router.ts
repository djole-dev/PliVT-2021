import * as express from "express";
import SurveyController from "./controller";
import SurveyService from "./service";

export default class SurveyRouter{
    public static setUpRoutes(application: express.Application){
        const surveyService:SurveyService = new SurveyService();
const surveyController:SurveyController= new SurveyController(surveyService);

application.get("/surveys", surveyController.getAll.bind(surveyController));
application.get("/surveys/:id", surveyController.getById.bind(surveyController));
    }
}