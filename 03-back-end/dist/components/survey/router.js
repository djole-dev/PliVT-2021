"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const service_1 = require("./service");
class SurveyRouter {
    static setUpRoutes(application, resources) {
        const surveyService = new service_1.default(resources.databaseConnection);
        const surveyController = new controller_1.default(surveyService);
        application.get("/surveys", surveyController.getAll.bind(surveyController));
        application.get("/surveys/:id", surveyController.getById.bind(surveyController));
    }
}
exports.default = SurveyRouter;
//# sourceMappingURL=router.js.map