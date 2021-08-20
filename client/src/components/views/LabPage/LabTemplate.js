import LabBar from "./template/LabBar";
import LabHeader from "./template/LabHeader";
import LabSideBar from "./template/LabSideBar";

const LabTemplate = (lab) =>{
    
    return (
        <div>
            <LabSideBar {...lab}/>
            <LabHeader {...lab}/>
            <LabBar {...lab}/>      
        </div>
    );
}

export default LabTemplate;