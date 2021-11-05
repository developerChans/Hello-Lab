import 'screen/OpenlabPage/styles/OpenlabCard.css'

const cards = [
    {
        name:"경소톤",
        professor:"단꾸코",
        department: "소프트웨어학과",
        field: "기계학습 딥러닝 이미지처리 IoT 헬스케어",
        recruiting: true
    },
    {
        name:"경소톤",
        professor:"단꾸코",
        department: "소프트웨어학과",
        field: "기계학습 딥러닝 이미지처리 IoT 헬스케어",
        recruiting: false
    
    },
    {
        name:"경소톤",
        professor:"단꾸코",
        department: "소프트웨어학과",
        field: "기계학습 딥러닝 이미지처리 IoT 헬스케어",
        recruiting: false
    },
    {
        name:"경소톤",
        professor:"단꾸코",
        department: "소프트웨어학과",
        field: "기계학습 딥러닝 이미지처리 IoT 헬스케어",
        recruiting: true
    },
]

const OpenlabCard = ({openlabs}) =>{
    const onLabClick= (item) =>{
        console.log(item)
        window.location.href = `/open/detail/${item.labId}`
    }
    return(<>
        {openlabs && openlabs.result.map(item=>(
        <div className="openlab-card">
            <div className="openlab-card-title">
                <div className="openlab-title-name" onClick={()=>onLabClick(item)}>{item.labName} 
                {!item.labName.includes("연구실") && <span> 연구실</span>}
                </div>
                <span className="openlab-title-professor">{item.professorName} 교수</span>
            </div>
            {item.isRecruit===1 && <span className="openlab-card-recruit">모집 중🔥️️</span>}
            <div className="openlab-card-content">
                <span style={{'fontWeight':'bold'}}>✔ 소속학과&nbsp;</span>
                <span>{item.major}</span>
                <br/>
                <span style={{'fontWeight':'bold'}}>✔ 연구분야&nbsp;</span>
                <span>{item.field}</span>
            </div>
        </div>))}</>
    )
}
export default OpenlabCard;