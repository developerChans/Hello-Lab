import { useState, useEffect } from "react";
import '../views.css';
import 'bootstrap/dist/css/bootstrap.css';
import './RegisterPage.css'
import RegisterForm from './RegisterForm'

function RegisterPage() {


  const [auth, setAuth] = useState(null)

  useEffect(()=>{
    setAuth(null)
  }, [])
  const onStudentClick = ()=>{
    setAuth('student');
  }

  const onProfessorClick = () =>{
    setAuth('professor');
  }

  return (
    <div className="wrap">
      <div id="register-content">
        <h1 id="ment">Join</h1>
        {!auth && <>
      <button id="auth-btn" onClick={onStudentClick}>학생 회원가입</button>
      <button id="auth-btn" onClick={onProfessorClick}>교수 회원가입</button>
      </>}
      {auth && <RegisterForm auth={auth}/>}
      </div>
    </div>
  );
}

export default RegisterPage;



