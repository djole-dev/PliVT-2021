import IConfig from '../common/IConfog.interface';

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

    }
};

export default Config;