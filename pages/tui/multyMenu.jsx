import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"
import MultyMenu from "../../components/MultyMenu/index"

class _MultyMenu extends Component {
    render() {
        const {data} = this.props
        return (
            <div>
                <Content txt="MultyMenu">
                    <div style={{ width: "250px" }}>
                        <MultyMenu  data={data} type="edit" openSubMenu={this.openSubMenu.bind(this) } lastdeep="3" clickMenu={this.clickMenu.bind(this) } addMenu={this.addMenu.bind(this) } editMenu={this.editMenu.bind(this) } delMenu={this.delMenu.bind(this) } color="dark" style={{ marginTop: "10px" }} />
                    </div><br/>
                    <div>展开的对象级联关系: <span ref="showTxt1"></span></div>
                    <div>单击的对象: <span ref="showTxt2"></span></div>
                    <div>编辑状态: <span ref="showTxt3"></span></div>
                </Content>

            </div>
        )
    }

    openSubMenu(data, id, deep, loadComplete) {
        let $showTxt = ReactDOM.findDOMNode(this.refs.showTxt1)
        $showTxt.innerHTML = deep
    }

    clickMenu($m) {
        let $showTxt2 = ReactDOM.findDOMNode(this.refs.showTxt2)
        $showTxt2.innerHTML = $m.getAttribute("data-name")
    }

    addMenu(param) {
        let $showTxt = ReactDOM.findDOMNode(this.refs.showTxt3)
        $showTxt.innerHTML = "单击了新增,父级-"+param.ext1
    }

    editMenu(param) {
        console.info(param)
        let $showTxt = ReactDOM.findDOMNode(this.refs.showTxt3)
        $showTxt.innerHTML = "单击了编辑,父级-"+param.ext1
    }

    delMenu(param) {
        let $showTxt = ReactDOM.findDOMNode(this.refs.showTxt3)
        $showTxt.innerHTML = "单击了删除,父级-"+param.ext1
    }

    componentDidMount() {
        let multyMenuData = [{
            id: "1",
            name: "菜单一",
            deep: 1,
            isHadSub: "0",
            type: "0",
            ext1: "菜单一",
            children: [{
                id: "11",
                name: "项目一",
                deep: 2,
                isHadSub: "1",
                ext1: "项目一"
            }, {
                    id: "12",
                    name: "项目二",
                    deep: 2,
                    isHadSub: "1",
                    ext1: "项目二"
                }, {
                    id: "13",
                    name: "项目三",
                    deep: 2,
                    isHadSub: "1",
                    ext1: "项目三"
                }]
        }, {
                id: "2",
                name: "菜单二",
                deep: 1,
                isHadSub: "0",
                ext1: "菜单二"
            }, {
                id: "3",
                name: "菜单三",
                deep: 1,
                isHadSub: "0",
                ext1: "菜单三"
            }]

        this.props.addMultyMenuData(multyMenuData)
    }
}

export default TUI._connect({
    data: "multyMenu.data"
}, _MultyMenu)