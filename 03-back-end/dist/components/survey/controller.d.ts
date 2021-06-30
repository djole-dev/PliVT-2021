import SurveyService from './service';
import { Request, Response, NextFunction } from "express";
declare class SurveyController {
    private surveyService;
    constructor(surveyService: SurveyService);
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default SurveyController;
