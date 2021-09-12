import IConfig from '../common/IConfig.interface';
import * as dotenv from "dotenv";
import { readFileSync } from 'fs';

const dotEnvResult = dotenv.config();

if (dotEnvResult.error) throw "Environment configuration file error: " + dotEnvResult.error;

const Config: IConfig={
    server:{
    port:4080,
    },
    database:{
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "anketeapp",
        charset: "utf8",
        timezone: "+01:00",

    },
    mail: {
        hostname: process.env?.MAIL_HOST,
        port: +(process.env?.MAIL_PORT),
        secure: process.env?.MAIL_SECURE === "true",
        username: process.env?.MAIL_USERNAME,
        password: process.env?.MAIL_PASSWORD,
        fromEmail: process.env?.MAIL_FROM,
        debug: true,
    },
    auth: {
        user: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 2, // 60 * 60 * 24 * 7, // Samo dok radimo razvoj: 60 * 60 * 5
                public: readFileSync("keystore/user-auth.public", "utf-8"),
                private: readFileSync("keystore/user-auth.private", "utf-8"),
            },
            refresh: {
                duration: 60 * 60 * 24 * 365, // Samo dok radimo razvoj: 60 * 60 * 24 * 31
                public: readFileSync("keystore/user-refresh.public", "utf-8"),
                private: readFileSync("keystore/user-refresh.private", "utf-8"),
            },
        },
        allowRequestsEvenWithoutValidTokens: false,
    },
};

export default Config;