// Packages:
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { compose } from 'redux'


// Redux:
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))


// Exports:
export default store
