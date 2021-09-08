import { useHistory } from "react-router-dom";
import { useState } from 'react';

const LabNoticeList = ({labId, list})=>{
    const history = useHistory();
    const onClick = (section) =>{
        console.log(section)
        history.push(`/lab/${labId}/main/notice/${section.id}`)
    }
    return (
        <>
        {list && list.map((section)=>(
            <div onClick={()=>onClick(section)}>
                <li>{section.title}</li>
            </div>
        ))}
        </>
    );
}
export default LabNoticeList;