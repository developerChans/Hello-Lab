import {Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LabInfo from 'components/views/LabPage/main/LabInfo/LabInfo';
import LabNotice from 'components/views/LabPage/main/LabNotice/LabNotice';
import LabCal from 'components/views/LabPage/LabCalendar';
import LabAsk from 'components/views/LabPage/main/LabAsk/LabAsk';
import LabMember from 'components/views/LabPage/main/LabMember';
import LabNoticeDetail from 'components/views/LabPage/main/LabNotice/LabNoticeDetail';

const LabMainPage = ({data, job}) =>{

    const {lab: {
        id
      }} = data;

    return (
    <div>
        <Route path="/lab/:id/main/info"><LabInfo job={job} data={data}/></Route>
        <Route exact path="/lab/:id/main/notice"><LabNotice job={job} data={data}/></Route>
        <Route path='/lab/:id/main/notice/:id'><LabNoticeDetail labId={id}/></Route>
        <Route path="/lab/:id/main/ask"><LabAsk data={data}/></Route>
        <Route path="/lab/:id/main/member"><LabMember data={data}/></Route>
    </div>);
}
export default LabMainPage;