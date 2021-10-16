import { withRouter } from "react-router-dom";
import OpenlabHeader from "screen/OpenlabPage/containers/OpenlabHeader";
import OpenlabBrief from "screen/OpenlabDetailPage/containers/OpenlabBrief";
import OpenlabDetailInfo from "screen/OpenlabDetailPage/containers/OpenlabDetailInfo";
import "screen/OpenlabDetailPage/styles/OpenlabDetailPage.css";
const OpenlabDetailPage = () => {
  return (
    <div className="openlabDetailPage">
      <div>
        <OpenlabHeader />
        <OpenlabBrief />
        <OpenlabDetailInfo />
      </div>
    </div>
  );
};

export default withRouter(OpenlabDetailPage);
