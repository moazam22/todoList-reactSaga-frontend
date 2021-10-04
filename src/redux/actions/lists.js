import * as types from '../types';


export function getLists(){
	return {
		type: types.GET_LISTS_REQUEST,
		payload: null
	}
}

export function postList(data){
	return {
		type: types.POST_LIST_REQUEST,
		payload: data
	}
}

export function editList(id,data){
	return{
		type: types.PUT_LIST_REQUEST,
		payload: {id,data}
	}
}

export function deleteList(id){
	return{
		type: types.DELETE_LIST_REQUEST,
		payload: id
	}
}
