import * as express from "express";
import { IApplicationResources } from "../../common/IApplicationResources";
import IRouter from '../../common/IRouter.interface';
export default class SurveyRouter implements IRouter {
    setUpRoutes(application: express.Application, resources: IApplicationResources): void;
}
