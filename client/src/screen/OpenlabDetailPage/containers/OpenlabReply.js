import "screen/OpenlabDetailPage/styles/OpenlabReply.css";
import Reply from "screen/OpenlabDetailPage/components/Reply";
import { useState } from "react";

const replies = [
  {
    emoji: "🌞",
    name: "김지민",
    content: "맹고ji",
    date: "2021-10-13️",
  },
  {
    emoji: "👩",
    name: "김채은",
    content: "'킹갓엠페러제너럴충무공마제스티'",
    date: "2021-10-12",
  },

  {
    emoji: "💰",
    name: "박찬진",
    content: "오늘뭐먹지?",
    date: "2021-10-10",
  },
  {
    emoji: "👴",
    name: "최승용",
    content: "착한아이..",
    date: "2021-10-10",
  },

  {
    emoji: "🤡",
    name: "최지윤",
    content: "옆집사람",
    date: "2021-10-01",
  },
];

const OpenlabReply = () => {
  const [input, setInput] = useState("");

  const inputChange = (event) => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  return (
    <div className="reply-container">
      <div className="reply-title">
        <span>댓글</span>
      </div>
      <hr />
      <div>
        <textarea
          className="input-area"
          onChange={(event) => inputChange(event)}
        ></textarea>
      </div>
      <div className="btn-position">
        <button className="transmission-input" onClick={console.log(`click!`)}>
          전송
        </button>
      </div>
      <div>
        <Reply replies={replies} />
      </div>
    </div>
  );
};
export default OpenlabReply;
