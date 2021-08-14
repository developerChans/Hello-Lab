import LabBar from "./bars/LabBar";
import LabHeader from "./bars/LabHeader";
import LabSideBar from "./bars/LabSideBar";

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