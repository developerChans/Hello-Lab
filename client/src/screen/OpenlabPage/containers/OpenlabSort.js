import 'screen/OpenlabPage/styles/OpenlabSort.css'
import {useState, useEffect, useRef} from 'react'
const OpenlabSort = () =>{

    const [ganada, setGanada] = useState(true)
    const ganadaBtn = useRef()
    const updateBtn = useRef()
    

    useEffect(()=>{
        if(ganada){
            ganadaBtn.current.classList.add('openlab-sort-click')
            updateBtn.current.classList.remove('openlab-sort-click')
            
        }else{
            ganadaBtn.current.classList.remove('openlab-sort-click')

            updateBtn.current.classList.add('openlab-sort-click')
        }
    }, [ganada])
    const onGanadaClick = () =>{
        setGanada(true)
    }
    const onUpdateClick = () =>{
        setGanada(false)
    }
    return(
    <div className="openlab-sort">
        정렬기준
        <button ref={ganadaBtn} className="openlab-sort-btn" onClick={onGanadaClick}>가나다순</button>
        <button ref={updateBtn} className="openlab-sort-btn" onClick={onUpdateClick}>업데이트순</button>
    </div>
    )
}

export default OpenlabSort;