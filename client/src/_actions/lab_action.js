import { REPLAB, CATEGORY, TAB } from "./types";

const replaceLab = (lab)=>{
    return{
        type: REPLAB,
        lab: {...lab}
    }
}

const updateCategory = (category)=>{
    return{
        type: CATEGORY,
        category
    }
}

const updateTab = (tab)=>{
    return {
        type: TAB,
        tab
    }
}

export const actionCreators = {
    replaceLab,
    updateCategory,
    updateTab
}