import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"

class Layout1 extends Component {
    render() {
        let options = [{"id":"1","name":"选项一"},{"id":"2","name":"选项二"},{"id":"3","name":"选项三"}]
        return (
            <div>
                <Content txt="下拉选择框">
                    <FormControls label="选择框" ctrl="select" options={options} txt="3" onChange={this.test1.bind(this) } />
                </Content>
            </div>
        )
    }

    test1() {

    }

}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, Layout1)