import OpenlabInfo from "screen/OpenlabDetailPage/components/OpenlabInfo";
import RecruitmentInfo from "screen/OpenlabDetailPage/components/RecruitmentInfo";
import "screen/OpenlabDetailPage/styles/OpenlabDetailInfo.css";

const OpenlabDetailInfo = () => {
  return (
    <div class="openlabDetailInfo">
      <RecruitmentInfo />
      <OpenlabInfo />
    </div>
  );
};
export default OpenlabDetailInfo;
