import AnswerModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions";
import BaseService from "../../common/BaseService";
import QuestionModel from "../question/model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddAnswer } from "./dto/AddAnswer";
import { IEditAnswer } from "./dto/EditAnswer";

class AnswerModelAdapterOptions implements IModelAdapterOptions {
  loadQuestion: boolean = false;
}

class AnswerService extends BaseService<AnswerModel> {
 

  protected async adaptModel(
    data: any,
    options: Partial<AnswerModelAdapterOptions>
  ): Promise<AnswerModel> {
    const item: AnswerModel = new AnswerModel();

    item.answerId = +data?.answer_id;
    item.questionId = +data?.survey_id;
    item.value = data?.value;

    if (options.loadQuestion && item.questionId) {
      const result = await this.services.questionService.getById(item.questionId);
      if (result instanceof QuestionModel) {
        item.question = result;
      }
    }

    return item;
  }

  public async getById(
    answerId: number,
    options: Partial<AnswerModelAdapterOptions> = {}
  ): Promise<AnswerModel | null | IErrorResponse> {
    return await this.getByIdFromTable("answer", answerId, options);
  }

  public async getAllBySurveyId(
    questionId: number,
    options: Partial<AnswerModelAdapterOptions> = {}
  ): Promise<AnswerModel[] | IErrorResponse> {
    return await this.getAllByFieldNameFromTable(
      "answer",
      "question_id",
      questionId,
      options
    );
  }

  public async add(
    data: IAddAnswer
  ): Promise<AnswerModel | IErrorResponse> {
    return new Promise<AnswerModel | IErrorResponse>((resolve) => {
      const sql =
        "INSERT answer SET value = ?, question_id = ?;";
      this.db
        .execute(sql, [
          data.value,
          data.questionId,
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
    answerId: number,
    data: IEditAnswer,
    options: Partial<AnswerModelAdapterOptions> = { }
  ): Promise <AnswerModel| IErrorResponse>{
      return new Promise<AnswerModel| IErrorResponse>(resolve => {
        const sql =
        "UPDATE answer SET value = ? WHERE answer_id =? ;";
      this.db
        .execute(sql, [
          data.value,
          answerId
        ])
        .then(async (result) => {
          resolve(await this.getById(answerId, options));
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

export default AnswerService;
