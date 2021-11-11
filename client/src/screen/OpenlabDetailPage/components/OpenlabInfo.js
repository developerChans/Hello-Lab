import "screen/OpenlabDetailPage/styles/OpenlabInfo.css";
const OpenlabInfo = () => {
  return (
    <div className="openlab-Info">
      <div className="openlab-Info-title">
        <span>상세정보</span>
      </div>
      <hr />
      <div className="openlab-Info-content">
        <p>✔ 소개</p>
        <p>
          플랫폼 아키텍쳐 및 인공지능 기반의 맞춤형 추천 서비스 플랫폼에 대해
          연구하는 경소톤 연구실입니다.
        </p>
        <p>✔ 진행 중 연구</p>
        <p>**글로벌 인재 양성 사업**</p>
        <p>(AR Glass를 활용한 AI 기반의 항공 비행 경로 추천)</p>
        <p>✔ 히스토리</p>
        <p>"SW StarLab.", Sponsored by IITP</p>
        <p>"클라우드 환경에서 ZNS SSD 최적화", Sponsored by SK하이닉스</p>
        <p>
          "키-밸류 저장소와 SSD의 수직 최적화를 위한 통합적 접근 방법",
          Sponsored by 한국연구재단
        </p>
        <p>
          "Open-Channel SSD 기반 Data Center Storage System 최적화 연구",
          Sponsored by SK하이닉스
        </p>
        <p>"가상화 기반 NV-Drive 검증시스템 고도화 개발", Sponsored by SKT</p>
        <p>
          "마이크로아키텍처 간섭인지 기반 통합자원관리를 위한 운영체제 및
          하이퍼바이저연구", Sponsored by 한국연구재단
        </p>
        <p>
          "1,000Cores 이상 Scale Out 가능한 클러스터 데이터베이스 플랫폼 개발",
          Sponsored by 정보통신산업진흥원
        </p>
        <p>✔ 교수 정보</p>
        {/* <p>- 단국대학교 석·박사 졸업</p>
        <p>- LA 학술대회 참가</p> */}
        <ul>
          <li>단국대학교 석·박사 졸업</li>
          <li>단국대학교 소프트웨어학과 교수</li>
          <li>LA 학술대회 참가</li>
          <li>경소톤 대상(희망사항)</li>
          <li>2019~ 국가 지원 연구 참여</li>
          <li>SK 신기술 자문 위원회</li>
        </ul>
      </div>
    </div>
  );
};
export default OpenlabInfo;
