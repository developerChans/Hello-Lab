import { useEffect } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import '../views.css';

function LabPage() {

  return (
    <div>
      <h1 className="title-logo">DK. Lab</h1>
      <div>LabPage 내 연구실 중 하나 들어갔을 때</div>
    </div>
  );
}

export default withRouter(LabPage);
