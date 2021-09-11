import { connect } from "react-redux";


import {Route} from 'react-router-dom'
import LabNoticeDetail from './LabNoticeDetail'
import LabNoticeForm from './LabNoticeForm'

import '../style/notice.css'

import {useState, useEffect} from 'react';
import axios from 'axios';
import LabNoticeList from "./LabNoticeList";

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




    const onToggleWriting = ()=>{
        setToggleWriting(prev=>!prev);
    }

    return (
        <div>
            {isProfessor && toggleWriting? 
            <>
            <LabNoticeForm id={id}/>
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

  
export default LabNotice;
