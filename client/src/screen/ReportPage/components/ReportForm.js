import "screen/ReportPage/styles/ReportForm.css";
import { useState } from "react";

function TotalReport() {
  const [report, setReport] = useState("");
  const [discussion, setDiscussiont] = useState("");
  const [submit, setSubmit] = useState(false)
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
    setSubmit(true)
  };

  return (
    <>
    {!submit ? (<div id="report-body">
      <div>
        <span id="report-title">제목</span>
        <input id="report-title-input"/>
      </div>
      <div>
        <span id="report">✔ 보고 사항</span>
        <textarea
          id="reportInput"
          onChange={(event) => reportChange(event)}
        ></textarea>
        <input className="report-file" type="file"/>
      </div>
      
      <div>
        <span id="discussion">✔ 논의 사항</span>
        <textarea
          id="discussionInput"
          onChange={(event) => discussionSave(event)}
        ></textarea>
        <input className="discussion-file" type="file"/>

      </div>
      <button id="submit-Button" onClick={clickSubmit}>
        제출
      </button>
    </div>):(
      <div style={{'fontSize':'22pt'}}>
        제출이 완료되었습니다.
      </div>
    )}
    </>
  );
}

export default TotalReport;
