import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SurveyService from "./components/survey/service";
import SurveyController from "./components/survey/controller";
import SurveyRouter from "./components/survey/router";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources";
import Router from "./router";
import QuestionRouter from './components/question/router';
import QuestionService from "./components/question/service";
import AnswerService from './components/answer/service';
import AnswerRouter from './components/answer/router';
import UserService from './components/user/service';
import UserRouter from './components/user/router';
import AuthRouter from "./components/auth/router";

async function main() {
  const application: express.Application = express();

  application.use(cors({
    origin: "http://localhost:3000",
    credential: true,
}));
  application.use(express.json());

    

  const resources: IApplicationResources = {
    databaseConnection:  await mysql2.createConnection({
      host: Config.database.host,
      port: Config.database.port,
      user: Config.database.user,
      password: Config.database.password,
      database: Config.database.database,
      charset: Config.database.charset,
      timezone: Config.database.timezone,
      supportBigNumbers: true,
    }),
  };

  resources.databaseConnection.connect();

  resources.services = {
    surveyService: new SurveyService(resources),
   questionService: new QuestionService(resources),
   answerService: new AnswerService(resources),
   userService: new UserService(resources)
  }

  application.get("/about", (req, res) => {
    res.send({
      title: "About us",
      content: "About us",
    });
  });

  /*
application.use("/static", express.static("static/", {
    index: "logo.png",
}));
*/

  Router.setUpRoutes(application, resources , [
    new SurveyRouter(),
    new QuestionRouter(),
    new AnswerRouter(),
    new UserRouter(),
    new AuthRouter()
  ])


  application.use((req, res) => {
    res.sendStatus(404);
  });

  application.use((err,req,res,next)=> {
    res.status(err.status).send(err.type);
  })

  application.listen(Config.server.port);
}

main();
