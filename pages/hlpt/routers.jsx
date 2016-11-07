import { Router, Route, IndexRoute} from 'react-router' // 路由


import Index from './index'
import VTeamList from './vTeamList'
import Manage from './manage'
import Orgnization from './orgnization'
import PositionGroup from './positionGroup'
import PositionMaintain from './positionMaintain'
import UserMaintain from './userMaintain'
import DataPrivileges from './dataPrivileges'
import PostMatchPost from './personMatchPost'

class Routers extends React.Component {
    render() {
        let _route
        //如果module不为空,则表示是单独打开的页面
        if (TUI.fn.requestParam("module") == "manage") {
            _route = <Route path={TUI.ROOTPATH} component={Manage}></Route>
        }
        else {
            _route =
                <Route path={TUI.ROOTPATH} component={Index}>
                    <IndexRoute component={Orgnization} />
                    <Route path={TUI.ROOTPATH + "vteam"} component={VTeamList} />
                    <Route path={TUI.ROOTPATH + "manage/:id"} component={Manage} />
                    <Route path={TUI.ROOTPATH + "orgnization"} component={Orgnization} />
                    <Route path={TUI.ROOTPATH + "positionGroup"} component={PositionGroup} />
                    <Route path={TUI.ROOTPATH + "positionMaintain"} component={PositionMaintain} />
                    <Route path={TUI.ROOTPATH + "userMaintain"} component={UserMaintain} />
                    <Route path={TUI.ROOTPATH + "dataPrivileges"} component={DataPrivileges} />
                    <Route path={TUI.ROOTPATH + "personMatchPost"} component={PostMatchPost} />
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