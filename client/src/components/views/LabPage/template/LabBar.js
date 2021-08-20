import 'bootstrap/dist/css/bootstrap.css';
import './LabBar.css';
import {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const mainInfo =[
    {
      id: 1,
      tab: "소개",
    },
    { id: 2,
      tab: "공지",
    },
    {
      id: 3,
      tab: "일정",
    },
    {
      id: 4,
      tab: "질문",
    },
    {
      id: 5,
      tab: "멤버",
    },
  ]

const researchInfo = [
  {
    id:1,
    tab: "개요"
  },
  {
    id:2,
    tab: "자료실"
  },
  {
    id:3,
    tab: "질문"
  },
  {
    id:4,
    tab: "프로세스"
  },
  {
    id:5,
    tab: "리포트"
  },
  {
    id:6,
    tab: "멤버"

  },
]
const LabBar = (lab) =>{
    const history = useHistory();
    const location = useLocation();
    const [category, setCategory] = useState("main");
    const [tabs, setTabs] = useState(mainInfo);
    
    const onTabHandler = (section) =>{
      history.replace({
        pathname: `/lab/${lab.id}/${category}/${section.id}`,
        category: category,
        id: section.id
      })
    }

    useEffect(()=>{
      setCategory(location.category);
      
      if(category==="main"){
        setTabs(mainInfo);
      }else if(category==="research"){
        setTabs(researchInfo);
      }
    }, [location])

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

export default LabBar;