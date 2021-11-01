import { useState, useEffect } from "react"
import axios from 'axios'

import LabAnswer from "screen/LabQnaPage/components/LabAnswer"
import 'screen/LabQnaPage/styles/LabQuestion.css'
const LabQuestion = ({isWriter, lab, question}) =>{
    const [editing, setEditing] = useState(false)
    const [editedQuestion, setEditedQuestion] = useState(question.content)
    const [showAnswer, setShowAnswer] = useState(false)
    const [answers, setAnswers] = useState();
    const [answer, setAnswer] = useState();


    console.log(answer)

    const toggleEditing = () =>{
        setEditing(prev => !prev)
    }
    const onChange = (event)=>{
        const {target:{value}} = event
        setEditedQuestion(value)
    }
    const onSubmit = (event) =>{
        event.preventDefault()
        console.log(lab.id, question.id)
        axios.patch(`/app/qna/${lab.id}/${question.id}`, {content: editedQuestion})
        window.location.reload()
    }

    const onDeleteClick = () =>{
        if (window.confirm("정말 지우시겠습니까?")) {
            axios.delete(`/app/qna/${lab.id}/${question.id}`)
            window.location.reload()
        }
    }      
    
    const toggleAnswer = () =>{
        setShowAnswer(prev=>!prev)
    }

    const onAnswerChange = (event)=>{
        const {target: {value}} = event;
        setAnswer(value);
      }
    const onAnswerSubmit = (event)=>{
        event.preventDefault();
        axios.post(`/app/qna/${lab.id}/${question.id}`, {content: answer})
        window.location.reload();
    }
    
    const onAnswerClick = ()=>{
        axios.get(`/app/qna/${lab.id}/${question.id}`)
        .then(response=>{
          setAnswers(response.data)
    
        })
        setShowAnswer(prev=>!prev)
    }
    return (<>
    <div className="question-box">
        <span className="question-box-name">{question.name}</span>
        <span className="question-box-date">{question.updatedAt.split('T')[0]}</span>
        <div className="question-box-content">{question.content}</div>
        {question.image && <img src={question.image} width="50px" height="50px"/>}
    </div>    
    {isWriter &&<>
    
    {editing ? (<>
    <form onSubmit={onSubmit}>
        <input type="text"
        onChange={onChange}
        value={editedQuestion}
        required
        />
        <input type="submit"
        value="저장"
        />
    </form>
    <button onClick={toggleEditing}>취소</button>
    </>):(<>
    <button className="question-box-edit" onClick={toggleEditing}>수정</button>
    <button className="question-box-delete" onClick={onDeleteClick}>삭제</button></>)}
    <LabAnswer lab={lab} question={question} isWriter={isWriter}/>
    </>}

    <>

    {showAnswer ? (<>
        <button className="question-toggle-answer-btn" onClick={toggleAnswer}>💬답글 숨기기</button>
        <form className="question-answer-form" onSubmit={onAnswerSubmit}>
            <textarea className="question-answer-input" type="text" placeholder="내용을 입력해주세요." onChange={onAnswerChange} required/>
            <button className="question-answer-submit" type="submit">답글 등록</button>
        </form>
        {answers && answers.map((answer)=>(
            answer.parentId === question.id && (<div key={answer.id}>
                <LabAnswer answer={answer}/>
            </div>)
        ))}
    </>):(
    <button className="question-toggle-answer-btn" onClick={onAnswerClick} >💬답글 보기</button>)}
    </>
    </>);
}
export default LabQuestion;