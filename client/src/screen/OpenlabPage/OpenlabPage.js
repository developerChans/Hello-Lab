import { withRouter } from "react-router-dom";
import OpenlabHeader from "screen/OpenlabPage/containers/OpenlabHeader";
import OpenlabSort from "screen/OpenlabPage/containers/OpenlabSort";
import OpenlabFilters from 'screen/OpenlabPage/containers/OpenlabFilters'
const OpenlabPage = () =>{

    return(
        <div>
            <div className="openlab-container">
                <OpenlabHeader/>
                <OpenlabSort/>
                <OpenlabFilters/>
                <div className="openlab-card-container">
                    <div className="openlab-card">
                        <div className="openlab-card-title">
                            <span>경소톤 연구실</span>
                            <span>단꾸코 교수</span>
                        </div>
                        <span>모집 중</span>
                        <div className="openlab-card-content">
                            <span>소속학과</span>
                            <span>소프트웨어학과</span>
                            <span>소속학과</span>
                            <span>기계학습 딥러닝 이미지처리 IoT 헬스케어</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(OpenlabPage);