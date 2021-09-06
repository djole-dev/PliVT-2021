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
const BaseService_1 = require("../../services/BaseService");
class SurveyService extends BaseService_1.default {
    adaptModel(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new model_1.default();
            item.surveyId = Number(row === null || row === void 0 ? void 0 : row.survey_id);
            item.name = row === null || row === void 0 ? void 0 : row.name;
            item.identificationNumber = row === null || row === void 0 ? void 0 : row.identification_number;
            item.userId = Number(row === null || row === void 0 ? void 0 : row.user_id);
            return item;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAllFromTable("survey");
        });
    }
    getById(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getByIdFromTable("survey", surveyId);
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const sql = `INSERT survey SET identification_number = ?, name = ? , user_id = ?;`;
                this.db.execute(sql, [data.identificationNumber, data.name, data.userId])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    const insertInfo = result[0];
                    const newSurveyId = +(insertInfo === null || insertInfo === void 0 ? void 0 : insertInfo.insertId);
                    resolve(yield this.getById(newSurveyId));
                })).catch(error => {
                    resolve({
                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                    });
                });
            }));
        });
    }
}
exports.default = SurveyService;
//# sourceMappingURL=service.js.map