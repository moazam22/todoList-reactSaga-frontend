import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../types';
import axios from 'axios';


function getApi(){
	return axios.get('http://localhost:3001/lists')
		.then(resp=> resp)
		.catch((e) => e)
}


function* fetchLists(action){
	try{
		const lists = yield call(getApi);
		yield put({type: types.GET_LISTS_SUCCESS, payload: lists.data.data.listData})
	}catch(e){
		yield put({type: types.GET_LISTS_FAILURE, payload: e.message})
	}
}


function* postApi(action){
	try{
		let newList = yield axios.post('http://localhost:3001/lists',action.payload);
		yield put({type: types.POST_LIST_SUCCESS, payload: newList.data})
	}catch(e){
		yield put({type: types.POST_LIST_FAILURE, payload: e.message})	
	}
}

function* editList(action){
	try{
		let newList = yield axios.put(`http://localhost:3001/lists/${action.payload.id}`,action.payload.data);
		yield put({type: types.PUT_LIST_SUCCESS, payload: newList.data})
	}catch(e){
		yield put({type: types.PUT_LIST_FAILURE, payload: e.message})	
	}
}

function* deleteList(action){
	try{
		let newList = yield axios.delete(`http://localhost:3001/lists/delete/${action.payload}`)
		yield put({type: types.DELETE_LIST_SUCCESS, payload: newList.data.data})
	}catch(e){
		yield put({type: types.DELETE_LIST_FAILURE, payload: e.message})
	}
}

function* listSaga(){
	yield takeLatest(types.GET_LISTS_REQUEST,fetchLists);
	yield takeEvery(types.POST_LIST_REQUEST, postApi);
	yield takeEvery(types.PUT_LIST_REQUEST, editList);
	yield takeEvery(types.DELETE_LIST_REQUEST, deleteList)
}

export default listSaga;
