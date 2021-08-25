import{
    STUDENT_LOGIN,
    STUDENT_REGISTER,
    USER_AUTH
} from '../_actions/types';

export default function (state={}, action){
    switch(action.type){
        case STUDENT_LOGIN:
            return { ...state, loginSuccess: action.payload }
        case STUDENT_REGISTER:
            return { ...state, register: action.payload }
        default:
            return state;
    }
}