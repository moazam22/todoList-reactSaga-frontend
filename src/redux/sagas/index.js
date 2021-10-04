import {all} from 'redux-saga/effects';
import listSaga from './listSaga';
import todoSaga from './todoSaga';


export default function* rootSaga(){
	yield all([
		listSaga(),
		todoSaga(),
	])
}