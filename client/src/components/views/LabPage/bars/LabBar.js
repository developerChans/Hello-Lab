import 'bootstrap/dist/css/bootstrap.css';
import './LabBar.css';
import {useState, useEffect} from 'react';

const pageInfo =[
    {
      tab: "소개",
      link: "info"
    },
    {
      tab: "공지",
      link: "notice"
    },
    {
      tab: "일정",
      link: "calendar"
    },
    {
      tab: "연구",
      link: "project"
    },
    
    {
      tab: "질문",
      link: "ask"
    },
    {
      tab: "세션",
      link: "session"
    }
  ]

const LabBar = (lab) =>{

    useEffect(()=>{
      const tabFrame = document.querySelector("#frame");

      if(!localStorage.getItem('tab')){
        localStorage.setItem('tab', 'info');
      }
      const storedTab = localStorage.getItem('tab');
      tabFrame.src = `/lab/${lab.id}/${storedTab}`;
    }, [])

    const onTabClick = (section) =>{
      const tabFrame = document.querySelector("#frame");

      tabFrame.src = `/lab/${lab.id}/${section.link}`;
      localStorage.setItem('tab', section.link); 
    }

    return (
        <div id="content">
            <nav id="lab-bar" className="navbar">
                <ul id="lab-ul" className="navbar-nav">
                    {pageInfo.map((section, index)=>(
                        <button id="btn" key={index} className="tab nav-item" onClick={() => onTabClick(section)} type="button">
                            <span className="nav-item tab-link nav-link">
                              {section.tab}
                            </span>
                        </button>
                    ))}
                </ul>
            </nav>
            <iframe id="frame"></iframe>
        </div>
    );
}

export default LabBar;