import * as types from '../types';


export function postTodo(id,data){
	return {
		type: types.POST_TODO_REQUEST,
		payload: {id,data}
	}
}

export function editTodo(id,data){
	return {
		type: types.PUT_TODO_REQUEST,
		payload: {id,data}
	}
}

export function deleteTodo(listId, data){
	return {
		type: types.DELETE_TODO_REQUEST,
		payload: {
			listId: listId,
			id: data.id
		}
	}
}

export function changeStatus(listId,id){
	return {
		type: types.CHANGE_STATUS_REQUEST,
		payload: {listId,id}
	}
}