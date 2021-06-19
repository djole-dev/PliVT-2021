import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SurveyService from './components/survey/service';
import SurveyController from './components/survey/controller';

const application: express.Application= express();


application.use(cors());
application.use(express.json());


application.get("/about", (req,res) => {
    res.send({
        "title":"About us",
         "content": "About us"


    });
});

/*
application.use("/static", express.static("static/", {
    index: "logo.png",
}));
*/

const surveyService:SurveyService = new SurveyService();
const surveyController:SurveyController= new SurveyController(surveyService);

application.get("/surveys", surveyController.getAll.bind(surveyController));
application.get("/surveys/:id", surveyController.getById.bind(surveyController));




application.use((req, res) => {
    res.sendStatus(404);
});


application.listen(Config.server.port);