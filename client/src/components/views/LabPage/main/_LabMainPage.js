import {Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LabInfo from 'components/views/LabPage/main/LabInfo';
import LabNotice from 'components/views/LabPage/main/LabNotice';
import LabCal from 'components/views/LabPage/main/LabCalendar';
import LabAsk from 'components/views/LabPage/main/LabAsk';
import LabMember from 'components/views/LabPage/main/LabMember';

const LabMainPage = () =>{

    return (
    <div>
        <Route path="/lab/:id/main/info"><LabInfo/></Route>
        <Route path="/lab/:id/main/notice"><LabNotice/></Route>
        <Route path="/lab/:id/main/calendar"><LabCal/></Route>
        <Route path="/lab/:id/main/ask"><LabAsk/></Route>
        <Route path="/lab/:id/main/member"><LabMember/></Route>
    </div>);
}
export default LabMainPage;