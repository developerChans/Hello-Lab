import ReportForm from "screen/ReportPage/components/ReportForm";
import "screen/ReportPage/styles/ReportPage.css";

function ReportPage() {
  return (
    <div className="report-container">
      <div id="projectDetail">
        <span id="reportTime">11월 2주차 리포트 |</span>
        <span id="deadline"> 제출마감일: 2021년 11월 20일</span>
      </div>
      <ReportForm />
    </div>
  );
}

export default ReportPage;
