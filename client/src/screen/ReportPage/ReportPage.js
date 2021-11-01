import ReportForm from "screen/ReportPage/components/ReportForm";
import "screen/ReportPage/styles/ReportPage.css";

function ReportPage() {
  return (
    <div className="report-container">
      <div id="projectDetail">
        <span id="reportTime">9월 5주차 리포트 |</span>
        <span id="deadline"> 제출마감일: 2021년 10월 31일</span>
      </div>
      <ReportForm />
    </div>
  );
}

export default ReportPage;
