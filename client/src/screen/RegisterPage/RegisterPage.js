import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'screen/RegisterPage/styles/RegisterPage.css'
import RegisterForm from './RegisterForm'

function RegisterPage() {

  return (
    <div className="wrap">
      <div id="register-content">
        <h1 id="ment">Join</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;



