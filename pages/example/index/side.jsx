import Side from 'Side'
import { browserHistory } from 'react-router'
import {openLoading} from 'Loading'
//图片
import xnzz from "!url!./img/xnzz.png"
import xnzzs from "!url!./img/xnzz-s.png"

class _Side extends React.Component {
    render() {
        const {sideStatus, userId, list} = this.props

        return (
            <Side list={list} title="TUI" />
        )
    }

    componentDidMount() {
        
        let list = [{
            id: "1",
            name: "页面内容布局",
            url: "#",
            icon: xnzz,
            sicon: xnzzs,
            sub: [{
                name: "布局1",
                url: Config.ROOTPATH + "layout1"
            }, {
                name: "布局2",
                url: Config.ROOTPATH + "layout2"
            }, {
                name: "布局3",
                url: Config.ROOTPATH + "layout3"
            }, {
                name: "布局4",
                url: Config.ROOTPATH + "layout4"
            }]
        }, {
            id: "2",
            name: "表单组件",
            url: "#",
            icon: xnzz,
            sicon: xnzzs,
            sub: [{
                name: "表格",
                url: Config.ROOTPATH + "table"
            }, {
                name: "按钮",
                url: Config.ROOTPATH + "btn"
            }, {
                name: "输入框",
                url: Config.ROOTPATH + "input"
            }, {
                name: "下拉框",
                url: Config.ROOTPATH + "select"
            }, {
                name: "选择框",
                url: Config.ROOTPATH + "check"
            }, {
                name: "标签",
                url: Config.ROOTPATH + "tip"
            }, {
                name: "滑动框",
                url: Config.ROOTPATH + "slide"
            }, {
                name: "搜索框",
                url: Config.ROOTPATH + "search"
            }]
        }, {
            id: "3",
            name: "常用插件",
            url: "#",
            icon: xnzz,
            sicon: xnzzs,
            sub: [{
                name: "SidePage",
                url: Config.ROOTPATH + "sidePage"
            }, {
                name: "Dialog",
                url: Config.ROOTPATH + "dialog"
            }, {
                name: "MultyMenu",
                url: Config.ROOTPATH + "multyMenu"
            }, {
                name: "TipTool",
                url: Config.ROOTPATH + "tipTool"
            }, {
                name: "Pager",
                url: Config.ROOTPATH + "pager"
            }, {
                name: "Loading",
                url: Config.ROOTPATH + "loading"
            }, {
                name: "modelDialog",
                url: Config.ROOTPATH + "modelDialog"
            }, {
                name: "breadNav",
                url: Config.ROOTPATH + "breadNav"
            }]
        }]
        this.props.addSide(list)
        browserHistory.push(Config.ROOTPATH + "table")
        openLoading(1)
    }

    getImg(src) {
        switch (src) {
            case "xnzz":
                return xnzz
            case "xnzzs":
                return xnzzs
            default:
                return xnzz
        }
    }
}

export default TUI._connect({
    list: "sideList.data",
    sideStatus: "publicInfo.sideStatus",
    userId: "publicInfo.userInfo.id"
}, _Side)