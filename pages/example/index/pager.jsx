import Content from "Content"
import Btn from "Btn"
import Pager from "Pager"
import SidePage, { closeSidePage, openSidePage } from 'SidePage'
import Table from "Table"

import React, { Component } from 'react'

class _Pager extends Component {
    render() {
        let _this = this
        const {list} = _this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "字段一", "name3": "字段二", "name4": "字段三", "name5": "操作" },
            "tbody": []
        }

        for (var index = 0; index < list.length; index++) {
            let $t = list[index]
            tblContent.tbody.push({
                "value1": index + 1,
                "value2": "1",
                "value3": "2",
                "value4": $t.name,
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
                <Content txt="Pager">
                    <Table id="table1" bindPager="tblPager" tblContent={tblContent} width="50,200,0,0,180" />
                    <Pager id="tblPager" fn={this.theFn.bind(this)} />
                    <div className="formControl-btn" style={{ marginLeft: "10px" }}>
                        <Btn
                            type="add"
                            txt="添加数据"
                            href={this._addData.bind(this)}
                            style={{ marginTop: "20px" }} />
                        <Btn
                            type="add"
                            txt="多Pager"
                            href={this._openSidePage.bind(this)}
                            style={{ marginTop: "20px" }} />
                    </div> <br /><br />
                    <br /><br />
                </Content>
                <SidePage id="pager-sidePage" title="多Pager">
                    <div>
                        <Pager id="pagerTwo" fn={this.theFn.bind(this)} />
                    </div>
                </SidePage>
            </div>
        )
    }
    theFn(loadComplete) {
        loadComplete()
    }
    _addData() {
        const {pushTableData, updatePageInfo, pageInfo} = this.props
        pushTableData({
            name: "==>这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        })
        updatePageInfo({
            id:"tblPager",
            sum: parseInt(pageInfo.tblPager.sum) + 1
        })

        console.info(pageInfo)
    }
    _openSidePage() {
        openSidePage(this, {
            id: "pager-sidePage",
            status: "pager-sidePage",
            width: "500"
        })
    }
    componentDidMount() {
        this.props.addTableData([{
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }])

        this.props.updatePageInfo({
            id:"tblPager",
            index: 1,
            size: 5,
            sum: 15,
            url: "#"
        })

        this.props.updatePageInfo({
            id: "pagerTwo",
            index: 1,
            size: 5,
            sum: 20,
            url: "#"
        })
    }
}

export default TUI._connect({
    pageInfo: "publicInfo.pageInfo",
    list: "tableList.data"
}, _Pager)