import QuestionModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions";
import BaseService from "../../common/BaseService";
import * as mysql2 from "mysql2/promise";
import { eachItem } from "ajv/dist/compile/util";
import SurveyService from "../survey/service";
import { IAddQuestion } from "./dto/AddQuestion";
import { IEditQuestion } from "./dto/EditQuestion";
import SurveyModel from "../survey/model";
import IErrorResponse from "../../common/IErrorResponse.interface";

class QuestionModelAdapterOptions implements IModelAdapterOptions {
  loadSurvey: boolean = false;
}

class QuestionService extends BaseService<QuestionModel> {
 

  protected async adaptModel(
    data: any,
    options: Partial<QuestionModelAdapterOptions>
  ): Promise<QuestionModel> {
    const item: QuestionModel = new QuestionModel();

    item.questionId = +data?.question_id;
    item.text = data?.text;
    item.type = data?.type;
    item.arguments = data?.arguments;
    item.surveyId = +data?.survey_id;
    item.orderOfQuestion = +data?.orderOfQuestion;

    if (options.loadSurvey && item.surveyId) {
      const result = await this.services.surveyService.getById(item.surveyId);
      if (result instanceof SurveyModel) {
        item.survey = result;
      }
    }

    return item;
  }

  public async getById(
    questionId: number,
    options: Partial<QuestionModelAdapterOptions> = {}
  ): Promise<QuestionModel | null | IErrorResponse> {
    return await this.getByIdFromTable("question", questionId, options);
  }

  public async getAllBySurveyId(
    surveyId: number,
    options: Partial<QuestionModelAdapterOptions> = {}
  ): Promise<QuestionModel[] | IErrorResponse> {
    return await this.getAllByFieldNameFromTable(
      "question",
      "survey_id",
      surveyId,
      options
    );
  }

  public async add(
    data: IAddQuestion
  ): Promise<QuestionModel | IErrorResponse> {
    return new Promise<QuestionModel | IErrorResponse>((resolve) => {
      const sql =
        "INSERT question SET text = ?, type = ? , arguments = ?, survey_id = ?, orderOfQuestion=? ;";
      this.db
        .execute(sql, [
          data.text,
          data.type,
          data.arguments,
          data.surveyId,
          data.orderOfQuestion,
        ])
        .then(async (result) => {
          const insertInfo: any = result[0];
          const newId: number = +insertInfo?.insertId;
          resolve(await this.getById(newId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  public async edit(
    questionId: number,
    data: IEditQuestion,
    options: Partial<QuestionModelAdapterOptions> = { }
  ): Promise <QuestionModel| IErrorResponse>{
      return new Promise<QuestionModel| IErrorResponse>(resolve => {
        const sql =
        "UPDATE question SET text = ?, type = ? , arguments = ?, orderOfQuestion= ? WHERE question_id =? ;";
      this.db
        .execute(sql, [
          data.text,
          data.type,
          data.arguments,
          data.orderOfQuestion,
          questionId
        ])
        .then(async (result) => {
          resolve(await this.getById(questionId, options));
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

export default QuestionService;
