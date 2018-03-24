// 合并所有的reducer 并且返回出去
import { combineReducers} from 'redux'

import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

// 这里传染的是counter 

export default combineReducers({user,chatuser,chat})