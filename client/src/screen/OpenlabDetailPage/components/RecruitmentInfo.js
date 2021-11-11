import "screen/OpenlabDetailPage/styles/RecruitmentInfo.css";
const RecruitmentInfo = () => {
  const onApplyClick = () =>{
    window.location.href = `/apply/1`
  }
  return (
    <div className="recruitment-Info">
      <div className="recruitment-Info-title">
        <span>모집정보</span>
      </div>
      <hr />
      <div className="recruitment-Info-content">
        <p>✔ 모집기간</p>
        <p>상시모집</p>
        <p>✔ 모집인원</p>
        <p>0명</p>
        <p>✔ 활동안내</p>
        <p>
          - 공모전, 학술대회, 창업 등 다양한 활동에 제약없이 랩실 인원들과 함께
          참가 가능
        </p>
        <p>- 다양한 프로젝트를 진행할 수 있도록 환경 및 장비 제공</p>
        <p>(테스트용 기기 및 홀로렌즈, 개인자리 등)</p>
        <p>
          - 논문, s특허 출원 등 다양한 연구 활동과 관련한 지원 및 멘토링 진행
        </p>
        <p>✔ 우대사항</p>
        <p>- 정기적 세미나 참여 및 연구실 활동 가능한 학생</p>
        <p>- 한 가지 분야가 아닌 다양한 분야를 학습할 의지가 있는 학생</p>
        <p>- 성실하고 적극적인 태도로 자기주도 학습 및 협업할 수 있는 학생</p>
      </div>
      <div className="btn-position">
        <button className="apply-btn" onClick={onApplyClick}>
          연구실 지원하기
        </button>
      </div>
    </div>
  );
};
export default RecruitmentInfo;
