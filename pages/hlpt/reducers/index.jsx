import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


import publicInfo from '../components/public/public.reducers'
import manages from './manage.reducers'
import vteamList from './vteamList.reducers'
import orgnizations from './orgnization.reducers'
import orgnizationManage from './orgnizationManage.reducers'
import positionGroup from './positionGroup.reducers'
import positionMaintain from './positionMaintain.reducers'
import userMaintain from './userMaintain.reducers'
import dataPrivileges from './dataPrivileges.reducers'
import personMatchPost from './personMatchPost.reducers'

//使用redux的combineReducers方法将所有reducer打包起来
	// dialog,
	// counterReducer,
const rootReducer = combineReducers({
	manages,
	vteamList,
	orgnizations,
	orgnizationManage,
	publicInfo,
	positionGroup,
	positionMaintain,
	userMaintain,
	dataPrivileges,
	personMatchPost,
  	routing: routerReducer //整合路由 
})

export default rootReducer