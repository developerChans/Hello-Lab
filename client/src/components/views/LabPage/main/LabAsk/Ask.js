import {useState} from 'react'
import axios from 'axios'
import Answer from './Answer'

const Ask = ({isWriter, lab, ask}) =>{
    const [editing, setEditing] = useState(false)
    const [editedAsk, setEditedAsk] = useState(ask.content)
    const [showAnswer, setShowAnswer] = useState(false)
    const [answers, setAnswers] = useState();
    const [answer, setAnswer] = useState();


    const toggleEditing = () =>{
        setEditing(prev => !prev)
    }
    const onChange = (event)=>{
        const {target:{value}} = event
        setEditedAsk(value)
    }
    const onSubmit = (event) =>{
        event.preventDefault()
        console.log(lab.id, ask.id)
        axios.patch(`/app/qna/${lab.id}/${ask.id}`, {content: editedAsk})
        window.location.reload()
    }

    const onDeleteClick = () =>{
        if (window.confirm("정말 지우시겠습니까?")) {
            axios.delete(`/app/qna/${lab.id}/${ask.id}`)
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
        axios.post(`/app/qna/${lab.id}/${ask.id}`, {content: answer})
        window.location.reload();
    }
    
    const onAnswerClick = ()=>{
        axios.get(`/app/qna/${lab.id}/${ask.id}`)
        .then(response=>{
          setAnswers(response.data)
    
        })
        setShowAnswer(prev=>!prev)
    }
    return (<>
    <div>{ask.writer}</div>
    <div>{ask.content}</div>
    {ask.image && <img src={ask.image} width="50px" height="50px"/>}
    <div>{ask.date}</div>
    {isWriter &&<>
    
    {editing ? (<>
    <form onSubmit={onSubmit}>
        <input type="text"
        onChange={onChange}
        value={editedAsk}
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
    <Answer lab={lab} ask={ask} isWriter={isWriter}/>
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
                <Answer ask={ask} answer={answer} lab={lab} isWriter={isWriter}/>
            </div>
        ))}
    </>):(
    <button onClick={onAnswerClick} >답글 보기</button>)}
    </>
    </>);
}
export default Ask;
