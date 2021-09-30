import LabBar from "./template/LabBar";
import LabHeader from "./template/LabHeader";
import LabSideBar from "./template/LabSideBar";

const LabTemplate = ({data}) =>{
    
    return (
        <div>
            <LabSideBar/>
            <LabHeader/>
            {data.lab.tab && <LabBar/>}      
        </div>
    );
}

export default LabTemplate;