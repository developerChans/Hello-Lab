import LabQuestion from "../components/LabQuestion";
import { useState, useEffect } from "react";
import axios from 'axios'
const LabQuestionsContainer = ({lab}) =>{
    const [questions, setQuestions] = useState();
    const [isWriter, setIsWriter] = useState(true);

    useEffect(()=>{
        axios.get(`/app/qna/${lab.id}`)
        .then(response => {
          setQuestions(response.data)
        })
      }, [])
    
    return(
    <div className="questions-container"
    style={{
      'width': '900px',
      'left': '100px',
      'height': 'maxContent',
      'top': '280px',
      'position': 'absolute',
    }}>
      {questions && questions.map((question)=>(
        <div key={question.id}>
          <LabQuestion isWriter={isWriter} lab={lab} question={question}/>
        </div>
      ))}
    </div>
    )
}
export default LabQuestionsContainer;