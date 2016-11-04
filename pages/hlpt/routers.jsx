import React, { Component} from 'react'
import { Router, Route, IndexRoute} from 'react-router' // 路由

import TUI from './utils'

import Index from './pages/tui/index'
import VTeamList from './pages/tui/vTeamList'
import Manage from './pages/tui/manage'
import Orgnization from './pages/tui/orgnization'
import PositionGroup from './pages/tui/positionGroup'
import PositionMaintain from './pages/tui/positionMaintain'
import UserMaintain from './pages/tui/userMaintain'
import DataPrivileges from './pages/tui/dataPrivileges'
import PostMatchPost from './pages/tui/personMatchPost'

class Routers extends Component {
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