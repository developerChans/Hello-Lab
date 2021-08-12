import { useEffect } from "react";
import axios from "axios";
import { withRouter, useLocation } from 'react-router-dom';
import '../views.css';
import LabBar from './bars/LabBar';
import LabHeader from './bars/LabHeader';
import LabSideBar from './bars/LabSideBar';

const labs = [
  {
      id: 0,
      name: "운영체제",
      prof: "최종무",
      imgPath: '/img/solid/mint.png'
     },
  {
      id: 1,
      name: "보안",
      prof: "조성제",
      imgPath: '/img/solid/pink.png'
     },
  {
      id: 2,
      name: "모바일",
      prof: "어쩌고",
      imgPath: '/img/solid/yellow.png'
  }
];

function LabPage() {

  const location = useLocation();
  const id = location.state.id;
  const lab = labs.find(element => element.id === id);
  return (
    <div>
      <LabHeader {...lab}/>
      <LabBar {...lab}/>
    </div>
  );
}

export default withRouter(LabPage);
