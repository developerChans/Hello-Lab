import axios from "axios";
import { useEffect, useState } from "react";

import LabNoticeEdit from 'screen/LabNoticePage/LabNoticeEdit'

import './style/noticeDetail.css'
import LabNoticeComments from "./LabNoticeComments";
const LabNoticeDetail = ({lab}) =>{
    // 댓글 만들자

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [content, setContent] = useState();
    const [job, setJob] = useState()

    const [editing, setEditing] = useState(false);

    const noticeId = window.location.pathname.split('/')[4]
    useEffect(()=>{
        axios.get(`/app/users/auth`)
        .then(response=>{
            const {data: {job}} = response
            setJob(job)
        })
    }, [])

    useEffect(()=>{
        axios.get(`/app/lab/${lab.id}/notices/${noticeId}`)
        .then(response => {
            const {data:{
                content, title, updatedAt
            }} = response;
            setTitle(title);
            setContent(content);
            setDate(updatedAt.split('T')[0])
        })
        console.log(title, content, date)
    }, [])

    const onEditClick = ()=>{
        setEditing(prev => !prev)
    }

    const onDeleteClick = ()=>{
        const confirm = window.confirm("정말 지우시겠습니까?")
        if (confirm){
            axios.delete(`/app/lab/${lab.id}/notices/${noticeId}`)
            window.location.reload()
        }
    }

    return(
        
    <div>
        {job && editing ? (<><LabNoticeEdit labId={lab.id} noticeId={noticeId} prevTitle={title} prevContent={content}/></>):(<>
        <div className="notice-detail-header">
        <div className="notice-detail-title">
            <span>{title}</span>
            <span style={{'fontSize':'12px', 'paddingLeft':'10px'}}>{date}</span>
        </div>
        </div>
        <div className="notice-detail-content">
            <div style={{'paddingBottom':'50px'}} dangerouslySetInnerHTML={ {__html: content} }></div>
            {job && <>
            <button className="notice-detail-edit" onClick={onEditClick}>수정</button>
            <button className="notice-detail-delete" onClick={onDeleteClick}>삭제</button></>}
        </div>
        <LabNoticeComments labId={lab.id} noticeId={noticeId}/>
        </>)}
    </div>);
}


export default LabNoticeDetail;