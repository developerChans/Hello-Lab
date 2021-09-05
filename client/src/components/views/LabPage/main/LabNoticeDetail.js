import axios from "axios";
import { useEffect, useState } from "react";

import {useLocation} from 'react-router-dom';

const LabNoticeDetail = ({labId}) =>{
    // 댓글 만들자

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    useEffect(()=>{
        axios.get(`/app/lab/${labId}/notices/1`)
        .then(response => {
            const {data:{
                content, title
            }} = response;
            console.log(response)
            setTitle(title);
            setContent(content);
        })
    }, [])

    return(
    <div>
        <div>{title}</div>
        <div dangerouslySetInnerHTML={ {__html: content} }></div>
    </div>);
}


export default LabNoticeDetail;