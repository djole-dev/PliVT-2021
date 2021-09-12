import * as express from "express";
import AuthController from './controller';

import IApplicationResources from "../../common/IApplicationResources";
import IRouter from "../../common/IRouter.interface";


export default class AuthRouter implements IRouter { public setUpRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const authController: AuthController = new AuthController(
      resources
    );
    application.post("/auth/user/login",            authController.userLogin.bind(authController));
    application.post("/auth/user/refresh",          authController.userRefresh.bind(authController));

  }
}