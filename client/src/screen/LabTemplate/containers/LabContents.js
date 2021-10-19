import LabRouter from "../LabRouter";

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
        <LabRouter lab={lab}/>
    </div>)
}

export default LabContents;