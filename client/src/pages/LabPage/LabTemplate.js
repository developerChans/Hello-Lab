import LabBar from "../Bars/Labtemplate/LabBar";
import LabHeader from "../Bars/Labtemplate/LabHeader";
import LabSideBar from "../Bars/Labtemplate/LabSideBar";

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