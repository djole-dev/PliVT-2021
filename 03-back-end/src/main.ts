import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SurveyService from "./components/survey/service";
import SurveyController from "./components/survey/controller";
import SurveyRouter from "./components/survey/router";
import * as mysql2 from "mysql2/promise";
import { IApplicationResources } from "./common/IApplicationResources";
import Router from "./router";

async function main() {
  const application: express.Application = express();

  application.use(cors());
  application.use(express.json());

  const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
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
