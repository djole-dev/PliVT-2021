import SurveyModel from "./model";
import * as mysql2 from "mysql2/promise";

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

  public async getAll(): Promise<SurveyModel[]> {
    const lista: SurveyModel[] = [];

    const sql: string = "SELECT * FROM survey;";

    const [rows, columns] = await this.db.execute(sql);

    if (Array.isArray(rows)) {
      for (const row of rows) {
        lista.push(
        await this.adaptModel(row)
        )
      }
    }

    return lista;
  }

  public async getById(surveyId: number): Promise<SurveyModel | null> {
    const lista: SurveyModel[] = [];

    const sql: string = "SELECT * FROM survey WHERE survey_id = ?;";

    const [rows, columns] = await this.db.execute(sql, [surveyId]);

    if(!Array.isArray(rows)){
      return null;
    }

    if( rows.length === 0){
      return null;
    }

        
     return await this.adaptModel(rows[0]);
        
}
}

export default SurveyService;
