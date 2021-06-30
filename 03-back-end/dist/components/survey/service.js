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
class SurveyService {
    constructor(db) {
        this.db = db;
    }
    adaptModel(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new model_1.default();
            item.surveyId = Number(row === null || row === void 0 ? void 0 : row.survey_id);
            item.name = row === null || row === void 0 ? void 0 : row.name;
            item.identificationNumber = row === null || row === void 0 ? void 0 : row.identification_number;
            item.userId = Number(row === null || row === void 0 ? void 0 : row.user_id);
            item.createdAt = row === null || row === void 0 ? void 0 : row.created_at;
            return item;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = [];
            const sql = "SELECT * FROM survey;";
            const [rows, columns] = yield this.db.execute(sql);
            if (Array.isArray(rows)) {
                for (const row of rows) {
                    lista.push(yield this.adaptModel(row));
                }
            }
            return lista;
        });
    }
    getById(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = [];
            const sql = "SELECT * FROM survey WHERE survey_id = ?;";
            const [rows, columns] = yield this.db.execute(sql, [surveyId]);
            if (!Array.isArray(rows)) {
                return null;
            }
            if (rows.length === 0) {
                return null;
            }
            return yield this.adaptModel(rows[0]);
        });
    }
}
exports.default = SurveyService;
//# sourceMappingURL=service.js.map