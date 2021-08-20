import '../../views.css';
import './LabHeader.css';
import { connect } from "react-redux";


const LabHeader = ({currentLab}) =>{

    return (
        <div id="lab-header">
            <span>
                <span id="lab-name">{currentLab.id} 연구실</span>
                <span id="lab-prof">{currentLab.name} 교수</span>
            </span>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {currentLab: state};
  }
  
  export default connect(mapStateToProps)(LabHeader);