import { withRouter } from "react-router-dom";
import OpenlabHeader from "screen/OpenlabPage/containers/OpenlabHeader";
import OpenlabSort from "screen/OpenlabPage/containers/OpenlabSort";
import OpenlabFilters from 'screen/OpenlabPage/containers/OpenlabFilters'
import OpenlabCard from 'screen/OpenlabPage/components/OpenlabCard'

import 'screen/OpenlabPage/styles/OpenlabPage.css'

const OpenlabPage = () =>{

    return(
        <div>
            <div className="openlab-container">
                <OpenlabHeader/>
                <OpenlabSort/>
                <OpenlabFilters/>
                <div className="openlab-card-container"
                style={{
                    'zIndex':'-1'
                }}>
                    <OpenlabCard/>
                </div>
            </div>
        </div>
    );
}

export default withRouter(OpenlabPage);