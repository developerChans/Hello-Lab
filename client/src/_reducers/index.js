import { combineReducers } from "redux";
<<<<<<< HEAD
import user from './user_reducer'

const rootReducer = combineReducers({
    user,
})

export default rootReducer;
=======
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
>>>>>>> 8d7c647e1275af5aeae5aef7b4ea3fb3139a4819
