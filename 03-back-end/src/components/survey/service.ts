import SurveyModel from './model';
class SurveyService{
    public async getAll(): Promise<SurveyModel[]>{
        const lista: SurveyModel[] = [];


        lista.push({
            identificationNumber:"Asd",
            surveyId: 2,
            userId: 2,
            name: "Aloha"
        })

        lista.push({
            identificationNumber:"Asd",
            surveyId: 1,
            userId: 2,
            name: "Aloha"
        })

        return lista;
    }

}

export default SurveyService;