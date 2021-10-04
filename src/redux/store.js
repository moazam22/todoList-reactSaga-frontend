import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index.js';
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const store = compose(
	applyMiddleware(sagaMiddleware),
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga)

export default store;