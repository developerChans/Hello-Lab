import axios from "axios";
import { STUDENT_LOGIN, STUDENT_REGISTER, STUDENT_AUTH } from "./types";

export function studentLogin(dataToSubmit) {
  
  axios
  .post("/app/login/students", dataToSubmit)
  .then(response =>{
    return {
      type: STUDENT_LOGIN,
      payload: response,
    };
  })
}

const studentRegister = (dataToSubmit)=>{
  axios({
    method:'post',
    url: '/app/users/students',
    data: dataToSubmit
  })
  .then(response =>{
    return {
      type: STUDENT_REGISTER,
      payload: response,
    };
  })
}

export const userActionCreators ={
  studentLogin,
  studentRegister
}