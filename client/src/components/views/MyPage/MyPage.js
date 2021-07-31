import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import './MyPage.css';

function MyPage() {

  return (
    <div id="wrap">
    <div id="header">
        <h1>
            <span>DK.Lab</span>
            <span>My Page</span>
        </h1>
    </div>
    <div id="container">
        <div id="profile">
            <img src="https://static.nid.naver.com/images/web/user/default.png?type=s160"/>
            <p>User name</p>
        </div>
        <div id="my_lab">
            <h2>내 연구실</h2>
            <ul id="lab_list">
                <li>
                    <a href="https://www.google.com/" class="dashboard_link">
                        <div class="dashboard_card">
                            <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAyMjdfMTAw/MDAxNTE5NzIxMDI1MDI5.tLRd3Ij8UO3B0u8jS6RhipagzEcRp-YNUYbmflkLrZsg.ZzcfBQqG4VI_Y6g0aEcUIsbpEDk0f4Jk2G7h7olVGskg.PNG.osy2201/9_%EC%97%B0%ED%95%9C_%EB%B0%94%EB%8B%A4%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4.png?type=w800" class="lab_img"/>
                            <p>OO 연구실</p>
                            <p>OOO 교수</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
  );
}

export default withRouter(MyPage);
