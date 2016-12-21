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

let m = ""//manage/
class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={Config.ROOTPATH+"s"} component={Index}></Route> 
                <Route path={Config.ROOTPATH+"vote"} component={Vote}></Route>
                <Route path={Config.ROOTPATH+"end"} component={End}></Route>
                <Route path={Config.ROOTPATH+"login"} component={Login}></Route> 
                <Route path={Config.ROOTPATH} component={Manage}> 
                    <IndexRoute component={SurvyList} />
                    <Route path={Config.ROOTPATH + m + "teachers"} component={TeacherList} />
                    <Route path={Config.ROOTPATH + m + "courses"} component={CourseList} />
                    <Route path={Config.ROOTPATH + m + "admins"} component={AdminList} />
                    <Route path={Config.ROOTPATH + m + "survys"} component={SurvyList} />
                    <Route path={Config.ROOTPATH + m + "reports"} component={ReportList} />
                    <Route path={Config.ROOTPATH + m + "votes"} component={VoteList} />
                    <Route path={Config.ROOTPATH + m + "classes"} component={ClassesList} />
                    <Route path={Config.ROOTPATH + m + "login"} component={Login} />
                    <Route path={Config.ROOTPATH + m + "statistic"} component={Statistic} />
                </Route>
            </Router >
        )
    }
}

export default Routers
    //<IndexRoute component={Statistic} />


    // < Route path= { Config.ROOTPATH + "login" } component= { Login } />
    //     <Route path={Config.ROOTPATH + "manage"} component={Manage}>
