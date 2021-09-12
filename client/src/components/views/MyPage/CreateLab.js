import {useState} from 'react'
import axios from 'axios'

const CreateLab = ({job})=>{

    const [openModal, setOpenModal] = useState(false);
    const [labName, setLabName] = useState();

    const onOpenModal = () =>{
        setOpenModal(true)
        console.log(openModal)
    }
    const onCloseModal = () =>{
        setOpenModal(false)
    }
    const onLabNameChange = (event) =>{
        const{target:{value}} = event
        setLabName(value)
    }
    const onLabNameSubmit = (event) =>{
        event.preventDefault();
        axios.post('/app/lab', {name:labName})
        window.location.reload()
    }
    return(
        <>
        <button type="button" onClick={onOpenModal}>연구실 생성</button>
        {openModal && 
        <div>
            <div>
            <h4>연구실 생성</h4>
            <button onClick={onCloseModal} type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div>
            
            <form onSubmit={onLabNameSubmit}>
                <label>연구실 이름</label>
                <input value={labName} onChange={onLabNameChange} type="text"/>
                <button type="submit">생성</button>
            </form>
            </div>                      
        </div>}
        </>
    );
}

export default CreateLab;