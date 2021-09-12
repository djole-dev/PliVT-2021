import {Algorithm} from 'jsonwebtoken';

interface TokenKeyOptions {
    private: string;
    public: string;
    duration: number;
}

interface TokenOptions {
    auth: TokenKeyOptions,
    refresh:TokenKeyOptions,
    issuer: string;
    algorithm: Algorithm,
}

export default interface IConfig{
    server:{
        port: number,
    },
    database:{
        host: string,
        port:number,
        user: string,
        password:string,
        database:string,
        charset:string,
        timezone:string
    },
    mail: {
        hostname: string;
        port: number;
        secure: boolean;
        username: string;
        password: string;
        fromEmail: string;
        debug: boolean;
    },
    auth: {
        user: TokenOptions,
        allowRequestsEvenWithoutValidTokens: boolean,
    },
};