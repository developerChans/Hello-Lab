import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
<<<<<<< HEAD
import '../views.css';
import useTabs from './useTabs'

const lab = 
  {
      name: "운영체제",
      prof: "최종무",
  }
const pageInfo =[
  {
    tab: "소개",
    content: "운영체제 연구실입니다"
  },
  {
    tab: "공지",
    content: "공지사항 게시판입니다"
  },
  {
    tab: "일정",
    content: "달력을 넣습니다"
  },
  {
    tab: "연구",
    content: "연구를 진행합니다"
  },
  
  {
    tab: "질문",
    content: "질문게시판입니다"
  },
  {
    tab: "세션",
    content: "세션이 올라옵니다"
  },

  {
    tab: "멤버",
    content: "구성원 정보입니다"
  },
  
  {
    tab: "그룹",
    content: "그룹입니다"
  },
  {
    tab: "과제 및 설문",
    content: "과제/설문입니다"
  }
]
function LabPage() {
  const {currentItem, changeItem} = useTabs(0, pageInfo);
  return (
    <div className="wrap">
      <div className="header">
        <h1>
            <a href="/">
            <div className="logo"></div>
            </a>
        </h1>
      </div>
      <h1>{lab.name} 연구실</h1>
      <div id="lab_tabs">
        {pageInfo.map((section, index) =>(
          <button onClick={()=>changeItem(index)}>
            {section.tab}
          </button>
        ))}
        <div>{currentItem.content}</div>
      </div>
    </div>
  );
=======

function LabPage() {

  return <div>LabPage 내 연구실 중 하나 들어갔을 때</div>;
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
}

export default withRouter(LabPage);
