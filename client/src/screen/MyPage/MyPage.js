import { useEffect, useState } from "react";
import axios from "axios";
import 'screen/MyPage/styles/MyPage.css';
import MyPageLab from './components/MyPageLab'
import CreateLab from './components/CreateLab'

function MyPage() {

    const [lab, setLab] = useState();
    const [name, setName] = useState();
    const [userNum, setUserNum] = useState();
    const [major, setMajor] = useState();
    const [job, setJob] = useState();

    useEffect(()=>{
        axios.get('/app/users/auth')
        .then(response=>{
            const {data:{name, userNum, major, job}} = response
            setName(name)
            setUserNum(userNum)
            setMajor(major)
            setJob(job)
        })
    }, [])

    useEffect(()=>{
        axios.get('/app/mypage')
        .then(response=>{
            console.log(response)
            if(response.data[0]){
                const {id, name, pname} = response.data[0];
                setLab([{
                    id, name, pname
                }])

            }
        })
    }, [])

  return (
    <div className="wrap">
        <div id="container">
            <div id="profile">
                <img src=""/>
                <span>Name:{name}</span>
                <span>user number: {userNum}</span>
                <span>major: {major}</span>
            </div>
            <div id="my_lab">
                <h2><span>내 연구실</span></h2>
                {job && <CreateLab/>}
                <ul id="lab_list">
                    <MyPageLab job={job} lab={lab}/>
                </ul>
            </div>
        </div>
    </div>
    
  );
}


  
export default MyPage;
  
  