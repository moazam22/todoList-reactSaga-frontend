import {put,takeEvery} from 'redux-saga/effects';
import * as types from '../types';
import axios from 'axios';


function* postTodo(action){
	try{
		let newTodos = yield axios.post(`http://localhost:3001/list/todo/${action.payload.id}`,action.payload.data);
		yield put({type: types.POST_TODO_SUCCESS, payload: newTodos})
	}catch(e){
		yield put({type: types.POST_TODO_FAILURE, payload: e.message})	
	}
}

function* editTodo(action){
	try{
		let newTodo = yield axios.put(`http://localhost:3001/list/todo/${action.payload.id}`,action.payload.data);
		yield put({type: types.PUT_TODO_SUCCESS, payload: newTodo.data})
	}catch(e){
		yield put({type: types.PUT_TODO_FAILURE, payload: e})	
	}
}

function* deleteTodo(action){
	const {listId, id} = action.payload;
	try{
		let newTodo = yield axios.put(`http://localhost:3001/list/todo/delete/${listId}`, {id: id});
		yield put({type: types.DELETE_TODO_SUCCESS, payload: newTodo.data})
	}catch(e){
		yield put({type: types.DELETE_TODO_FAILURE, payload: e})
	}
}

function* changeStatus(action){
	try{
		let newTodo = yield axios.put(`http://localhost:3001/list/todo/changeStatus/${action.payload.listId}`,action.payload);
		yield put({type: types.CHANGE_STATUS_SUCCESS, payload: newTodo.data})
	}catch(e){
		yield put({type: types.CHANGE_STATUS_FAILURE, payload: e})	
	}
}


function* todoSaga(){
	yield takeEvery(types.POST_TODO_REQUEST, postTodo);
	yield takeEvery(types.PUT_TODO_REQUEST, editTodo);
	yield takeEvery(types.DELETE_TODO_REQUEST, deleteTodo);
	yield takeEvery(types.CHANGE_STATUS_REQUEST, changeStatus);
}

export default todoSaga;