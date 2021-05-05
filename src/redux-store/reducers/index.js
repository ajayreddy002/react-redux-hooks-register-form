import {combineReducers} from 'redux';
import {user} from './user-reducer';
import {alert} from './alert-reducer';
import {loginReducer} from './login-reducer';
const rootReducer = combineReducers({
    user,
    loginReducer,
    alert
});
export default rootReducer;