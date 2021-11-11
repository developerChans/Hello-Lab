import "screen/ProcessPage/styles/ProcessCard.css";

const cards = [
  {
    title: "10월 2주차: Add Pages",
    date: "2021.10.18",
    professor: "단꾸코",
    progress: "1. ERD 수정",
    schedule: "1. 프론트 컴포넌트 제작",
  },
  {
    title: "10월 2주차: Add Pages",
    date: "2021.10.18",
    professor: "단꾸코",
    progress: "1. ERD 수정",
    schedule: "1. 프론트 컴포넌트 제작",
  },
  {
    title: "10월 2주차: Add Pages",
    date: "2021.10.18",
    professor: "단꾸코",
    progress: "1. ERD 수정",
    schedule: "1. 프론트 컴포넌트 제작",
  },
  {
    title: "10월 2주차: Add Pages",
    date: "2021.10.18",
    professor: "단꾸코",
    progress: "1. ERD 수정",
    schedule: "1. 프론트 컴포넌트 제작",
  },
  {
    title: "10월 2주차: Add Pages",
    date: "2021.10.18",
    professor: "단꾸코",
    progress: "1. ERD 수정",
    schedule: "1. 프론트 컴포넌트 제작",
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
              <span>{item.progress}</span>
            </div>
            <div className="process-schedule">
              <span style={{ fontWeight: "bold" }}>✔ 예정사항</span>
              <span>{item.schedule}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default ProcessCard;
