import 'bootstrap/dist/css/bootstrap.css';
import './LabBar.css';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from '_actions/lab_action'

const mainInfo =[
    {
      id: 1,
      tab: "소개",
      route: "info"
    },
    { id: 2,
      tab: "공지",
      route: "notice"

    },
    {
      id: 3,
      tab: "질문",
      route: "ask"

    },
    {
      id: 4,
      tab: "멤버",
      route: "member"

    },
  ]

const researchInfo = [
  {
    id:1,
    tab: "개요",
    route: "outline"
  },
  {
    id:2,
    tab: "자료실",
    route: "doc"

  },
  {
    id:3,
    tab: "질문",
    route: "ask"

  },
  {
    id:4,
    tab: "프로세스",
    route: "process"

  },
  {
    id:5,
    tab: "리포트",
    route: "report"

  },
  {
    id:6,
    tab: "멤버",
    route: "member"
  },
]
const LabBar = ({data, updateTab}) =>{

    const [isMain, setIsMain] = useState(true);

    useEffect(()=>{
      setIsMain(Boolean(data.lab.category==="main"));
    }, [data])
    const tabs = isMain ? mainInfo : researchInfo;
    
    const onTabHandler = async (section) =>{
      updateTab(section.route);
    }


    return (
        <div id="content">
            <nav id="lab-bar" className="navbar">
                <ul id="lab-ul" className="navbar-nav">
                    {tabs.map((section, index)=>(
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


const mapStateToProps = (state)=>{
  return { data: state }
}

const mapDispatchToProps = (dispatch)=>{
  return { updateTab: tab=>dispatch(actionCreators.updateTab(tab)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabBar);