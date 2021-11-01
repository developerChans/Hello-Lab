import 'screen/LabQnaPage/styles/LabAnswer.css'
const LabAnswer = ({answer}) =>{
    console.log(answer)
    return(<div>
        {answer && <div className="answer-box">
            <span className="answer-box-name">{answer.name}</span>
            <span className="answer-box-date">{answer.updatedAt.split('T')[0]}</span>
            <div className="answer-box-content">{answer.content}</div>
        </div>}
    </div>)
}
export default LabAnswer;