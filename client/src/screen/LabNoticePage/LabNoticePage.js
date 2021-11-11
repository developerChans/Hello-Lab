import {Route} from 'react-router-dom'
import LabNoticeDetail from './LabNoticeDetail'
import LabNoticeForm from './LabNoticeForm'

import './style/notice.css'

import {useState, useEffect} from 'react';
import axios from 'axios';
import LabNoticeList from "./LabNoticeList";

const LabNoticePage = ({lab}) =>{

    const [list, setList] = useState();
    const [toggleWriting, setToggleWriting] = useState(false);

    useEffect(()=>{
        axios.get(`/app/lab/${lab.id}/notices`)
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
            <div id="notice-headline">
                <h3 id="notice-headline-txt">연구실 공지</h3>
            </div>
            
            {toggleWriting? 
            <div>
            {lab && <LabNoticeForm id={lab.id}/>}
            <button className="notice-writing-cancel" onClick={onToggleWriting}>취소</button>
            </div>:
            <div>
                <button id="notice-writing-btn" onClick={onToggleWriting}>글쓰기</button>
                <div style={{"position":"absolute"}}>
                    <ul className="notice-list">
                    {lab && <LabNoticeList labId={lab.id} list={list}/>}
                    </ul>
                </div>
            </div>}
            

        </div>
    );
}

  
export default LabNoticePage;
