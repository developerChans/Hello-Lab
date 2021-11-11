import "screen/ProcessPage/styles/ProcessCard.css";

const cards = [
  {
    title: "11월 3주차: 발표",
    date: "2021.11.15",
    professor: "김승민",
    progress: ["1. 승용 발표", "2. 화이팅!!"],
    schedule: ["1. 개선작업", "2. 테스트 오픈", "3. 검수 및 오픈"],
  },
  {
    title: "11월 2주차: API 연결",
    date: "2021.11.8",
    professor: "김승민",
    progress: ["1. API연결"],
    schedule: ["1. 발표 ppt 준비", "2. 시연영상 콘티짜기"],
  },
  {
    title: "11월 1주차: 스토리보드 설계",
    date: "2021.11.1",
    professor: "김승민",
    progress: ["1. 스토리보드 설계", "2. 일정계획 정리"],
    schedule: ["1. 페이지 제작"],
  },
  {
    title: "10월 5주차: 우선순위 설정",
    date: "2021.10.25",
    professor: "김승민",
    progress: ["1. 우선순위 설정", "2. 소프트웨어 재정의", "3. 사용자 정의"],
    schedule: ["1. 페이지 설계", "필요한 기능 구현"],
  },
  {
    title: "10월 4주차: ERD 수정",
    date: "2021.10.18",
    professor: "김승민",
    progress: ["1. ERD 수정", "2. 프론트 컴포넌트 제작"],
    schedule: ["1. 테스트 데이터 조사", "2. 클라우드 서버 내 보안 규칙 수정"],
  },
];

const ProcessCard = () => {
  return (
    <>
      {cards.map((item) => (
        <div className="process-card">
          <div className="process-card-title">
            <span className="process-title-name">{item.title}</span>
            <br />
            <span className="process-title-professor">
              {item.professor} | {item.date}
            </span>
          </div>
          <div className="process-card-content">
            <div className="process-progress">
              <span style={{ fontWeight: "bold" }}>✔ 진행사항</span>
              {item.progress.map((item) => (
                <>
                  <br />
                  <span>{item}</span>
                </>
              ))}
            </div>
            <div className="process-schedule">
              <span style={{ fontWeight: "bold" }}>✔ 예정사항</span>
              {item.schedule.map((item) => (
                <>
                  <br />
                  <span>{item}</span>
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default ProcessCard;
