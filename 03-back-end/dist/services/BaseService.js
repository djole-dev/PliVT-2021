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
class BaseService {
    constructor(db) {
        this.dbConnection = db;
    }
    get db() {
        return this.dbConnection;
    }
    getAllFromTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const lista = [];
                const sql = `SELECT * FROM ${tableName}`;
                this.db
                    .execute(sql)
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    const rows = result[0];
                    const lista = [];
                    if (Array.isArray(rows)) {
                        for (const row of rows) {
                            lista.push(yield this.adaptModel(row));
                        }
                    }
                    resolve(lista);
                }))
                    .catch((error) => {
                    resolve({
                        errorCode: error === null || error === void 0 ? void 0 : error.errorno,
                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage,
                    });
                });
            }));
        });
    }
    getByIdFromTable(tableName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const lista = [];
                const sql = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;
                this.db
                    .execute(sql, [id])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    const [rows, columns] = result;
                    if (!Array.isArray(rows)) {
                        resolve(null);
                        return;
                    }
                    if (rows.length === 0) {
                        resolve(null);
                        return;
                    }
                    resolve(yield this.adaptModel(rows[0]));
                }))
                    .catch((error) => {
                    resolve({
                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage,
                    });
                });
            }));
        });
    }
    getAllByFieldNameFromTable(tableName, fieldName, fieldValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const lista = [];
                const sql = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?`;
                this.db
                    .execute(sql, [fieldValue])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    const rows = result[0];
                    const lista = [];
                    if (Array.isArray(rows)) {
                        for (const row of rows) {
                            lista.push(yield this.adaptModel(row));
                        }
                    }
                    resolve(lista);
                }))
                    .catch((error) => {
                    resolve({
                        errorCode: error === null || error === void 0 ? void 0 : error.errorno,
                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage,
                    });
                });
            }));
        });
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map