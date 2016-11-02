import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"

class check extends Component {
    render() {

        return (
            <div>
                <Content txt="单选/多选">
                    <FormControls label="多选" ctrl="checkbox" txt="这是第一个问题" />
                    <FormControls label="单选" ctrl="radio"txt="这是第二个问题" groupName="test" />
                    <FormControls label="单选" ctrl="radio"txt="这是第三个问题"  groupName="test" />
                    <FormControls label="单选" ctrl="radio"txt="这是第四个问题(和其它单选问题不同组)" />
                </Content>
            </div>
        )
    }

    test1() {

    }

}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, check)