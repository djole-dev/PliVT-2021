import { Request, Response, NextFunction } from "express";
import QuestionService from "./service";
import QuestionModel from './model';
import { IAddQuestion, IAddQuestionValidator } from "./dto/AddQuestion";
import { request } from "http";
import { IEditQuestion, IEditQuestionValidator } from "./dto/EditQuestion";

class QuestionController{
    private questionService:QuestionService;

    constructor(questionService: QuestionService){
        this.questionService= questionService;
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const questionId: number = +id;

        if(questionId <= 0){
            res.sendStatus(400);
            return;
        }

        const result =await this.questionService.getById(questionId, {
            loadSurvey: true
        })

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(result instanceof QuestionModel){
            res.send(result);
            return;
        }

        res.status(500).send(result);
    }

    public async getAllInSurvey(req: Request, res: Response, next: NextFunction){
        const surveyId: number=  +(req.params.sid);
        res.send(await this.questionService.getAllBySurveyId(surveyId));
    }

    public async add(req: Request, res:Response){
        if(!IAddQuestionValidator(req.body)){
            res.status(400).send(IAddQuestionValidator.errors);
        }

        res.send(await this.questionService.add(req.body as IAddQuestion));
    }

    public async edit(req:Request,res: Response ){

        const questionId = +(req.params.id);

        if(questionId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditQuestionValidator(req.body)){
            res.status(400).send(IEditQuestionValidator.errors);
            return;
        }

        const result =await this.questionService.getById(questionId);

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if(!(result instanceof QuestionModel)){
            res.status(500).send(result);
            return;
        }



       res.send( this.questionService.edit(questionId,req.body as IEditQuestion, {loadSurvey:true}));
    }
}

export default QuestionController;