import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
const LabResearchPage = () =>{

    const location = useLocation();
    
    useEffect(()=>{
        console.log(location);
    }, [])
    return (
    <div>
        <h1>Research</h1>
    </div>);
}
export default LabResearchPage;