
import { Router, Route, IndexRoute} from 'react-router' // 路由

import Index from './index/index'

import AdminList from './index/adminList'
import TeacherList from './index/teacherList'
import CourseList from './index/courseList'
import SurvyList from './index/survyList'
import ClassesList from './index/classesList'
import ReportList from './index/reportList'

class Routers extends Raect.Component {
    render() {
        let _route
        //如果module不为空,则表示是单独打开的页面
        if (TUI.fn.requestParam("module") == "manage") {
            _route = <Route path={TUI.ROOTPATH} component={Manage}></Route>
        }
        else {
            _route =
                <Route path={TUI.ROOTPATH} component={Index}>
                    <IndexRoute component={SurvyList} />
                    <Route path={TUI.ROOTPATH + "teachers"} component={TeacherList} />
                    <Route path={TUI.ROOTPATH + "courses"} component={CourseList} />
                    <Route path={TUI.ROOTPATH + "admins"} component={AdminList} />
                    <Route path={TUI.ROOTPATH + "survys"} component={SurvyList} />
                    <Route path={TUI.ROOTPATH + "reports"} component={ReportList} />
                </Route>
        }
        const {history} = this.props
        return (
            <Router history={history}>
                {_route}
            </Router>
        )
    }
}

export default Routers

