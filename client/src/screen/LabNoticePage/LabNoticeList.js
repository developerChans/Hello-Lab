import { useHistory } from "react-router-dom";
import { useState } from 'react';

import './style/noticeList.css'

const LabNoticeList = ({labId, list})=>{
    const history = useHistory();
    const onClick = (section) =>{
        history.push(`/lab/${labId}/notice/${section.id}`)
    }
    console.log(list)
    return (
        <>
        {list && list.map((section)=>(
            <div className="notice-list-title">
                <div className="notices" onClick={()=>onClick(section)}>{section.title}</div>
                <div style={{'fontSize':'12px', 'paddingTop':'5px', 'color':'gray'}}>{section.createdAt.split('T')[0]}</div>
            </div>
        ))}
        </>
    );
}
export default LabNoticeList;