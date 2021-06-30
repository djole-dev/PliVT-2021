import SurveyService from './service';
import {Request, Response, NextFunction} from "express";
import SurveyModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
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
        const data:SurveyModel|null| IErrorResponse =  await this.surveyService.getById(+id);

        if(data === null){
            res.sendStatus(404);
            return;
        }

        if(data instanceof SurveyModel){
           res.send(data);
            return;
        }
  
        res.status(500).send(data);
      }

}

export default SurveyController;