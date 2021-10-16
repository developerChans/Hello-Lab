import axios from 'axios'

import {useEffect, useState} from 'react'

const LabNoticeComments = (labId, noticeId) =>{

    console.log(labId, noticeId)
    useEffect(()=>{
        axios.get(`/app/lab/${labId}/notices/${noticeId}/comments`)
        .then(response=>console.log(response))
    }, [])

    return(<div>

    </div>)
}

export default LabNoticeComments;