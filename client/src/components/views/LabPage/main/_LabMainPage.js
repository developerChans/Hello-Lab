import {Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LabInfo from 'components/views/LabPage/main/LabInfo';
import LabNotice from 'components/views/LabPage/main/LabNotice/LabNotice';
import LabCal from 'components/views/LabPage/main/LabCalendar';
import LabAsk from 'components/views/LabPage/main/LabAsk';
import LabMember from 'components/views/LabPage/main/LabMember';

const LabMainPage = ({data, isProfessor}) =>{

    return (
    <div>
        <Route path="/lab/:id/main/info"><LabInfo data={data}/></Route>
        <Route path="/lab/:id/main/notice"><LabNotice data={data}/></Route>
        <Route path="/lab/:id/main/calendar"><LabCal data={data}/></Route>
        <Route path="/lab/:id/main/ask"><LabAsk data={data}/></Route>
        <Route path="/lab/:id/main/member"><LabMember data={data}/></Route>
    </div>);
}
export default LabMainPage;