import { withRouter } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./styles/ApplyPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ApplyPage = ({ lab }) => {
  const [applyInfo, setApplyInfo] = useState();

  useEffect(() => {
    axios.get(`/app/lab-apply/${lab.id}`).then((response) => {
      setApplyInfo(response.data);
      console.log(applyInfo);
    });
  }, []);
  const onApplyClick = () => {
    alert("지원이 완료되었습니다.");
    window.location.href = "/open";
  };
  return (
    <>
      {applyInfo && (
        <div className="total">
          <div className="apply">
            <div className="apply-title">
              <div id="apply-main-title">연구실 지원하기</div>
              <div id="apply-sub-title">경소톤 연구실</div>
            </div>
            <div className="apply-lab-info">
              <div id="lab-type">
                <FaCheck size={26} color="#000000" style={{}} /> 담당 교수 :{" "}
                {applyInfo.professorName}
              </div>
              <div id="lab-type">
                <FaCheck size={26} color="#000000" style={{}} /> 소속학과 :{" "}
                {applyInfo.labMajor}
              </div>
              <div id="lab-type">
                <FaCheck size={26} color="#000000" style={{}} /> 연구분야 :{" "}
                {applyInfo.field}
              </div>
            </div>
            <div className="apply-info">
              <div id="apply-info-title">지원정보</div>
              <div className="apply-student-info">
                <div id="apply-info-explanation">
                  - 지원자 기본 정보는 회원 정보가 입력됩니다. 회원 정보를
                  확인해주세요.
                </div>
                <div className="apply-type">
                  <div>
                    <span className="apply-type-title">
                      <FaCheck size={24} color="#000000" style={{}} /> 이름{" "}
                      {applyInfo.userName}
                    </span>
                  </div>
                  <div>
                    <span className="apply-type-title">
                      <FaCheck size={24} color="#000000" style={{}} /> 학과{" "}
                      {applyInfo.userMajor}
                    </span>
                  </div>
                  <div>
                    <span className="apply-type-title">
                      <FaCheck size={24} color="#000000" style={{}} /> 학번{" "}
                      {applyInfo.userNum}
                    </span>
                  </div>
                  <div>
                    <span className="apply-type-title">
                      <FaCheck size={24} color="#000000" style={{}} />{" "}
                      휴대폰번호 {applyInfo.userPhoneNum}
                    </span>
                  </div>
                  <div className="apply-student-content">
                    <span className="apply-type-title">
                      <FaCheck size={24} color="#000000" style={{}} /> 하고 싶은
                      말{" "}
                    </span>
                    <form>
                      <textarea id="apply-content-input"></textarea>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <button id="apply-btns" onClick={onApplyClick}>
              지원하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(ApplyPage);
