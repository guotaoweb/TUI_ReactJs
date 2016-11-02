import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import {openDialog} from "../../components/Dialog/index"

class Layout2 extends Component {
    render() {
        let tabs = [{name:"选项一",id:"tabs1"},{name:"选项二",id:"tabs2"},{name:"选项三",id:"tabs3"}]
        return (
            <div>
                <Content2 tabs={tabs}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </Content2>
            </div>
        )
    }
}

export default TUI._connect({}, Layout2)