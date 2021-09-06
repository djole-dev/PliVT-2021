import SurveyModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from '../../common/IErrorResponse.interface';
import { resolve } from "path/posix";
import { resourceUsage } from "process";
import { IAddSurvey } from "./dto/AddSurvey";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import BaseService from '../../services/BaseService';
import { IEditSurvey } from "./dto/EditSurvey";
import IModelAdapterOptions from "../../common/IModelAdapterOptions";


class SurveyModelAdapterOptions implements IModelAdapterOptions{
     loadQuestions: boolean = false;
}

class SurveyService extends BaseService<SurveyModel> {
 
  protected async adaptModel(row: any, options: Partial<SurveyModelAdapterOptions>): Promise<SurveyModel> {
    const item: SurveyModel = new SurveyModel();

    item.surveyId = Number(row?.survey_id);
    item.name = row?.name;
    item.identificationNumber = row?.identification_number;
    item.userId = Number(row?.user_id);
    //item.createdAt = row?.created_at;

    return item;
  }

  public async getAll(): Promise<SurveyModel[] | IErrorResponse> {
    return await this.getAllFromTable<SurveyModelAdapterOptions>("survey");
    /*return new Promise<SurveyModel[] | IErrorResponse>(async (resolve) => {
      const lista: SurveyModel[] = [];

      const sql: string = "SELECT * FROM survey;";

      this.db
        .execute(sql)
        .then(async (result) => {
          const rows = result[0];
          const lista: SurveyModel[] = [];

          if (Array.isArray(rows)) {
            for (const row of rows) {
              lista.push(await this.adaptModel(row));
            }
          }

          resolve(lista);
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errorno,
            errorMessage: error?.sqlMessage,
          });
        });
    });*/
  }

  public async getById(
    surveyId: number
  ): Promise<SurveyModel | null | IErrorResponse> {
    return await this.getByIdFromTable<SurveyModelAdapterOptions>("survey", surveyId);
  }

public async add (data :IAddSurvey): Promise<SurveyModel | IErrorResponse> {
  return new Promise<SurveyModel | IErrorResponse>(async resolve =>{
    const sql = `INSERT survey SET identification_number = ?, name = ? , user_id = ?;`;

    this.db.execute(sql, [ data.identificationNumber, data.name, data.userId])
    .then(async result => {
      const insertInfo : any = result[0];
      const newSurveyId : number = +(insertInfo?.insertId);
      resolve(await this.getById(newSurveyId));
    }).catch(error => {
      resolve({
        errorCode: error?.errno,
        errorMessage: error?. sqlMessage
      })
    })
  })
}

public async edit(surveyId:number, data:IEditSurvey): Promise<SurveyModel | IErrorResponse | null>{
  const result =await this.getById(surveyId);
   
   if(result === null){
     return null;
   }

   if(!(result instanceof SurveyModel)){
        return result;
   }

   return new Promise<SurveyModel | IErrorResponse>(async resolve =>{
    const sql = `UPDATE survey SET name = ? WHERE survey_id=?;`;

    this.db.execute(sql, [data.name, surveyId])
    .then(async result => {
      resolve(await this.getById(surveyId));
    }).catch(error => {
      resolve({
        errorCode: error?.errno,
        errorMessage: error?. sqlMessage
      })
    })
  })
}

}

export default SurveyService;
