import { useState, useEffect } from "react"
import axios from 'axios'

import LabAnswer from "screen/LabQnaPage/components/LabAnswer"

const LabQuestion = ({isWriter, lab, question}) =>{
    const [editing, setEditing] = useState(false)
    const [editedQuestion, setEditedQuestion] = useState(question.content)
    const [showAnswer, setShowAnswer] = useState(false)
    const [answers, setAnswers] = useState();
    const [answer, setAnswer] = useState();


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
    <div>{question.writer}</div>
    <div>{question.content}</div>
    {question.image && <img src={question.image} width="50px" height="50px"/>}
    <div>{question.date}</div>
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
    <button onClick={toggleEditing}>수정</button>
    <button onClick={onDeleteClick}>삭제</button></>)}
    <LabAnswer lab={lab} question={question} isWriter={isWriter}/>
    </>}

    <>
    <form onSubmit={onAnswerSubmit}>
        <input type="text" placeholder="내용을 입력해주세요." onChange={onAnswerChange} required/>
        <button type="submit">등록</button>
    </form>
    {showAnswer ? (<>
        <button onClick={toggleAnswer}>답글 숨기기</button>
        {answers && answers.map((answer)=>(
            <div key={answer.id}>
                {answer.id}
                <LabAnswer question={question} answer={answer} lab={lab} isWriter={isWriter}/>
            </div>
        ))}
    </>):(
    <button onClick={onAnswerClick} >답글 보기</button>)}
    </>
    </>);
}
export default LabQuestion;