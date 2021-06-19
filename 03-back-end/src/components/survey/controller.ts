import SurveyService from './service';
import {Request, Response, NextFunction} from "express";
import SurveyModel from './model';
class SurveyController{
    private surveyService:SurveyService;

    constructor(surveyService: SurveyService){
        this.surveyService= surveyService;
    }

    async getAll(req: Request, res: Response, next: NextFunction){
      const survey =  await this.surveyService.getAll();

      res.send(survey);
    }

}

export default SurveyController;