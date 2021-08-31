import * as express from "express";
import { IApplicationResources } from "./IApplicationResources";
export default interface IRouter {
    setUpRoutes(application: express.Application, resources: IApplicationResources): any;
}
