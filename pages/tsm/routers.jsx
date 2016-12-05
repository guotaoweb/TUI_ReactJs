import { Router, Route, IndexRoute } from 'react-router' // 路由

import Index from './index/index'

import AdminList from './index/adminList'
import TeacherList from './index/teacherList'
import CourseList from './index/courseList'
import SurvyList from './index/survyList'
import ClassesList from './index/classesList'
import ReportList from './index/reportList'
import VoteList from './index/voteList'


class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={Config.ROOTPATH} component={Index}>
                    <IndexRoute component={ClassesList} />
                    <Route path={Config.ROOTPATH + "teachers"} component={TeacherList} />
                    <Route path={Config.ROOTPATH + "courses"} component={CourseList} />
                    <Route path={Config.ROOTPATH + "admins"} component={AdminList} />
                    <Route path={Config.ROOTPATH + "survys"} component={SurvyList} />
                    <Route path={Config.ROOTPATH + "reports"} component={ReportList} />
                    <Route path={Config.ROOTPATH + "votes"} component={VoteList} />
                    <Route path={Config.ROOTPATH + "classes"} component={ClassesList} />
                    
                </Route>
            </Router>
        )
    }
}

export default Routers

