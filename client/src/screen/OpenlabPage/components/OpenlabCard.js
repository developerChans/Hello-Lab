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

const OpenlabCard = () =>{
    return(<>
        {cards.map(item=>(
        <div className="openlab-card">
            <div className="openlab-card-title">
                <a className="openlab-title-name">{item.name} 연구실</a>
                <span className="openlab-title-professor">{item.professor} 교수</span>
            </div>
            {item.recruiting && <span className="openlab-card-recruit">모집 중🔥️️</span>}
            <div className="openlab-card-content">
                <span style={{'fontWeight':'bold'}}>✔ 소속학과&nbsp;</span>
                <span>{item.department}</span>
                <br/>
                <span style={{'fontWeight':'bold'}}>✔ 연구분야&nbsp;</span>
                <span>{item.field}</span>
            </div>
        </div>))}</>
    )
}
export default OpenlabCard;