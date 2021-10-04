import * as type from '../types';


const initialState = {
	lists: [],
}


export default function lists(state = initialState, action){
	switch (action.type){
		case type.GET_LISTS_SUCCESS:
			return{
				...state,
				lists: action.payload
			}
		case type.POST_LIST_SUCCESS:
			return{
				...state,
				lists: action.payload,
			}
		case type.PUT_LIST_SUCCESS:
			return{
				...state,
				lists: action.payload.data,
			}
		case type.DELETE_LIST_SUCCESS:
		return{
			...state,
			lists: action.payload
		}
		case type.POST_TODO_SUCCESS:
			let newList = state.lists.filter(list=> list._id !== action.payload.data._id);
			return{
				...state,
				lists: [...newList, action.payload.data ]
			}
		case type.PUT_TODO_SUCCESS:
			let index = null;
			let tempNewlist = state.lists.filter((list,i)=> {
				if(list._id === action.payload._id){
					index = i;
					return list;
				}
			})
			const {lists} = state;
			lists[index] = action.payload;
			return{
				...state,
				lists
			}
		case type.DELETE_TODO_SUCCESS:
			let tempList = state.lists;
			let listToUpdate = tempList.filter(list=> list._id === action.payload._id)[0];
			let tempIndex = tempList.indexOf(listToUpdate);
			tempList[tempIndex] = action.payload;
			return {
				...state,
				lists: [...tempList]
			}
		case type.CHANGE_STATUS_SUCCESS:
			const listId = action.payload._id;
			let temp = state.lists.filter(list => list._id === listId)[0];
			let oldList = state.lists.filter(list => list._id !== listId);
			temp.todos = [...action.payload.todos];
			state.lists = [...oldList, temp];
			return {
				...state,
			}
		default: 
			return state;
	}
}