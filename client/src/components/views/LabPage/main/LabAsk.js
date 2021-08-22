import { useState } from "react";

const asks = [
  {
    id: 1,
    writer: "김채은",
    content: "안녕",
    image: "",
    date: "2021-08-21 21:35",
    comment: [2, 3]
  },  
  {
    id: 2,
    writer: "김지민",
    content: "질문",
    image: "",
    date: "2021-08-21 21:50",
    comment: []
  },
  {
    id: 3,
    writer: "박찬진",
    content: "hello world",
    image: "",
    date: "2021-08-22 21:54",
    comment: []
  }
]

const comments = [
  {
    id: 1,
    writer: "김채은",
    content: "안녕",
    image: "",
    date: "2021-08-21 21:35",
  },  
  {
    id: 2,
    writer: "김지민",
    content: "답글",
    image: "",
    date: "2021-08-21 21:50",
  },
  {
    id: 3,
    writer: "박찬진",
    content: "답글2",
    image: "",
    date: "2021-08-22 21:54",
  }
]

const LabAsk = () =>{
  
  const [ask, setAsk] = useState();
  const [attachment, setAttachment] = useState();

  const onTextChange = (event) =>{
    const {target: {value}} = event;
    setAsk(value);
    console.log(ask);
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
    // 작성자, 내용, 작성일시 서버로 보내기
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
          {asks.map((section, index)=>(
            <div key={section.id}>
              <div>{section.writer}</div>
              <div>{section.content}</div>
              {section.image && <img src={section.image}/>}
              <div>{section.date}</div>
            </div>
          ))}
        </div>
        
    </div>
  );
}
export default LabAsk;
