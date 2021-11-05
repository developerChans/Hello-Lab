import {useRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {actionCreators} from '_actions/lab_action'

import {RiArrowDownSLine} from 'react-icons/ri'

import 'screen/LabTemplate/styles/LabSideBar.css'
import logo from'screen/LabTemplate/styles/logo.png'

const tabs =[
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

const researchList = [
    {
        id: 1,
        tab: "연구 1",
        state: true,
    },
    {
        id: 2,
        tab: "연구 2",
        state: false,
    },    {
        id: 3,
        tab: "연구 3",
        state: false,
    },
]

const LabSideBar = ({data, updateTab, updateCategory}) =>{
  
  const [drop, setDrop] = useState(false)
  const researchTabs = useRef()


  useEffect(()=>{
    if(drop){
      researchTabs.current.style.display = "block"
    }else{
      researchTabs.current.style.display = "none"
    }
  }, [drop])
  

  const onTabHandler = (section) =>{
    window.location.href=`/lab/${data.lab.id}/${section.route}`
  }
  const onResearchHandler =(section)=>{
    updateCategory('research')
    updateTab(section.id)
    localStorage.setItem('tab', 'process')
    window.location.href=`/lab/${data.lab.id}/research/${section.id}`
  } 
  const onResearchClick = () =>{
    setDrop(prev=>!prev)
  }


    return(
    <div className="lab-sidebar">
      <div className="lab-sidebar-logo">
        <a href="/">
        <img src={logo}/>
        </a>
      </div>
      <div className="lab-sidebar-tabs">
        {tabs.map((section, index)=>(
          <div key={index} className="lab-sidebar-tab" onClick={() => onTabHandler(section)} type="button">
                <span className="">
                  {section.tab}
                </span>
            </div>
        ))}
        <div className="lab-sidebar-research">
          <div className="lab-sidebar-research-dropdown" type="button" onClick={onResearchClick}>
            <span>연구
            <RiArrowDownSLine style={{
                  'top': '-3px',
                  'position': 'relative',
            }}/>
            </span>
          </div>
          <div ref={researchTabs} className="lab-sidebar-research-tabs">
          {researchList.map((section, index)=>(
          <div key={index} className="lab-sidebar-research-tab" type="button" onClick={() => onResearchHandler(section)}>
                <span className="">
                  {section.tab}
                </span>
            </div>
          ))}
          </div>
        </div>
      </div>

    </div>)
}

const mapStateToProps = (state)=>{
  return { data: state }
}

const mapDispatchToProps = (dispatch)=>{
  return { updateTab: tab=>dispatch(actionCreators.updateTab(tab)),
    updateCategory: category=>dispatch(actionCreators.updateCategory(category)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabSideBar);