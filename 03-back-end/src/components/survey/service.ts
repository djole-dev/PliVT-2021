import SurveyModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { resolve } from "path/posix";
import { resourceUsage } from "process";

class SurveyService {
  private db: mysql2.Connection;

  constructor(db: mysql2.Connection) {
    this.db = db;
  }

  protected async adaptModel(row: any): Promise<SurveyModel> {
    const item: SurveyModel = new SurveyModel();

    item.surveyId = Number(row?.survey_id);
    item.name = row?.name;
    item.identificationNumber = row?.identification_number;
    item.userId = Number(row?.user_id);
    item.createdAt = row?.created_at;

    return item;
  }

  public async getAll(): Promise<SurveyModel[] | IErrorResponse> {
    return new Promise<SurveyModel[] | IErrorResponse>(async (resolve) => {
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
    });
  }

  public async getById(
    surveyId: number
  ): Promise<SurveyModel | null | IErrorResponse> {
    return new Promise<SurveyModel | null | IErrorResponse>(async (resolve) => {
      const lista: SurveyModel[] = [];

      const sql: string = "SELECT * FROM survey WHERE survey_id = ?;";

      this.db
        .execute(sql, [surveyId])
        .then(async (result) => {
          const [rows, columns] = result;
          if (!Array.isArray(rows)) {
            resolve(null);
            return;
          }

          if (rows.length === 0) {
            resolve(null);
            return;
          }

          resolve(await this.adaptModel(rows[0]));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
}

export default SurveyService;
