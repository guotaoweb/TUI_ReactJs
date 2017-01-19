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
import Output from './manage/output'
import Input from './manage/input'

import TeacherStatistic from './manage/teacherOnline'
import CourseStatistic from './manage/courseOnline'
import ClassesStatistic from './manage/classesOnline'

import Print from './manage/print'

import Index from './index/index'
import Vote from './index/vote'
import End from './index/end'

let m = ""//manage/
class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={Config.ROOTPATH + "s"} component={Index}></Route>
                <Route path={Config.ROOTPATH + "vote"} component={Vote}></Route>
                <Route path={Config.ROOTPATH + "end"} component={End}></Route>
                <Route path={Config.ROOTPATH + "login"} component={Login}></Route>

                <Route path={Config.ROOTPATH} component={Manage}>
                    <IndexRoute component={Output} />
                    <Route path={Config.ROOTPATH + m + "teachers"} component={TeacherList} />
                    <Route path={Config.ROOTPATH + m + "courses"} component={CourseList} />
                    <Route path={Config.ROOTPATH + m + "admins"} component={AdminList} />
                    <Route path={Config.ROOTPATH + m + "survys"} component={SurvyList} />
                    <Route path={Config.ROOTPATH + m + "votes"} component={VoteList} />
                    <Route path={Config.ROOTPATH + m + "classes"} component={ClassesList} />
                    <Route path={Config.ROOTPATH + m + "login"} component={Login} />
                    <Route path={Config.ROOTPATH + m + "statistic"} component={Statistic} />
                    <Route path={Config.ROOTPATH + m + "teacherStatistic"} component={TeacherStatistic} />
                    <Route path={Config.ROOTPATH + m + "courseStatistic"} component={CourseStatistic} />
                    <Route path={Config.ROOTPATH + m + "cassesStatistic"} component={ClassesStatistic} />
                    <Route path={Config.ROOTPATH + m + "output"} component={Output} />
                    <Route path={Config.ROOTPATH + m + "input"} component={Input} />
                    <Route path={Config.ROOTPATH + m + "repors"} component={ReportList} />
                    <Route path={Config.ROOTPATH + m + "print"} component={Print} /> 
                </Route>
            </Router >
        )
    }
}

export default Routers
    //<IndexRoute component={Statistic} />


    // < Route path= { Config.ROOTPATH + "login" } component= { Login } />
    //     <Route path={Config.ROOTPATH + "manage"} component={Manage}>
