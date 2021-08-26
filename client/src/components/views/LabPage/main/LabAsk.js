import { useState, useEffect } from "react";

const asks = [
  {
    id: 1,
    writer: "김채은",
    content: "안녕",
    image: "https://images.squarespace-cdn.com/content/v1/5cc3d1b051f4d40415789cc2/1597297842330-JTESQEZNPMY9Y5EBSA0U/david-tennant-doctor-who.jpg?format=1000w",
    date: "2021-08-21 21:35",
  },  
  {
    id: 2,
    writer: "김지민",
    content: "질문",
    image: "",
    date: "2021-08-21 21:50",

  },
  {
    id: 3,
    writer: "박찬진",
    content: "hello world",
    image: "",
    date: "2021-08-22 21:54",

  }
]

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

const LabAsk = () =>{
  
  const [ask, setAsk] = useState();
  const [attachment, setAttachment] = useState();
  const [isWriter, setIsWriter] = useState(true);

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
    // 작성자, 내용, 작성일시, imageUrl 서버로 보내기
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
          {asks.map((ask)=>(
            <div key={ask.id}>
              <div>{ask.writer}</div>
              <div>{ask.content}</div>
              {ask.image && <img src={ask.image} width="50px" height="50px"/>}
              <div>{ask.date}</div>
              {isWriter &&<>
              <button>수정</button>
              <button>삭제</button>
              </>}
              <div>
              <>
              {comments.map((comment)=>(
                <div class={`comment-${ask.id}`} key={comment.id}>
                {ask.id===comment.parentId && 
                  <>
                  <div>{comment.writer}</div>
                  <div>{comment.content}</div>
                  {comment.image && <img src={comment.image}/>}
                  <div>{comment.date}</div>
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
export default LabAsk;
