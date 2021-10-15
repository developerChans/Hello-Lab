import axios from 'axios'
import {useEffect} from 'react'
const LabMember = ({data}) =>{

    useEffect(()=>{
        axios.get(`/app/lab/${data.lab.id}/member`)
        .then(response => {
            if(response.data[0]){
                console.log(response)
            }
        })
    }, [])
    return (
        <div>

        </div>
    );
}
export default LabMember;
