import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router' // 路由

import TUI from './utils'

import Index from './pages/tui/index'
import Layout1 from './pages/tui/layout1'
import Layout2 from './pages/tui/layout2'
import Layout3 from './pages/tui/layout3'

import Table from './pages/tui/table'
import Btn from './pages/tui/btn'
import Input from './pages/tui/input'
import Select from './pages/tui/select'
import CheckBox from './pages/tui/check'
import Tip from './pages/tui/tip'

import _SidePage from './pages/tui/sidePage'
import _Dialog from './pages/tui/dialog'
import _MultyMenu from './pages/tui/multyMenu'
import _TipTool from './pages/tui/tipTool'
import _Pager from './pages/tui/pager'
import _Loading from './pages/tui/loading'
import _ModelDialog from './pages/tui/modelDialog'



class Routers extends Component {
    render() {
        const {history} = this.props
        return (
            <Router history={history}>
                <Route path={TUI.ROOTPATH} component={Index}>
                    <IndexRoute component={_SidePage} />
                    <Route path={TUI.ROOTPATH + "layout1"} component={Layout1} />
                    <Route path={TUI.ROOTPATH + "layout2"} component={Layout2} />
                    <Route path={TUI.ROOTPATH + "layout3"} component={Layout3} />

                    <Route path={TUI.ROOTPATH + "table"} component={Table} />
                    <Route path={TUI.ROOTPATH + "btn"} component={Btn} />
                    <Route path={TUI.ROOTPATH + "input"} component={Input} />
                    <Route path={TUI.ROOTPATH + "select"} component={Select} />
                    <Route path={TUI.ROOTPATH + "check"} component={CheckBox} />
                    <Route path={TUI.ROOTPATH + "tip"} component={Tip} />


                    <Route path={TUI.ROOTPATH + "sidePage"} component={_SidePage} />
                    <Route path={TUI.ROOTPATH + "dialog"} component={_Dialog} />
                    <Route path={TUI.ROOTPATH + "multyMenu"} component={_MultyMenu} />
                    <Route path={TUI.ROOTPATH + "tipTool"} component={_TipTool} />
                    <Route path={TUI.ROOTPATH + "pager"} component={_Pager} />
                    <Route path={TUI.ROOTPATH + "loading"} component={_Loading} />
                    <Route path={TUI.ROOTPATH + "modelDialog"} component={_ModelDialog} />
                </Route>
            </Router>
        )
    }
}

export default Routers

