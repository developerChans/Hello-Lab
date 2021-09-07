import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, withRouter } from 'react-router-dom';
import './MyPage.css';
import '../views.css';
import { actionCreators } from "_actions/lab_action";
import {connect} from 'react-redux';

import MyPageLab from './MyPageLab'

function MyPage({data, replaceLab}) {
    
    const [lab, setLab] = useState();


    useEffect(()=>{
        axios.get('/app/mypage')
        .then(response=>{
            const {id, name, pname} = response.data[0];
            setLab({
                id, name, pname
            })
        })
    }, [])


  return (
    <div className="wrap">
        <div id="container">
            <div id="profile">
                <img src=""/>
                <span>Name</span>
                <span>Student Number</span>
                <span>Email</span>
            </div>
            <div id="my_lab">
                <h2><span>내 연구실</span></h2>
                <ul id="lab_list">
                    <MyPageLab lab={lab}/>
                </ul>
            </div>
        </div>
    </div>
    
  );
}

const mapStateToProps = (state)=>{
    return{data: state}
}

const mapDispatchToProps = (dispatch) =>{
    return {
      replaceLab: (lab) => dispatch(actionCreators.replaceLab(lab))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (MyPage);
  
  