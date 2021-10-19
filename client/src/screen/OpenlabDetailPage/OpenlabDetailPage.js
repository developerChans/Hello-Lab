import { withRouter } from "react-router-dom";
import OpenlabBrief from "screen/OpenlabDetailPage/containers/OpenlabBrief";
import OpenlabInfo from "screen/OpenlabDetailPage/components/OpenlabInfo";
import RecruitmentInfo from "screen/OpenlabDetailPage/components/RecruitmentInfo";
import "screen/OpenlabDetailPage/styles/OpenlabDetailPage.css";
import OpenlabReply from "./containers/OpenlabReply";
const OpenlabDetailPage = () => {
  return (
    <div className="openlabDetailPage">
      <div>
        <OpenlabBrief />
        <RecruitmentInfo />
        <OpenlabInfo />
        <OpenlabReply />
      </div>
    </div>
  );
};

export default withRouter(OpenlabDetailPage);
