import {combineReducers} from 'redux';
import lists from './lists';

const rootReducer = combineReducers({
	lists: lists,
});

export default rootReducer;