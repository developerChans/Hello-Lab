import "/screen/ReportPage/styles/ReportForm.css";
import { useState } from "react";

function TotalReport() {
  const [report, setReport] = useState("");
  const [discussion, setDiscussiont] = useState("");

  const reportChange = (event) => {
    const {
      target: { value },
    } = event;
    setReport(value);
  };

  const discussionSave = (event) => {
    const {
      target: { value },
    } = event;
    setDiscussiont(value);
  };

  const clickSubmit = () => {
    console.log("버튼 클릭");
    console.log({ report });
    console.log({ discussion });
  };

  return (
    <div id="body">
      <span id="title">제목</span>{" "}
      <span id="reportLimit">9월 5주차 리포트</span>
      <hr id="line" />
      <div>
        <span id="report">✔ 보고 사항</span>
        <textarea
          id="reportInput"
          onChange={(event) => reportChange(event)}
        ></textarea>
      </div>
      <div>
        <span id="discussion">✔ 논의 사항</span>
        <textarea
          id="discussionInput"
          onChange={(event) => discussionSave(event)}
        ></textarea>
      </div>
      <button id="submit-Button" onClick={clickSubmit}>
        제출
      </button>
    </div>
  );
}

export default TotalReport;
