import { withRouter } from "react-router-dom";
import OpenlabHeader from "./containers/OpenlabHeader";

const OpenlabPage = () =>{

    return(
        <div>
            <div className="openlab-container">
                <OpenlabHeader/>
                <div className="openlab-sort">
                    정렬기준
                    <button>가나다순</button>
                    <button>업데이트순</button>
                </div>
                <div className="openlab-filters-container">
                    <div className="openlab-search">
                        검색
                        <form>
                            <input type="text"/>
                            <button type="submit">(icon)검색</button>
                        </form>
                    </div>
                    <div className="openlab-filter">
                        필터링
                        <label for="openlab-check-recruiting">
                            <input name="openlab-check-recruiting" type="checkbox"/>
                            모집 중인 연구실만
                        </label>
                        <select name="department">
                            <option>학과</option>
                        </select>
                        <label for="software">
                            <input type="checkbox" id="software"/> 소프트웨어학과
                        </label>
                        <label for="computer">
                            <input type="checkbox" id="computer"/> 컴퓨터공학과
                        </label>
                        <label for="mobile">
                            <input type="checkbox" id="mobile"/> 모바일시스템공학과
                        </label>
                        <label for="security">
                            <input type="checkbox" id="security"/> 산업보안학과
                        </label>
                        <label for="statics">
                            <input type="checkbox" id="statics"/> 정보통계학과
                        </label>
                        <div className="openlab-department-selected">
                        </div>
                    </div>
                </div>
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