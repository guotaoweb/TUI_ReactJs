import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'




import publicInfo from '../../../components/Public/public.reducers.jsx'
import multyMenu from './multyMenu.reducers'


//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({

	multyMenu,
	publicInfo,
  	routing: routerReducer //整合路由 
})

export default rootReducer