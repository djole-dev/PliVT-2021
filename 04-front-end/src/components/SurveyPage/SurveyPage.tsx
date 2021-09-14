import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import SurveyCard from '../SurveyCard/SurveyCard';

interface Survey{
    name: string,
    surveyId: number,
}
function SurveyPage() {
    const [surveys, setSurveys]= useState <any>();

    useEffect(() => {
         axios({
            method: "get",
            baseURL: "http://localhost:4080",
            url:"/surveys",
            timeout: 10000,
            headers:{
                Authorization: "Bearer FAKE-TOKEN"
            },
            withCredentials:true,
            maxRedirects: 0,
        })
        .then(res=> {
            if(!Array.isArray(res.data)){
                throw new Error ("Invalid data received.");
            }
            console.log(res.data);
            setSurveys(res.data);
        })
        .catch(err => {
            const errorMessage = " "+ err;
        }
        )
    }, [])


    const renderSurveys = surveys?.map((s: Survey)=>{
        
        return <SurveyCard key={s.surveyId} name={s.name} surveyId={s.surveyId}/>
    })


    
    return (

        <div className='survey_page'>
        <div className='survey_left'>
          
  
          <div>
            <h3>Hello,</h3>
            <h2 className='survey_title'>Your surveys are here</h2>
              {renderSurveys}
          </div>
        </div>
        </div>

    )
}

export default SurveyPage


