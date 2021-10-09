import axios from "axios";
import { useEffect, useState } from "react";

import './style/noticeDetail.css'
const LabNoticeDetail = ({labId}) =>{
    // 댓글 만들자

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [content, setContent] = useState();

    const [editing, setEditing] = useState(false);

    const noticeId = window.location.pathname.split('/')[5]


    useEffect(()=>{
        axios.get(`/app/lab/${labId}/notices/${noticeId}`)
        .then(response => {
            const {data:{
                content, title, updatedAt
            }} = response;
            console.log(response)
            setTitle(title);
            setContent(content);
            setDate(updatedAt.split('T')[0])
        })
    }, [])

    const onEditClick = ()=>{
        setEditing(prev => !prev)
    }

    const onDeleteClick = ()=>{
        const confirm = window.confirm("정말 지우시겠습니까?")
        if (confirm){
            axios.delete(`/app/lab/${labId}/notices/${noticeId}`)
            window.location.reload()
        }
    }

    return(
        
    <div>
        {editing ? (<></>):(<>
        <div className="notice-detail-header">
        <div className="notice-detail-title">
            <span>{title}</span>
            <span style={{'fontSize':'12px', 'paddingLeft':'10px'}}>{date}</span>
        </div>
        </div>
        <div className="notice-detail-content">
            <div style={{'paddingBottom':'50px'}} dangerouslySetInnerHTML={ {__html: content} }></div>
            <button className="notice-detail-edit" onClick={onEditClick}>수정</button>
            <button className="notice-detail-delete" onClick={onDeleteClick}>삭제</button>
        </div>
        </>)}
    </div>);
}


export default LabNoticeDetail;