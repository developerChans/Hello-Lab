import 'screen/LabQnaPage/styles/LabQnaPage.css'
import LabQnaQuestion from './containers/LabQnaQuestion';
import LabQuestionsContainer from './containers/LabQuestionsContainer';

const LabQnaPage = ({lab}) =>{
    return(
    <div>
        <div id="qna-headline">
            <h3 id="qna-headline-txt">질문 게시판</h3>
        </div>
        <LabQnaQuestion lab={lab}/>
        <LabQuestionsContainer lab={lab}/>
    </div>)
}

export default LabQnaPage;