import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"
import TipTool from "../../components/TipTool/index"

class _TipTool extends Component {
    render() {
        return (
            <div>
                <Content txt="TipTool">
                    <Btn type="add" txt="成功" style={{ padding: "10px" }} href={this.successTheMsg.bind(this) } />
                    <Btn type="cancel" txt="失败" style={{ padding: "10px" }} href={this.errorTheMsg.bind(this) } />
                    <Btn type="check" txt="等待" style={{ padding: "10px" }} href={this.waiteTheMsg.bind(this) } />
                </Content>
            </div>
        )
    }

    successTheMsg() {
        const {successMsg} = this.props
        successMsg("设置成功")
    }
    errorTheMsg() {
        const {errorMsg} = this.props
        errorMsg("设置失败")
    }
    waiteTheMsg() {
        const {waiteMsg} = this.props
        waiteMsg("提交中,请稍等...")
    }
}

export default TUI._connect({

}, _TipTool)