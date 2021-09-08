import { useState, useEffect } from "react";
import axios from 'axios'

import { connect } from "react-redux";

const comments = [
  {
    id: 1,
    parentId: 1,
    writer: "김채은",
    content: "답글이다",
    image: "",
    date: "2021-08-21 21:35",
  },  
  {
    id:2, 
    parentId: 1,
    writer: "김지민",
    content: "답글",
    image: "",
    date: "2021-08-21 21:50",
  },
  {
    id:3,
    parentId: 2,
    writer: "박찬진",
    content: "답글2",
    image: "",
    date: "2021-08-22 21:54",
  }
]

const LabAsk = ({data}) =>{
  
  const [ask, setAsk] = useState();
  const [attachment, setAttachment] = useState();
  const [isWriter, setIsWriter] = useState(true);
  const [asks, setAsks] = useState();
  const [answers, setAnswers] = useState();


  useEffect(()=>{
    axios.get(`/app/qna/${data.lab.id}`)
    .then(response => {
      setAsks(response.data)
    })
  }, [])

  const onTextChange = (event) =>{
    const {target: {value}} = event;
    setAsk(value);
  }

  const onFileChange = (event)=>{
    const { target: {files}} = event;
    const reader = new FileReader();
    const theFile = files[0];
    reader.onloadend = (finished)=>{
      const {currentTarget:{result}} = finished;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onAttachment = () =>{
    setAttachment();
    document.querySelector("#input-image").value=''
  }
    
  const onSubmit = (event)=>{
    event.preventDefault();
    // 작성자, 내용, 작성일시, imageUrl 서버로 보내기
    axios.post(`/app/qna/${data.lab.id}`, {content: ask})
    window.location.reload();
  }

  const onAnswerClick = (askId)=>{
    axios.get(`/app/qna/${data.lab.id}/${askId}`)
    .then(response=>{
      setAnswers(response.data)
    })
  }

  return (
    <div style={{"position":"absolute", "top":"100px", "left":"200px"}}>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="내용을 입력해주세요." onChange={onTextChange} required/>
        <input id="input-image" type="file" accept="image/*" onChange={onFileChange}/>
        <button type="submit">등록</button>
      </form>

      {attachment && 
      <>
        <img src={attachment} width="100px" height="100px"/>
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
              <button onClick={()=>onAnswerClick(ask.id)}>답글보기</button>
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
