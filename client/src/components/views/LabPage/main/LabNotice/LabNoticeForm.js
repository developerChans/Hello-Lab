
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {useState} from 'react'
import axios from 'axios'

const LabNoticeForm = ({id}) =>{
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const onTitleChange = (event)=>{
        const {target:{value}} = event;
        setTitle(value);
    }
    const onContentChange = (event, editor) =>{
        const data = editor.getData();
        setContent(data);
    }
    const onClick = () =>{
        // 데이터 보내기
        const noticeBody = {
            title,
            content,
            labId: id
        }
        axios.post(`/app/lab/${id}/notices`, noticeBody)
        .then(response => console.log(response))
    }

    return(<>
        <input className="title-input" 
            type="text" 
            placeholder="제목"
            onChange={onTitleChange}
            value={title}
            required
            />
        <div className="form-wrapper">  
            <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor)=>onContentChange(event, editor)}
            />
            <button onClick={onClick} className="submit-button">저장</button>
        </div></>)
}

export default LabNoticeForm;