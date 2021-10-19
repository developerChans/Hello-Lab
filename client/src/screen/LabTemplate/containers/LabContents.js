import LabInfo from "screen/LabInfoPage/LabInfo";

const LabContents = ({lab}) =>{
    return(
    <div className="lab-contents-container"
        style={{
            'position': 'absolute',
            'width': '1072px',
            'height':'100vh',
            'left': '107px',
            'top': '141px',
            'overflowY':'scroll',
        }}>
        <LabInfo lab={lab}/>
    </div>)
}

export default LabContents;