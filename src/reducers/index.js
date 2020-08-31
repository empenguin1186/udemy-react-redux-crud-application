import { combineReducers } from 'redux'
import count from './count'
import dummy from './dummy'

export default combineReducers({ count, dummy })
// export default combineReducers({ foo, bar, baz });