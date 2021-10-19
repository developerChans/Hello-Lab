import "screen/OpenlabDetailPage/styles/Reply.css";

const Reply = ({ replies }) => {
  return (
    <>
      {replies.map((item) => (
        <div className="reply">
          <div className="reply-name">
            <span>{item.emoji}</span>
            <span>{item.name}</span>
          </div>
          <div className="reply-content">
            <span>{item.content}</span>
          </div>
          <div className="reply-date">
            <p>{item.date}</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default Reply;
