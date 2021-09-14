import {useState} from 'react'
import {axios} from 'axios'

const Ask = ({isWriter, lab, ask}) =>{
    const [editing, setEditing] = useState(false)
    const [editedAsk, setEditedAsk] = useState(ask.content)
    const toggleEditing = () =>{
        setEditing(prev => !prev)
    }
    const onChange = (event)=>{
        const {target:{value}} = event
    }
    const onSubmit = (event) =>{
        event.preventDefault()
        console.log(lab.id, ask.id)
        axios.patch(`/app/qna/${lab.id}/${ask.id}`, {content: editedAsk})
    }

    return (<>
    <div>{ask.writer}</div>
    <div>{ask.content}</div>
    {ask.image && <img src={ask.image} width="50px" height="50px"/>}
    <div>{ask.date}</div>
    {isWriter &&<>
    <button onClick={toggleEditing}>수정</button>
    {editing && <>
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
    <button onClick={toggleEditing}>취소</button></>
    }
    <button>삭제</button>
    </>}
    </>);
}
export default Ask;
