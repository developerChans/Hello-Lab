import { useState, useEffect } from "react";
import axios from 'axios'

import { connect } from "react-redux";
import Ask from './Ask'
const LabAsk = ({data}) =>{
  
  const [ask, setAsk] = useState();
  const [askAttachment, setAskAttachment] = useState();
  const [isWriter, setIsWriter] = useState(true);
  const [asks, setAsks] = useState();
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState();


  const {lab} = data

  useEffect(()=>{
    axios.get(`/app/qna/${lab.id}`)
    .then(response => {
      setAsks(response.data)
    })
  }, [])

  const onAskChange = (event) =>{
    console.log(event)
    const {target: {value}} = event;
    setAsk(value);
  }
  const onAnswerChange = (event)=>{
    const {target: {value}} = event;
    setAnswer(value);
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
    document.querySelector("#input-image").value=''
  }

    
  const onAskSubmit = (event)=>{
    event.preventDefault();
    // 작성자, 내용, 작성일시, imageUrl 서버로 보내기
    axios.post(`/app/qna/${lab.id}`, {content: ask})
    window.location.reload();
  }

  const onAnswerSubmit = (event, askId)=>{
    event.preventDefault();
    axios.post(`/app/qna/${lab.id}/${askId}`, {content: answer})
    window.location.reload();
  }

  const onAnswerClick = (askId)=>{
    axios.get(`/app/qna/${lab.id}/${askId}`)
    .then(response=>{
      setAnswers(response.data)
    })
    const answerBtn = document.querySelector(`#answer-${askId}`)
    answerBtn.classList.add("hidden")
  }

  const toggleEditing = () =>{

  }

  return (
    <div style={{"position":"absolute", "top":"100px", "left":"200px"}}>
      <form onSubmit={onAskSubmit}>
        <input type="text" placeholder="내용을 입력해주세요." onChange={onAskChange} required/>
        <input id="input-image" type="file" accept="image/*" onChange={onFileChange}/>
        <button type="submit">등록</button>
      </form>
                                                                                    
      {askAttachment && 
      <>
        <img src={askAttachment} width="100px" height="100px"/>
        <button type="button" onClick={onAttachment}>X</button>
      </>}

      <div>
          {asks && asks.map((ask)=>(
            <div key={ask.id}>
              <Ask isWriter={isWriter} lab={lab} ask={ask}/>
              <button id={`answer-${ask.id}`} onClick={()=>onAnswerClick(ask.id)}>답글보기</button>
                <form onSubmit={(event)=>onAnswerSubmit(event, ask.id)}>
                <input type="text" placeholder="내용을 입력해주세요." onChange={onAnswerChange} required/>
                <button type="submit">등록</button>
              </form>
              <div>
              <>
              {answers && answers.map((answer)=>(
                <div class={`answer-${ask.id}`} key={answer.id}>
                {ask.id===answer.parentId && 
                  <>
                  <div>{answer.writer}</div>
                  <div>{answer.content}</div>
                  {answer.image && <img src={answer.image}/>}
                  <div>{answer.date}</div>
                  {isWriter &&<>
                  <button>수정</button>
                  <button>삭제</button>
                  </>}
                  </>
                }
                </div>
              ))}
              </>
              </div>
            </div>
          ))}
        </div>
        
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {data: state};
}

export default connect(mapStateToProps)(LabAsk);
