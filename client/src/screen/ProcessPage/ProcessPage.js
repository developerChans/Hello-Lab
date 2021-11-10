import { withRouter } from "react-router-dom";
import "screen/ProcessPage/styles/ProcessPage.css";
import ProcessCard from "screen/ProcessPage/components/ProcessCard";
import ProcessSort from "screen/ProcessPage/containers/ProcessSort";
const ProcessPage = () => {
  return (
    <div className="processPage">
      <div>
        <ProcessSort />
        <ProcessCard />
      </div>
    </div>
  );
};

export default withRouter(ProcessPage);
