import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import publicInfo from '../../../components/public/public.reducers'
import formControlInfo from '../../../components/Public/public.formControl.reducer' //public 不能用,貌似是关键字
import teacherList from './teacherList.reducers'
import courseList from './courseList.reducers'
import classesList from './classesList.reducers'
import survyList from './survyList.reducers'
import voteList from './voteList.reducers'
import gradeList from './gradeList.reducers'
import adminList from './adminList.reducers'
import voting from './voting.reducers'
import print from './print.reducers'
import reportList from './reportList.reducers'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	teacherList,
	courseList,
	classesList,
	survyList,
	publicInfo,
	formControlInfo,
	voteList,
	gradeList,
	adminList,
	voting,
	print,
	reportList,
  	routing: routerReducer //整合路由 
})

export default rootReducer