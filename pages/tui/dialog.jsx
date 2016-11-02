import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"
import {openDialog} from "../../components/Dialog/index"

class _Dialog extends Component {
    render() {
        return (
            <div>
                <Content txt="Dialog">
                    <Btn type="add" txt="弹出Dialog【text】" href={this._openDialog1.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【confirm】" href={this._openDialog2.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【prompt】" href={this._openDialog3.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【list】" href={this._openDialog4.bind(this) } style={{ padding: "10px" }}/>
                </Content>
            </div>
        )
    }

    _openDialog1() {
        openDialog(this,"这是Dialog弹窗")
    }
     _openDialog2() {
        openDialog(this,"这是Dialog弹窗",function(){})
    }
    _openDialog3() {
        openDialog(this,{type:"txtarea",placeholder:"请输入内容..."},function(){})
    }
    _openDialog4() {
        openDialog(this,{title:"这是标题",data:[{name:"选项一"}]})
    }
}

export default TUI._connect({

}, _Dialog)