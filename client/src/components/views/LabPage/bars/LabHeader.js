import '../../views.css';
import './LabHeader.css';


const LabHeader = (lab) =>{

    return (
        <div id="lab-header">
            <span>
                <span id="lab-name">{lab.name} 연구실</span>
                <span id="lab-prof">{lab.prof} 교수</span>
            </span>
        </div>
    );
}

export default LabHeader;