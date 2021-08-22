<<<<<<< HEAD
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
const LabMainPage = () =>{

    const location = useLocation();
    console.log(document);

    const [mainContent, setMainContent] = useState(1);
    useEffect(()=>{

    })
    return (
    <div>
        <h1>main</h1>
=======
import {Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import LabInfo from 'components/views/LabPage/main/LabInfo';
import LabNotice from 'components/views/LabPage/main/LabNotice';
import LabCal from 'components/views/LabPage/main/LabCal';
import LabAsk from 'components/views/LabPage/main/LabAsk';
import LabMember from 'components/views/LabPage/main/LabMember';

const LabMainPage = () =>{

    return (
    <div>
        <h1>main</h1>
        <Route exact path="/lab/:id/main/info"><LabInfo/></Route>
        <Route exact path="/lab/:id/main/notice"><LabNotice/></Route>
        <Route exact path="/lab/:id/main/calendar"><LabCal/></Route>
        <Route exact path="/lab/:id/main/ask"><LabAsk/></Route>
        <Route exact path="/lab/:id/main/member"><LabMember/></Route>
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
    </div>);
}
export default LabMainPage;