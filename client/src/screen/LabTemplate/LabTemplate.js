import LabSideBar from 'screen/LabTemplate/containers/LabSideBar'
import LabContents from 'screen/LabTemplate/containers/LabContents'
import LabHeader from 'screen/LabTemplate/containers/LabHeader'


const LabTemplate = ({lab}) =>{
    return(<div style={{'backgroundColor':'white'}}>
        <LabSideBar/>
        {lab && <><LabHeader lab={lab}/>
        <LabContents lab={lab}/></>}
    </div>);
}

export default LabTemplate;