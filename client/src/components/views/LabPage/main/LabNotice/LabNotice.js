import {Route} from 'react-router-dom'
import LabNoticeDetail from './LabNoticeDetail'
import LabNoticeForm from './LabNoticeForm'

import './style/notice.css'

import {useState, useEffect} from 'react';
import axios from 'axios';
import LabNoticeList from "./LabNoticeList";

const LabNotice = ({job, data}) =>{

    const [list, setList] = useState();
    const [toggleWriting, setToggleWriting] = useState(false);

    const {lab: {
        id
      }} = data;

    useEffect(()=>{
        axios.get(`/app/lab/${id}/notices`)
        .then(response => {
            console.log(response)
            setList(response.data)
        })
    }, [])

    const onToggleWriting = ()=>{
        setToggleWriting(prev=>!prev);
        console.log(toggleWriting)
    }

    return (
        <div>
            <div style={{
                'position': 'fixed',
                'width': '850px',
                'height': '100px',
                'left': '300px',
                'top': '149px',
                'background':'white',
                'zIndex':'9'
            }}>
                <div id="notice-headline">
                    <h3 id="notice-headline-txt">연구실 공지</h3>
                </div>
            </div>
            {job && toggleWriting? 
            <div>
            <LabNoticeForm id={id}/>
            <button className="notice-writing-cancel" onClick={onToggleWriting}>취소</button>
            </div>:
            <div>
            <button id="notice-writing-btn" onClick={onToggleWriting}>글쓰기</button>
            </div>}
            <div style={{"position":"absolute", "left":"200px"}}>
                <ul className="notice-list">
                <LabNoticeList labId={id} list={list}/>
                </ul>
            </div>

        </div>
    );
}

  
export default LabNotice;
