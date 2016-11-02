import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"
import Pager from "../../components/Pager/index"

class _Pager extends Component {
    render() {
        return (
            <div>
                <Content txt="Pager">
                    <Pager fn={this.theFn.bind(this)} />
                    
                </Content>
            </div>
        )
    }
    theFn(){
        
    }
    componentDidMount(){
        this.props.updatePageInfo({
            index:1,
            size:5,
            sum:10,
            url:""
        })
    }
}

export default TUI._connect({

}, _Pager)