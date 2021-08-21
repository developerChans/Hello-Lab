import LabBar from "./template/LabBar";
import LabHeader from "./template/LabHeader";
import LabSideBar from "./template/LabSideBar";

const LabTemplate = () =>{
    
    return (
        <div>
            <LabSideBar/>
            <LabHeader/>
            <LabBar/>      
        </div>
    );
}

export default LabTemplate;