import { Router, Route, IndexRoute} from 'react-router' // 路由


import Index from './index/index'
import VTeamList from './index/vTeamList'
import Manage from './index/manage'
import Orgnization from './index/orgnization'
import PositionGroup from './index/positionGroup'
import PositionMaintain from './index/positionMaintain'
import UserMaintain from './index/userMaintain'
import DataPrivileges from './index/dataPrivileges'
import PersonMatchPost from './index/personMatchPost'
import * as config  from 'config'

class Routers extends React.Component {
    render() {
        let _route
        //如果module不为空,则表示是单独打开的页面
        if (TUI.fn.requestParam("module") == "manage") {
            _route = <Route path={config.ROOTPATH} component={Manage}></Route>
        }
        else {
            _route =
                <Route path={config.ROOTPATH} component={Index}>
                    <IndexRoute component={Orgnization} />
                    <Route path={config.ROOTPATH + "vteam"} component={VTeamList} />
                    <Route path={config.ROOTPATH + "manage/:id"} component={Manage} />
                    <Route path={config.ROOTPATH + "orgnization"} component={Orgnization} />
                    <Route path={config.ROOTPATH + "positionGroup"} component={PositionGroup} />
                    <Route path={config.ROOTPATH + "positionMaintain"} component={PositionMaintain} />
                    <Route path={config.ROOTPATH + "userMaintain"} component={UserMaintain} />
                    <Route path={config.ROOTPATH + "dataPrivileges"} component={DataPrivileges} />
                    <Route path={config.ROOTPATH + "personMatchPost"} component={PersonMatchPost} />
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