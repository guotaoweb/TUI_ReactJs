import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import {openDialog} from "../../components/Dialog/index"

class Layout1 extends Component {
    render() {
        return (
            <div>
                <Content txt="这是Content的标题" addHref={this._openDialog.bind(this) }>
                    这是Content的内容区域<br/>
                    --<b>addHref</b>属性决定是否显示新增按钮<br/>
                    --<b>txt</b>属性为title的文本内容
                </Content>
            </div>
        )
    }

    _openDialog() {
        openDialog(this,"这是Dialog内容")
    }
}

export default TUI._connect({

}, Layout1)