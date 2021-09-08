import SurveyService from './service';
import {Request, Response, NextFunction} from "express";
import SurveyModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSurvey, IAddSurveyValidator } from './dto/AddSurvey';
import { IEditSurvey, IEditSurveyValidator } from './dto/EditSurvey';
import QuestionService from '../question/service';
import BaseController from '../../common/BaseController';

class SurveyController extends BaseController{

   

    async getAll(req: Request, res: Response, next: NextFunction){
      const surveys =  await this.services.surveyService.getAll();

      res.send(surveys);
    }


    async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const surveyId: number = +id;

        if(surveyId <= 0){
            res.sendStatus(400);
            return;
        }
        const data:SurveyModel|null| IErrorResponse =  await this.services.surveyService.getById(+id);

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

      async add(req: Request, res:Response, next: NextFunction){
          const data = req.body;

          if(!IAddSurveyValidator(data)){
              res.status(400).send(IAddSurveyValidator.errors);
              return;
          }

          const result: SurveyModel | IErrorResponse = await this.services.surveyService.add(data as IAddSurvey); 

          res.send(result);
      }

      async edit(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const surveyId: number = +id;

        if(surveyId <= 0){
            res.status(400).send("Invalid ID number.");
            return;
        }

          const data= req.body

          if(!IEditSurveyValidator(data)){
            res.status(400).send(IEditSurveyValidator.errors);
            return;
        }

        const result: SurveyModel | IErrorResponse = await this.services.surveyService.edit(surveyId,data as IEditSurvey); 

        if(result === null){
            res.sendStatus(404);
            return;
        }

        res.send(result);
      }


      async deleteById(req: Request, res: Response, next: NextFunction){
          const id: string = req.params.id;

          const surveyId: number = +id;

          if(surveyId <= 0){
              res.status(400).send("Invalid ID number");
              return;
          }

          res.send(await this.services.surveyService.delete(surveyId));
      }

}

export default SurveyController;