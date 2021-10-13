import {Route} from 'react-router-dom';
import ResearchArchive from './ResearchArchive';
import ResearchAsk from './ResearchAsk';
import ResearchMember from './ResearchMember';
import ResearchOutline from './ResearchOutline';
import ResearchProcess from './ResearchProcess';
import ResearchReport from './ResearchReport';

const LabResearchPage = () =>{

    return (
    <div>
        <Route path="/lab/:id/research/outline"><ResearchOutline/></Route>
        <Route path="/lab/:id/research/archive"><ResearchArchive/></Route>
        <Route path="/lab/:id/research/ask"><ResearchAsk/></Route>
        <Route path="/lab/:id/research/process"><ResearchProcess/></Route>
        <Route path="/lab/:id/research/report"><ResearchReport/></Route>
        <Route path="/lab/:id/research/member"><ResearchMember/></Route>
    </div>);
}
export default LabResearchPage;