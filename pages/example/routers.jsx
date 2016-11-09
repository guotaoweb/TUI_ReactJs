import { Router, Route, IndexRoute } from 'react-router' // 路由
import * as config from 'config'

import Index from './index/index'

import Table from './index/Table'
import Btn from './index/Btn'
import Input from './index/Input'
import Select from './index/Select' 
import CheckBox from './index/check'
import Tip from './index/Tip' 
import Layout1 from './index/layout1'
import Layout2 from './index/layout2'
import Layout3 from './index/layout3'
import _SidePage from './index/sidePage'
import _Dialog from './index/dialog'
import _MultyMenu from './index/multyMenu'
import _TipTool from './index/tipTool'
import _Pager from './index/pager'
import _Loading from './index/loading'
import _ModelDialog from './index/modelDialog'


class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={config.ROOTPATH} component={Index}>
                    <IndexRoute component={Table} />
                    <Route path={config.ROOTPATH + "layout1"} component={Layout1} />
                    <Route path={config.ROOTPATH + "layout2"} component={Layout2} />
                    <Route path={config.ROOTPATH + "layout3"} component={Layout3} />

                    <Route path={config.ROOTPATH + "table"} component={Table} />
                    <Route path={config.ROOTPATH + "btn"} component={Btn} />
                    <Route path={config.ROOTPATH + "input"} component={Input} />
                    <Route path={config.ROOTPATH + "select"} component={Select} />
                    <Route path={config.ROOTPATH + "check"} component={CheckBox} />
                    <Route path={config.ROOTPATH + "tip"} component={Tip} />

                    <Route path={config.ROOTPATH + "sidePage"} component={_SidePage} />
                    <Route path={config.ROOTPATH + "dialog"} component={_Dialog} />
                    <Route path={config.ROOTPATH + "multyMenu"} component={_MultyMenu} />
                    <Route path={config.ROOTPATH + "tipTool"} component={_TipTool} />
                    <Route path={config.ROOTPATH + "pager"} component={_Pager} />
                    <Route path={config.ROOTPATH + "loading"} component={_Loading} />
                    <Route path={config.ROOTPATH + "modelDialog"} component={_ModelDialog} />
                </Route>
            </Router>
        )
    }
}

export default Routers


