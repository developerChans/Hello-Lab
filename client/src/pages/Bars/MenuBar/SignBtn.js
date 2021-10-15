import './MenuBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

const SignBtn = () =>{
    const history = useHistory();
    const onSigninBtnClick = ()=>{
        history.push('/login');
      }
      const onJoinBtnClick = () =>{
        history.push('/register');
      }
    return (
    <span id="other-page">
        <span id="sign-in" onClick={onSigninBtnClick} type="button">
          Sign in
        </span>
        <span id="join" onClick={onJoinBtnClick} type="button">
          Join
        </span>
      </span>
    );
}

export default SignBtn;