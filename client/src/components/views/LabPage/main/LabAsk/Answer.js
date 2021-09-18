import axios from 'axios'
import {useState} from 'react'

const Answer = ({ask, answer, lab, isWriter}) =>{



    const [editing, setEditing] = useState(false)
    const [editedAnswer, setEditedAnswer] = useState()

    const onEditChange = (event)=>{
        const {target:{value}} = event
        setEditedAnswer(value)
        console.log(editedAnswer)
    }
    const onEditSubmit = (event, answerId) =>{
        event.preventDefault()
        console.log(event)
        axios.patch(`/app/qna/${lab.id}/${answerId}`, {content: editedAnswer})
        window.location.reload()
    }


    const toggleEditing = () =>{
        setEditing(prev => !prev)
    }
    const onDeleteClick = (answerId) =>{
        if (window.confirm("정말 지우시겠습니까?")) {
            axios.delete(`/app/qna/${lab.id}/${answerId}`)
            window.location.reload()
        }
    }
    return (<>
        {ask.id===answer.parentId &&<>
            <div>{answer.writer}</div>
            <div>{answer.content}</div>
            {answer.image && <img src={answer.image}/>}
            <div>{answer.date}</div>
            {isWriter && editing ? (<>
                <form onSubmit={(event)=>onEditSubmit(event, answer.id)}>
                <input type="text"
                onChange={onEditChange}
                value={editedAnswer}
                required
                />
                <input type="submit"
                value="저장"
                />
                </form>
                <button onClick={toggleEditing}>취소</button>
            </>):(<>
        <button onClick={toggleEditing}>수정</button>
        <button onClick={()=>onDeleteClick(answer.id)}>삭제</button>
        </>)}
        </>}
    </>);
}

export default Answer;

