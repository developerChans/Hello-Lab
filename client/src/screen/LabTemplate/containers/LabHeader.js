import 'screen/LabTemplate/styles/LabHeader.css'
const LabHeader = ({lab}) =>{

    return(
    <div className="lab-header">
        <span>
            <span className="lab-header-name">{lab.name} 연구실</span>
            <span className="lab-header-professor">{lab.pname} 교수</span>
        </span>
    </div>
    )
}


  
export default LabHeader;