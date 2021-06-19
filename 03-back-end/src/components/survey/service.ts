import SurveyModel from "./model";
class SurveyService {
  public async getAll(): Promise<SurveyModel[]> {
    const lista: SurveyModel[] = [];

    lista.push({
      identificationNumber: "Asd",
      surveyId: 2,
      userId: 2,
      name: "Aloha",
    });

    lista.push({
      identificationNumber: "Asd",
      surveyId: 1,
      userId: 2,
      name: "Aloha",
    });

    return lista;
  }

  public async getById(surveyId: number): Promise<SurveyModel | null> {
    if (surveyId === 1 || surveyId === 2) {
      if (surveyId === 1) {
        return {
          identificationNumber: "Asd",
          surveyId: 1,
          userId: 2,
          name: "prva",
        };
      }
      if (surveyId === 2) {
        return {
          identificationNumber: "Asd",
          surveyId: 2,
          userId: 2,
          name: "druga",
        };
      }
    }else{
        return null;
    }
  }
}

export default SurveyService;
