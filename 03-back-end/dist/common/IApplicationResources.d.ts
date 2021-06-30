import * as mysql2 from 'mysql2/promise';
export interface IApplicationResources {
    databaseConnection: mysql2.Connection;
}
