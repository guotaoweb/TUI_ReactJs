import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import publicInfo from '../../../components/Public/public.reducers.jsx'
import manages from './manage.reducers'
import teacherList from './teacherList.reducers'
import courseList from './courseList.reducers'
import classesList from './classesList.reducers'
import survyList from './survyList.reducers'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	manages,
	teacherList,
	courseList,
	classesList,
	survyList,
	publicInfo,
  	routing: routerReducer //整合路由 
})

export default rootReducer