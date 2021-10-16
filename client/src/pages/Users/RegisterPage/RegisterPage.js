import { useState, useEffect } from "react";
import '../../views.css';
import 'bootstrap/dist/css/bootstrap.css';
import './RegisterPage.css'
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



