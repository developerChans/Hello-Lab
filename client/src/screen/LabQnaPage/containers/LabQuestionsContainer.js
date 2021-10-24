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
    
    return(<div>
        <div>
          {questions && questions.map((question)=>(
            <div key={question.id}>
              <LabQuestion isWriter={isWriter} lab={lab} question={question}/>
            </div>
          ))}
        </div>
    </div>)
}
export default LabQuestionsContainer;