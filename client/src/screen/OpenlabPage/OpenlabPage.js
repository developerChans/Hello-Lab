import { withRouter } from "react-router-dom";
import OpenlabHeader from "screen/OpenlabPage/containers/OpenlabHeader";
import OpenlabSort from "screen/OpenlabPage/containers/OpenlabSort";
import OpenlabFilters from 'screen/OpenlabPage/containers/OpenlabFilters'
import OpenlabCard from 'screen/OpenlabPage/components/OpenlabCard'

import 'screen/OpenlabPage/styles/OpenlabPage.css'

import axios from 'axios'
import {useState, useEffect} from 'react'

const OpenlabPage = () =>{

    axios.get('/app/open-lab')
    .then(res=>console.log(res))
    const [openlabs, setOpenlabs] = useState()

    useEffect(()=>{
        axios.get('/app/open-lab')
        .then(res=>{
            const labArr = res.data.result
            setOpenlabs(labArr)
            console.log(openlabs)
        })
    }, [])
    return(
        <div>
            <div className="openlab-container">
                <OpenlabHeader/>
                <OpenlabSort/>
                <OpenlabFilters/>
                <div className="openlab-card-container"
                style={{
                    'zIndex':'-1'
                }}>
                    <OpenlabCard openlabs={openlabs}/>
                </div>
            </div>
        </div>
    );
}

export default withRouter(OpenlabPage);