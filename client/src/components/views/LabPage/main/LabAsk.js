import { useState, useEffect } from "react";
import axios from 'axios'

import { connect } from "react-redux";

const LabAsk = ({data}) =>{
  
  const [ask, setAsk] = useState();
  const [askAttachment, setAskAttachment] = useState();
  const [answerAttachment, setAnswerAttachment] = useState();

  const [isWriter, setIsWriter] = useState(true);
  const [asks, setAsks] = useState();
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState();


  useEffect(()=>{
    axios.get(`/app/qna/${data.lab.id}`)
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

  const onAnsFileChange = (event)=>{
    const { target: {files}} = event;
    const reader = new FileReader();
    const theFile = files[0];
    reader.onloadend = (finished)=>{
      const {currentTarget:{result}} = finished;
      setAnswerAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onAnsAttachment = () =>{
    setAnswerAttachment();
    document.querySelector("#input-image").value=''
  }
    
    
  const onAskSubmit = (event)=>{
    event.preventDefault();
    // 작성자, 내용, 작성일시, imageUrl 서버로 보내기
    axios.post(`/app/qna/${data.lab.id}`, {content: ask})
    window.location.reload();
  }

  const onAnswerSubmit = (event, askId)=>{
    event.preventDefault();
    axios.post(`/app/qna/${data.lab.id}/${askId}`, {content: answer})
    window.location.reload();
  }

  const onAnswerClick = (askId)=>{
    axios.get(`/app/qna/${data.lab.id}/${askId}`)
    .then(response=>{
      setAnswers(response.data)
    })
    const answerBtn = document.querySelector(`#answer-${askId}`)
    answerBtn.classList.add("hidden")
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
              <div>{ask.writer}</div>
              <div>{ask.content}</div>
              {ask.image && <img src={ask.image} width="50px" height="50px"/>}
              <div>{ask.date}</div>
              {isWriter &&<>
              <button>수정</button>
              <button>삭제</button>
              </>}
              <button id={`answer-${ask.id}`} onClick={()=>onAnswerClick(ask.id)}>답글보기</button>
              
                <form onSubmit={(event)=>onAnswerSubmit(event, ask.id)}>
                <input type="text" placeholder="내용을 입력해주세요." onChange={onAnswerChange} required/>
                <input id="input-image" type="file" accept="image/*" onChange={onAnsFileChange}/>
                <button type="submit">등록</button>
              </form>
              {answerAttachment && 
              <>
                <img src={answerAttachment} width="100px" height="100px"/>
                <button type="button" onClick={onAnsAttachment}>X</button>
              </>}
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
