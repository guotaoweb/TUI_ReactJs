import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"



class Layout1 extends Component {
    render() {
        return (
            <div>
                <Content txt="Btn按钮">
                    <Btn type="add" style={{padding:"10px"}} txt="新增" />
                    <Btn type="edit" style={{padding:"10px"}} txt="编辑" />
                    <Btn type="cancel" style={{padding:"10px"}} txt="取消" />
                    <Btn type="back" style={{padding:"10px"}} txt="返回" />
                    <Btn type="submit" style={{padding:"10px"}} txt="保存" />
                    <Btn style={{padding:"10px"}} txt="保存" />
                    <Btn style={{padding:"10px"}} width="100" txt="保存" />
                </Content>
            </div>
        )
    }
}

export default TUI._connect({

}, Layout1)