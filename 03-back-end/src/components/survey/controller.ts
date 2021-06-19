import SurveyService from './service';
import {Request, Response, NextFunction} from "express";
import SurveyModel from './model';
class SurveyController{
    private surveyService:SurveyService;

    constructor(surveyService: SurveyService){
        this.surveyService= surveyService;
    }

    async getAll(req: Request, res: Response, next: NextFunction){
      const surveys =  await this.surveyService.getAll();

      res.send(surveys);
    }


    async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const surveyId: number = +id;

        if(surveyId <= 0){
            res.sendStatus(400);
            return;
        }
        const survey:SurveyModel|null =  await this.surveyService.getById(+id);

        if(survey === null){
            res.sendStatus(404);
            return;
        }
  
        res.send(survey);
      }

}

export default SurveyController;