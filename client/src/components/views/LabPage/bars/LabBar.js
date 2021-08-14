import 'bootstrap/dist/css/bootstrap.css';
import './LabBar.css';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const onTabHandler = (section) =>{
      history.push({
        pathname: `/lab/${lab.id}/${section.link}`
      })
    }
    return (
        <div id="content">
            <nav id="lab-bar" className="navbar">
                <ul id="lab-ul" className="navbar-nav">
                    {pageInfo.map((section, index)=>(
                        <li id="btn" key={index} className="tab nav-item nav-link" onClick={() => onTabHandler(section)} type="button">
                            <span className="nav-item tab-link">
                              {section.tab}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default LabBar;