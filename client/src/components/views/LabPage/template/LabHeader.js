import '../../views.css';
import './LabHeader.css';
import { connect } from "react-redux";


const LabHeader = ({data}) =>{
    const {lab} = data;
    return (
        <div id="lab-header">
            <span>
                <span id="lab-name">{lab.name} 연구실</span>
                <span id="lab-prof">{lab.pname} 교수</span>
            </span>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {data: state};
}
  
  export default connect(mapStateToProps)(LabHeader);