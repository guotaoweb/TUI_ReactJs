import Side from 'Side'
import * as config from "config"

//图片
import xnzz from "!url!./img/xnzz.png"
import xnzzs from "!url!./img/xnzz-s.png"

class _Side extends React.Component {
    render() {
        const {sideStatus, userId,list} = this.props

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
                url: config.ROOTPATH + "layout1"
            }, {
                name: "布局2",
                url: config.ROOTPATH + "layout2"
            }, {
                name: "布局3",
                url: config.ROOTPATH + "layout3"
            }]
        }, {
            id: "2",
            name: "表单组件",
            url: "#",
            icon: xnzz,
            sicon: xnzzs,
            sub: [{
                name: "表格",
                url: config.ROOTPATH + "table"
            }, {
                name: "按钮",
                url: config.ROOTPATH + "btn"
            }, {
                name: "输入框",
                url: config.ROOTPATH + "input"
            }, {
                name: "下拉框",
                url: config.ROOTPATH + "select"
            }, {
                name: "选择框",
                url: config.ROOTPATH + "check"
            }, {
                name: "标签",
                url: config.ROOTPATH + "tip"
            }]
        }, {
            id: "3",
            name: "常用插件",
            url: "#",
            icon: xnzz,
            sicon: xnzzs,
            sub: [{
                name: "SidePage",
                url: config.ROOTPATH + "sidePage"
            }, {
                name: "Dialog",
                url: config.ROOTPATH + "dialog"
            }, {
                name: "MultyMenu",
                url: config.ROOTPATH + "multyMenu"
            }, {
                name: "TipTool",
                url: config.ROOTPATH + "tipTool"
            }, {
                name: "Pager",
                url: config.ROOTPATH + "pager"
            }, {
                name: "Loading",
                url: config.ROOTPATH + "loading"
            }, {
                name: "modelDialog",
                url: config.ROOTPATH + "modelDialog"
            }]
        }]
        this.props.addSide(list)
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
    list:"sideList.data",
    sideStatus: "publicInfo.sideStatus",
    userId: "publicInfo.userInfo.id"
}, _Side)