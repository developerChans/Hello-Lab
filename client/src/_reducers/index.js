import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import user from './user_reducer'
import lab from './lab_reducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["lab"]
}

const rootReducer = combineReducers({
    user,
    lab
})

export default persistReducer(persistConfig, rootReducer);