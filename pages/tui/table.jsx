import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Table from "../../components/Table/index"
import Pager from "../../components/Pager/index"
import {openDialog} from "../../components/Dialog/index"

class TablePage extends Component {
    render() {
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "字段一", "name3": "字段二", "name4": "字段三", "name5": "操作" },
            "tbody": []
        }

        for (var index = 0; index < 10; index++) {
            tblContent.tbody.push({
                "value1": index + 1,
                "value2": "1",
                "value3": "2",
                "value4": "3",
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openDialog(_this, "这是编辑按钮")
                    }
                }, {
                        "name": "删除",
                        "fn": function () {
                            openDialog(_this, "这是删除按钮")
                        }
                    }]
            })

        }

        return (
            <div>
                <Content txt="Table表格">
                    <Table tblContent={tblContent} width="50,200,0,0,0,180"/>
                    <Pager fn={this.pageFn.bind(this) } style={{ float: "right", marginRight: "5px" }}/>
                </Content>
            </div>
        )
    }

    pageFn() {

    }

    componentDidMount() {
        this.props.updatePageInfo({
            index: 1,
            size: 5,
            sum: 100,
            url: ""
        })
    }
}

export default TUI._connect({

}, TablePage)