import * as express from "express";
import { IApplicationResources } from "./common/IApplicationResources";
import IRouter from './common/IRouter.interface';
export default class Router {
    static setUpRoutes(application: express.Application, resources: IApplicationResources, routers: IRouter[]): void;
}
