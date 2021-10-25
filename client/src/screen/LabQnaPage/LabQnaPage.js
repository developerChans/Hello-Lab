import 'screen/LabQnaPage/styles/LabQnaPage.css'
import LabQuestionInput from './containers/LabQuestionInput';
import LabQuestionsContainer from './containers/LabQuestionsContainer';

const LabQnaPage = ({lab}) =>{
    return(
    <div>
        <div id="qna-headline">
            <h3 id="qna-headline-txt">질문 게시판</h3>
        </div>
        <LabQuestionInput lab={lab}/>
        <LabQuestionsContainer lab={lab}/>
    </div>)
}

export default LabQnaPage;