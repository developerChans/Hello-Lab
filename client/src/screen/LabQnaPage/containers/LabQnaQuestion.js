import {useState} from 'react'
import axios from 'axios'

import 'screen/LabQnaPage/styles/LabQnaQuestion.css'

const LabQnaQuestion = ({lab}) =>{
    const [ask, setAsk] = useState();
    const [askAttachment, setAskAttachment] = useState();

    const onAskChange = (event) =>{
        console.log(event)
        const {target: {value}} = event;
        setAsk(value);
      }
    
      const onFileChange = (event)=>{
        const { target: {files}} = event;
        const reader = new FileReader();
        const theFile = files[0];
        reader.onloadend = (finished)=>{
          const {currentTarget:{result}} = finished;
          setAskAttachment(result);
        }
        reader.readAsDataURL(theFile);
      }
    
      const onAttachment = () =>{
        setAskAttachment();
        document.querySelector(".qna-q-input-image").value=''
      }
    
        
      const onAskSubmit = (event)=>{
        event.preventDefault();
        // 작성자, 내용, 작성일시, imageUrl 서버로 보내기
        axios.post(`/app/qna/${lab.id}`, {content: ask})
        window.location.reload();
      }
    
    return(        
    <div className="qna-q-container">
        <form onSubmit={onAskSubmit}>
            <textarea className="qna-q-input-text" type="text" placeholder="내용을 입력해주세요." onChange={onAskChange} required/>
            <input className="qna-q-input-image" type="file" accept="image/*" onChange={onFileChange}/>
            <button className="qna-q-submit" type="submit">제출</button>
        </form>
        {askAttachment && 
        <>
        <img src={askAttachment} width="100px" height="100px"/>
        <button className="qna-q-attachment-x" type="button" onClick={onAttachment}>X</button>
        </>}
    </div>)
}
export default LabQnaQuestion;