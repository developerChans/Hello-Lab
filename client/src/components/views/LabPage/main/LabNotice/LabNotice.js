import { connect } from "react-redux";


import {Route} from 'react-router-dom'
import LabNoticeDetail from './LabNoticeDetail'
import LabNoticeForm from './LabNoticeForm'

import './style/notice.css'

import {useState, useEffect} from 'react';
import axios from 'axios';
import LabNoticeList from "./LabNoticeList";
import LabNoticeForm from "./LabNoticeForm";

const LabNotice = ({data, isProfessor}) =>{

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

    const onToggleWriting = ()=>{
        setToggleWriting(prev=>!prev);
    }

    return (
        <div>
            {isProfessor && toggleWriting? 
            <>
            <LabNoticeForm/>
            <button onClick={onClick} className="submit-button">저장</button>
            <button onClick={onToggleWriting}>취소</button>
            </>:
            <>
            <button onClick={onToggleWriting}>글쓰기</button>
            <div>
                <ul className="notice-list">
                <LabNoticeList labId={id} list={list}/>
                </ul>
            </div>
            </>}
        <Route path='/lab/:id/main/notice/:id'><LabNoticeDetail labId={id}/></Route>

        </div>
    );
}

const mapStateToProps = (state)=>{
    return {data: state};
  }
  
export default connect(mapStateToProps)(LabNotice);
