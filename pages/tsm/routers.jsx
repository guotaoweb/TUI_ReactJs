import { Router, Route, IndexRoute } from 'react-router' // 路由

import Manage from './manage/index'

import AdminList from './manage/adminList'
import TeacherList from './manage/teacherList'
import CourseList from './manage/courseList'
import SurvyList from './manage/survyList'
import ClassesList from './manage/classesList'
import ReportList from './manage/reportList'
import VoteList from './manage/voteList'
import Login from './manage/login'
import Statistic from './manage/statistic'

import Index from './index/index'
import Vote from './index/vote'
import End from './index/end'


class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={Config.ROOTPATH} component={Manage}> 
<IndexRoute component={VoteList} />
                    <Route path={Config.ROOTPATH + "teachers"} component={TeacherList} />
                    <Route path={Config.ROOTPATH + "courses"} component={CourseList} />
                    <Route path={Config.ROOTPATH + "admins"} component={AdminList} />
                    <Route path={Config.ROOTPATH + "survys"} component={SurvyList} />
                    <Route path={Config.ROOTPATH + "reports"} component={ReportList} />
                    <Route path={Config.ROOTPATH + "votes"} component={VoteList} />
                    <Route path={Config.ROOTPATH + "classes"} component={ClassesList} />
                    <Route path={Config.ROOTPATH + "login"} component={Login} />
                    <Route path={Config.ROOTPATH + "statistic"} component={Statistic} />
                </Route>
            </Router >
        )
    }
}

export default Routers
    //<IndexRoute component={Statistic} />


    // < Route path= { Config.ROOTPATH + "login" } component= { Login } />
    //     <Route path={Config.ROOTPATH + "manage"} component={Manage}>
