import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"


class _TipTool extends Component {
    render() {
        
        return (
            <div>
                <Content txt="标签">
                    <FormControls label="Tip" ctrl="tip" txt={this.props.tips} deleteFn={this.deleteFn.bind(this)} addFn={this.addFn.bind(this)} />
                </Content>
            </div>
        )
    }
    addFn() {
        this.props.pushTip([{ name: "test", id: "4" }, { name: "测试1", id: "5" }])
    }

    deleteFn(id){
        this.props.deleteTip(id)
    }

    componentDidMount(){
        let _txt = [{ name: "test", id: "1" }, { name: "测试1", id: "2" }]
        this.props.pushTip(_txt)
    }
}

export default TUI._connect({
    tips:"publicInfo.tips"
}, _TipTool)