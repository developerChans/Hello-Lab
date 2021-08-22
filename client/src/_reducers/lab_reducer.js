import{
    REPLAB,
    CATEGORY,
    TAB
} from '_actions/types';

export default function (state={lab:{}}, action){
    switch(action.type){
        case REPLAB:
            return {...action.lab};
        case CATEGORY:
            return {...state, category: action.category}
        case TAB:
            return {...state, tab: action.tab}
        default:
            return state;
    }
}

