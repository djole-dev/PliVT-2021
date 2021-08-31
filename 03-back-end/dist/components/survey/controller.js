"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const AddSurvey_1 = require("./dto/AddSurvey");
class SurveyController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveys = yield this.surveyService.getAll();
            res.send(surveys);
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const surveyId = +id;
            if (surveyId <= 0) {
                res.sendStatus(400);
                return;
            }
            const data = yield this.surveyService.getById(+id);
            if (data === null) {
                res.sendStatus(404);
                return;
            }
            if (data instanceof model_1.default) {
                res.send(data);
                return;
            }
            res.status(500).send(data);
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!AddSurvey_1.IAddSurveyValidator(data)) {
                res.status(400).send(AddSurvey_1.IAddSurveyValidator.errors);
                return;
            }
            const result = yield this.surveyService.add(data);
            res.send(result);
        });
    }
}
exports.default = SurveyController;
//# sourceMappingURL=controller.js.map