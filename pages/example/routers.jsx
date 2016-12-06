import { Router, Route, IndexRoute } from 'react-router' // 路由

import Login from './index/login'
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
import Layout4 from './index/layout4'
import _SidePage from './index/sidePage'
import _Dialog from './index/dialog'
import _MultyMenu from './index/multyMenu'
import _TipTool from './index/tipTool'
import _Pager from './index/pager'
import _Loading from './index/loading'
import _ModelDialog from './index/modelDialog'
import _BreadNav from './index/breadNav'
import _Slide from './index/slide'
import _Serach from './index/search'

class Routers extends React.Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={Config.ROOTPATH+"manage"} component={Login} />
                <Route path={Config.ROOTPATH} component={Index}>
                    <IndexRoute component={_Pager} />
                    <Route path={Config.ROOTPATH + "layout1"} component={Layout1} />
                    <Route path={Config.ROOTPATH + "layout2"} component={Layout2} />
                    <Route path={Config.ROOTPATH + "layout3"} component={Layout3} />
                    <Route path={Config.ROOTPATH + "layout4"} component={Layout4} />

                    <Route path={Config.ROOTPATH + "table"} component={Table} />
                    <Route path={Config.ROOTPATH + "btn"} component={Btn} />
                    <Route path={Config.ROOTPATH + "input"} component={Input} />
                    <Route path={Config.ROOTPATH + "select"} component={Select} />
                    <Route path={Config.ROOTPATH + "check"} component={CheckBox} />
                    <Route path={Config.ROOTPATH + "tip"} component={Tip} />

                    <Route path={Config.ROOTPATH + "sidePage"} component={_SidePage} />
                    <Route path={Config.ROOTPATH + "dialog"} component={_Dialog} />
                    <Route path={Config.ROOTPATH + "multyMenu"} component={_MultyMenu} />
                    <Route path={Config.ROOTPATH + "tipTool"} component={_TipTool} />
                    <Route path={Config.ROOTPATH + "pager"} component={_Pager} />
                    <Route path={Config.ROOTPATH + "loading"} component={_Loading} />
                    <Route path={Config.ROOTPATH + "modelDialog"} component={_ModelDialog} />
                    <Route path={Config.ROOTPATH + "breadNav"} component={_BreadNav} />
                    <Route path={Config.ROOTPATH + "slide"} component={_Slide} />

                    <Route path={Config.ROOTPATH + "search"} component={_Serach} />
                </Route>
            </Router>
        )
    }
}

export default Routers


