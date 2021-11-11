import {useState, useEffect, useRef} from 'react'
import ReportPage from 'screen/ReportPage/ReportPage'
import 'screen/ResearchTemplate/styles/ResearchTemplate.css'
import ResearchRouter from './ResearchRouter'
const ResearchTemplate = ({lab}) =>{
    
    const process = useRef()
    const report = useRef()

    useEffect(()=>{
        const tab = localStorage.getItem('tab')
        if(!tab || tab==='process'){
            process.current.classList.add('research-tab-click')
            report.current.classList.remove('research-tab-click')
        }else if(tab==='report'){
            report.current.classList.add('research-tab-click')
            process.current.classList.remove('research-tab-click')
        }
    }, [])
    const onProcessClick=()=>{
        localStorage.setItem('tab', 'process')
        window.location.href=`/lab/${lab.id}/research/${lab.tab}/process`
    }
    const onReportClick = () =>{
        localStorage.setItem('tab', 'report')
        window.location.href=`/lab/${lab.id}/research/${lab.tab}/report`
    }

    return(<div>
        <div className="research-tab">
            <span className="research-name">
                Hello. Lab Project
            </span>
            <span ref={process} className="research-tab-process research-tab-click" onClick={onProcessClick}>
                Process
            </span>
            <span ref={report} className="research-tab-report" onClick={onReportClick}>
                Report
            </span>
        </div>
        <div className="research-container">
            <ResearchRouter/>
        </div>
    </div>)
}


export default ResearchTemplate