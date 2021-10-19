import LabSideBar from 'screen/LabTemplate/containers/LabSideBar'
import LabContents from 'screen/LabTemplate/containers/LabContents'
import LabHeader from 'screen/LabTemplate/containers/LabHeader'

import { connect } from "react-redux";


const LabTemplate = ({data}) =>{
    
    const {lab} = data;
    return(<div style={{'backgroundColor':'white'}}>
        <LabSideBar/>
        <LabHeader lab={lab}/>
        <LabContents lab={lab}/>
    </div>);
}

const mapStateToProps = (state)=>{
    return {data: state};
}
export default connect(mapStateToProps)(LabTemplate);