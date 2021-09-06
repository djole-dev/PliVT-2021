import IModel from '../common/IModel.interface';
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../common/IErrorResponse.interface';
export default abstract class BaseService<ReturnModel extends IModel> {
    private dbConnection;
    constructor(db: mysql2.Connection);
    protected get db(): mysql2.Connection;
    protected abstract adaptModel(data: any): Promise<ReturnModel>;
    protected getAllFromTable(tableName: string): Promise<ReturnModel[] | IErrorResponse>;
    protected getByIdFromTable(tableName: string, id: number): Promise<ReturnModel | null | IErrorResponse>;
    protected getAllByFieldNameFromTable(tableName: string, fieldName: string, fieldValue: any): Promise<IErrorResponse | ReturnModel[]>;
}
