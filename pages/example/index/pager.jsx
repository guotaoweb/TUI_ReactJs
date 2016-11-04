import Content from "Content"
import Btn from "Btn"
import Pager from "Pager"
import SidePage, { closeSidePage, openSidePage } from 'SidePage'


import React, { Component } from 'react'

class _Pager extends Component {
    render() {
        console.info("==")
        console.info(this.props.pageInfo)
        return (
            <div>
                <Content txt="Pager">
                    <Pager fn={this.theFn.bind(this)} />
                    <Btn
                        type="add"
                        txt="打开OpenSidePage"
                        href={this._openSidePage.bind(this)}
                        style={{ marginTop: "20px" }} />
                </Content>
                <SidePage id="pager-sidePage">
                    <div>
                        <Pager id="pagerTwo" fn={this.theFn.bind(this)} />
                        <Btn
                            type="add"
                            txt="关闭OpenSidePage"
                            href={closeSidePage}
                            style={{ marginTop: "20px", marginLeft: "10px" }} />
                    </div>
                </SidePage>
            </div>
        )
    }
    theFn(loadComplete) {
        loadComplete()
    }
    _openSidePage() {
        openSidePage(this, {
            id: "pager-sidePage",
            status: "pager-sidePage",
            width: "500"
        })
    }
    componentDidMount() {

        this.props.updatePageInfo({
            index: 1,
            size: 5,
            sum: 10,
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
    pageInfo: "publicInfo.pageInfo"
}, _Pager)