import "screen/ProcessPage/styles/ProcessSort.css";
import { useState, useEffect, useRef } from "react";
const ProcessSort = () => {
  const [update, setUpdate] = useState(true);
  const updateBtn = useRef();
  const oldBtn = useRef();

  useEffect(() => {
    if (update) {
      updateBtn.current.classList.add("process-sort-click");
      oldBtn.current.classList.remove("process-sort-click");
    } else {
      updateBtn.current.classList.remove("process-sort-click");

      oldBtn.current.classList.add("process-sort-click");
    }
  }, [update]);

  const onUpdateClick = () => {
    setUpdate(true);
  };
  const onOldClick = () => {
    setUpdate(false);
  };
  return (
    <div className="process-sort">
      정렬기준
      <button
        ref={updateBtn}
        className="process-sort-btn"
        onClick={onUpdateClick}
      >
        업데이트순
      </button>
      <button ref={oldBtn} className="process-sort-btn" onClick={onOldClick}>
        오래된순
      </button>
    </div>
  );
};

export default ProcessSort;
