<<<<<<< HEAD
import LabBar from "./bars/LabBar";
import LabHeader from "./bars/LabHeader";
import LabSideBar from "./bars/LabSideBar";

const LabTemplate = (lab) =>{

    return (
        <div>
            <LabSideBar {...lab}/>
            <LabHeader {...lab}/>
            <LabBar {...lab}/>      
=======
import LabBar from "./template/LabBar";
import LabHeader from "./template/LabHeader";
import LabSideBar from "./template/LabSideBar";

const LabTemplate = () =>{
    
    return (
        <div>
            <LabSideBar/>
            <LabHeader/>
            <LabBar/>      
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
        </div>
    );
}

export default LabTemplate;