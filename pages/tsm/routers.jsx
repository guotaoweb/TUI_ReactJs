import { Router, Route, IndexRoute } from 'react-router' // 路由
import * as config from 'config'

import Index from './index/index'

import AdminList from './index/adminList'
import TeacherList from './index/teacherList'
import CourseList from './index/courseList'
import SurvyList from './index/survyList'
import ClassesList from './index/classesList'
import ReportList from './index/reportList'

class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={config.ROOTPATH} component={Index}>
                    <IndexRoute component={SurvyList} />
                    <Route path={config.ROOTPATH + "teachers"} component={TeacherList} />
                    <Route path={config.ROOTPATH + "courses"} component={CourseList} />
                    <Route path={config.ROOTPATH + "admins"} component={AdminList} />
                    <Route path={config.ROOTPATH + "survys"} component={SurvyList} />
                    <Route path={config.ROOTPATH + "reports"} component={ReportList} />
                </Route>
            </Router>
        )
    }
}

export default Routers

