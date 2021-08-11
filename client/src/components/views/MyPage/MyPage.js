import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import './MyPage.css';
<<<<<<< HEAD
import '../views.css';

const labs = [
    {
        id: 0,
        name: "운영체제",
        prof: "최종무",
        imgPath: '/img/solid/mint.png'
       },
    {
        id: 1,
        name: "보안",
        prof: "조성제",
        imgPath: '/img/solid/pink.png'
       },
    {
        id: 2,
        name: "모바일",
        prof: "어쩌고",
        imgPath: '/img/solid/yellow.png'
    }
];

function MyPage(props) {

    const onDashboardHandler = (event) => {
        console.log(event.target);
        props.history.push('/lab');
        // 실제 동작 시 lab 페이지로 정보 넘겨줘야 함
        // lab 페이지는 정보 받아서 해당 lab 페이지 출력해야 함
    }

  return (
    <div className="wrap">
        <div className="header">
            <h1>
                <a href="/">
                <div className="logo"></div>
                </a>
                <span className="page">Dashboard</span>
            </h1>
        </div>
        <div id="container">
            <div id="profile">
                <img src="https://static.nid.naver.com/images/web/user/default.png?type=s160"/>
                <p>User name</p>
            </div>
            <div id="my_lab">
                <h2><span>내 연구실</span></h2>
                <ul id="lab_list">
                    {labs.map((section, index) => (
                        <li>
                            <div onClick={onDashboardHandler} className="dashboard_card">
                                <img className="lab_img" src={section.imgPath}/>
                                <p className="lab_name">{section.name} 연구실</p>
                                <p className="prof">{section.prof} 교수</p>
                            </div>
                        </li>  
                    ))}
                </ul>
            </div>
        </div>
    </div>
=======

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
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
  );
}

export default withRouter(MyPage);
