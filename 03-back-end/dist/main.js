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
const express = require("express");
const cors = require("cors");
const dev_1 = require("./config/dev");
const router_1 = require("./components/survey/router");
const mysql2 = require("mysql2/promise");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const application = express();
        application.use(cors());
        application.use(express.json());
        const resources = {
            databaseConnection: yield mysql2.createConnection({
                host: dev_1.default.database.host,
                port: dev_1.default.database.port,
                user: dev_1.default.database.user,
                password: dev_1.default.database.password,
                database: dev_1.default.database.database,
                charset: dev_1.default.database.charset,
                timezone: dev_1.default.database.timezone,
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
        router_1.default.setUpRoutes(application, resources);
        application.use((req, res) => {
            res.sendStatus(404);
        });
        application.listen(dev_1.default.server.port);
    });
}
main();
//# sourceMappingURL=main.js.map