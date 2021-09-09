import { Request, Response, NextFunction } from "express";
import AnswerService from "./service";
import AnswerModel from './model';
import BaseController from '../../common/BaseController';
import { IAddAnswer, IAddAnswerValidator } from "./dto/AddAnswer";
import { IEditAnswer, IEditAnswerValidator } from "./dto/EditAnswer";

class AnswerController extends BaseController{
    

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const answerId: number = +id;

        if(answerId <= 0){
            res.sendStatus(400);
            return;
        }

        const result =await this.services.answerService.getById(answerId, {
            loadQuestion: true
        })

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(result instanceof AnswerModel){
            res.send(result);
            return;
        }

        res.status(500).send(result);
    }

    public async getAllInAnswer(req: Request, res: Response, next: NextFunction){
        const questionId: number=  +(req.params.sid);
        res.send(await this.services.answerService.getAllBySurveyId(questionId));
    }

    public async add(req: Request, res:Response){
        if(!IAddAnswerValidator(req.body)){
            res.status(400).send(IAddAnswerValidator.errors);
        }

        res.send(await this.services.answerService.add(req.body as IAddAnswer));
    }

    public async edit(req:Request,res: Response ){

        const answerId = +(req.params.id);

        if(answerId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditAnswerValidator(req.body)){
            res.status(400).send(IEditAnswerValidator.errors);
            return;
        }

        const result =await this.services.answerService.getById(answerId);

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(!(result instanceof AnswerModel)){
            res.status(500).send(result);
            return;
        }



       res.send( this.services.answerService.edit(answerId,req.body as IEditAnswer, {loadQuestion:true}));
    }
}

export default AnswerController;