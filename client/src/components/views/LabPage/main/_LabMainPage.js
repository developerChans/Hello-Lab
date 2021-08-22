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
    </div>);
}
export default LabMainPage;