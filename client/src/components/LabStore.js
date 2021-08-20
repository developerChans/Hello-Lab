import {createStore} from 'redux';

const REPLAB = "REPLAB";
const REPPAGE = "REPPAGE";

const replaceLab = (lab)=>{
    return{
        type: REPLAB,
        lab: {...lab}
    }
}

const replacePage = (currentLab) => {
    return{
        type: REPPAGE,
        lab: {...currentLab}
    }
}

const reducer = (state={lab:{}}, action)=>{
    switch(action.type){
        case REPLAB:
            return {lab:{...action.lab}};
        case REPPAGE:
            return {lab:{...action.currentLab}}
        default:
            return {...state};
    }
}

const LabStore = createStore(reducer);

export const actionCreators = {
    replaceLab,
    replacePage
}

export default LabStore;