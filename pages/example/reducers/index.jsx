import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import publicInfo from '../../../components/Public/public.reducers.jsx'
import formControlInfo from '../../../components/Public/public.formControl.reducer' //public 不能用,貌似是关键字
import multyMenu from './multyMenu.reducers'
import sideList from './sideList.reducers'
import tableList from './tableList.reducers'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	multyMenu,
	publicInfo,
	formControlInfo,
	sideList,
	tableList, 
  	routing: routerReducer //整合路由 
})

export default rootReducer