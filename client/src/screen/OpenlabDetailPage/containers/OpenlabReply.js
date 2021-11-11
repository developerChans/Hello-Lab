import "screen/OpenlabDetailPage/styles/OpenlabReply.css";
import Reply from "screen/OpenlabDetailPage/components/Reply";
import { useState } from "react";

const replies = [
  {
    emoji: "🌞",
    name: "김지민",
    content: "헬로랩 연구실 멋집니다.",
    date: "2021-10-13️",
  },
  {
    emoji: "👩",
    name: "김채은",
    content: "화이팅!",
    date: "2021-10-12",
  },

  {
    emoji: "💰",
    name: "박찬진",
    content: "웹개발 전문적으로 학습할 수 있는 연구실입니다.",
    date: "2021-10-10",
  }
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
