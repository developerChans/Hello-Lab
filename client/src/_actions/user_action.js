import axios from "axios";
import { USER_LOGIN, USER_REGISTER, USER_AUTH } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios.post("/login", dataToSubmit);

  return {
    type: USER_LOGIN,
    payload: request,
  };
}
