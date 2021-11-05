import { withRouter } from "react-router-dom";
import {FaCheck} from 'react-icons/fa';
import './styles/ApplyPage.css';
import { useEffect, useState } from "react";
import axios from "axios";

const ApplyPage = () =>{
     const [id, setId] = useState("");
     const [major, setMajor] = useState("");
     const [name, setName] = useState("");
     const [imageURL, setImageURL] = useState("");
     useEffect(()=> {
         axios.get('/app/lab/1/member')
             .then(response=>{

                 setId(id)
                 setMajor(major)
                 setName(name)
                 setImageURL(imageURL)
                 console.log(name)
             })
     },[])
    const test=(num)=>{
        console.log(num)
    }

    return(
        <div className = "total"z>
            <div className="apply">
                <div className="apply-title">
                    <div id="apply-main-title">
                        연구실 지원하기
                    </div>
                    <div id="apply-sub-title">
                        경소톤 연구실
                    </div>
                </div>
                <div className="apply-lab-info">
                    <div id = "lab-type">
                        <FaCheck size={26} color = "#000000" style={{
                        }}/> 담당 교수 : {name}
                    </div>
                    <div id = "lab-type">
                        <FaCheck size={26} color = "#000000" style={{
                        }}/> 소속학과 : 소프트웨어학과
                    </div>
                    <div id = "lab-type">
                        <FaCheck size={26} color = "#000000" style={{
                        }}/> 연구분야 : 기계학습,딥러닝,이미지처리,IoT,헬스케어
                    </div>
                </div>
                <div className="apply-info">
                    <div id="apply-info-title">지원정보</div>
                    <div className="apply-student-info">
                        <div id="apply-info-explanation">
                            - 지원자 기본 정보는 회원 정보가 입력됩니다. 회원 정보를 확인해주세요.
                        </div>
                        <div className = "apply-type">
                            <div>
                                <span className="apply-type-title"><FaCheck size={24} color = "#000000" style={{
                                }}/> 이름 </span>
                            </div>
                            <div>
                                 <span className="apply-type-title"><FaCheck size={24} color = "#000000" style={{
                                 }}/> 학과 </span>
                            </div>
                            <div>
                                 <span className="apply-type-title"><FaCheck size={24} color = "#000000" style={{
                                 }}/> 학번 </span>
                            </div>
                            <div>
                                 <span className="apply-type-title"><FaCheck size={24} color = "#000000" style={{
                                 }}/> 휴대폰번호 </span>
                            </div>
                            <div className="apply-student-content">
                                <span className="apply-type-title"><FaCheck size={24} color = "#000000" style={{
                                }}/> 하고 싶은 말 </span>
                                <form>
                                    <textarea
                                        id="apply-content-input"
                                    ></textarea>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="apply-btns" onClick={()=>test(1)}>지원하기</button>
            </div>
        </div>
    );
}

export default withRouter(ApplyPage);