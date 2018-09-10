import { createStore,applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { rootReducer } from './rootReducer';

// const middleWare = applyMiddleware(promise,thunk,logger)
const middleWare = applyMiddleware(promise,thunk)
export const store = createStore(rootReducer,middleWare)
