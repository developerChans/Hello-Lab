
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {useState, useEffect} from 'react'
import axios from 'axios'

import './style/noticeForm.css'

const LabNoticeForm = ({id}) =>{
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(()=>{
        axios.get('/app/users/auth')
        .then(response=>{
            console.log(response)
        })
    }, [])
    
    const onTitleChange = (event)=>{
        const {target:{value}} = event;
        setTitle(value);
        console.log(title)
    }
    const onContentChange = (event, editor) =>{
        const data = editor.getData();
        setContent(data);
        console.log(content)
    }
    const onClick = () =>{
        // 데이터 보내기
        const noticeBody = {
            title,
            content,
            labId: id
        }
        console.log(noticeBody)
        axios.post(`/app/lab/${id}/notices`, noticeBody)
        window.location.reload()
    }

    return(<>
        <input className="notice-title-input" 
            type="text" 
            placeholder="제목"
            onChange={onTitleChange}
            value={title}
            required
        />
        <CKEditor 
        id="notice-editor"
        editor={ClassicEditor}
        onChange={(event, editor)=>onContentChange(event, editor)}
        />
        <button onClick={onClick} className="notice-submit-btn">저장</button>
        </>)
}

export default LabNoticeForm;