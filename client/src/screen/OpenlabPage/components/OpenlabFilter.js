import 'screen/OpenlabPage/styles/OpenlabFilter.css'
import {useState, useRef, useEffect} from 'react'
import{RiArrowDownSLine} from 'react-icons/ri'

const departments = [
    {
        tag: "software",
        name: "소프트웨어학과"
    },
    {
        tag: "computer",
        name: "컴퓨터공학과"
    },
    {
        tag: "mobile",
        name: "모바일시스템공학과"
    },
    {
        tag: "security",
        name: "산업보안학과"
    },
    {
        tag: "statics",
        name: "정보통계학과"
    },
    {
        tag: "economy",
        name: "경제학과"
    },
    {
        tag: "management",
        name: "경영학과"
    },
]

const OpenlabFilter = () =>{
    const [expanded, setExpanded] = useState(false)

    const checkboxes = useRef()

    useEffect(()=>{
        if(expanded){
            checkboxes.current.style.display = "block";
        }else{
            checkboxes.current.style.display = "none"
        }
    }, [expanded])

    const onSelectClick= () =>{
        setExpanded(prev=>!prev)
    }

    return(
        <div className="openlab-filter">
            필터링
            <label for="openlab-check-recruiting" 
            style={{'margin':'0px', 'marginLeft': '10px'}}>
                <input style={{'marginRight':'5px'}} name="openlab-check-recruiting" type="checkbox"/>
                모집 중인 연구실만
            </label>
            <div className="openlab-department" name="department" onClick={onSelectClick}>
            <span>학과</span>
            <RiArrowDownSLine style={{
                'left': '270px',
                'position': 'relative',
                'top': '3px',
            }}/>
            </div>
            <div className="openlab-checkboxes" ref={checkboxes}>
                {departments.map(item=>(
                <label className="openlab-checkbox" for={item.tag}>
                    <span>
                        <input type="checkbox" id={item.tag}/> {item.name}
                    </span> 
                </label>))}
                
            </div>
            <div className="openlab-department-selected">
            </div>
        </div>
    )
}
export default OpenlabFilter;