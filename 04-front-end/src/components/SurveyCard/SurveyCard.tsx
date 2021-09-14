import React, { useState } from 'react';
import "./SurveyCard.css";
import { Link } from "react-router-dom";
import axios from 'axios';

interface Survey{
    name: string,
    surveyId: number,
}


function SurveyCard ({name, surveyId}: Survey) {

   
   
    return (
        <div className="survey">
            <div className="survey_info">
                <p className="survey_title">{name}</p>
                <Link to="/questions">
                     <button className="buttonBlue" >View survey</button>
                </Link>
                
            </div>
        </div>
    )
}

export default SurveyCard;

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
