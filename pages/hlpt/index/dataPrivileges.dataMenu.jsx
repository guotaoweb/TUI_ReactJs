import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

import Btn from "Btn"
import { closeSidePage } from "SidePage"
import MultyMenu from "MultyMenu"

import singleLeft from "!url!./img/singleLeft.png"

class DataPrivilegesDataMenu extends React.Component {
    render() {
        const {odata, osdata, updateOData, hasVerticalScroll} = this.props

        return (
            <div key="content2_userList" >
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />组织机构</span>
                    <Btn style={{ float: "right" }} txt="保存" href={this.saveOrgnizationSelected.bind(this)} />
                </div>
                <div ref="scrollContent">
                    <ReactIScroll iScroll={iScroll} options={{
                        mouseWheel: true,
                        scrollbars: hasVerticalScroll
                    }} onRefresh={this.onScrollRefresh.bind(this)}>
                        <div>
                            <MultyMenu data={odata} sdata={osdata} openSubMenu={this.openSubMenu.bind(this)} type="allcheck" lastdeep="5" color="dark" style={{ marginTop: "10px" }} />
                            <br />
                        </div>
                    </ReactIScroll>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let $scrollContent = ReactDOM.findDOMNode(this.refs.scrollContent)
        let header = document.querySelector(".t-header")
        header = header ? header.offsetHeight : 0
        let contentTitle = document.querySelector(".t-content_t")
        contentTitle = contentTitle ? contentTitle.offsetHeight : 0
        $scrollContent.style.height = document.documentElement.clientHeight - header - contentTitle + "px"
    }

    _closeSidePage() {
        const {clearOSData} = this.props
        clearOSData()
        closeSidePage()
    }

    onScrollRefresh(iScrollInstance, $this) {
        this.props.setCanVerticallyScroll(iScrollInstance.hasVerticalScroll)
    }

    saveOrgnizationSelected() {
        const {errorMsg, successMsg, userId, cUserId} = this.props
       
        let $checkbox = document.getElementsByClassName("menu_checkbox"),
            additem = [],
            _this = this

        for (let index = 0; index < $checkbox.length; index++) {
            let c = $checkbox[index];
            if (c.getAttribute("data-status") == "check") {
                let mid = c.getAttribute("data-mid")
                let mtype = c.getAttribute("data-mtype")
                additem.push(mtype)
            }

        }

        if (additem.length > 0) {
            //选中管理员或组织
            TUI.platform.post("/dataprivileges", {
                "loginUid": cUserId,
                "dataPrivileges": additem.join(",")
            }, function (result) {
                if (result.code == 0) {
                    successMsg("权限分配成功")
                    _this._closeSidePage()
                }
                else {
                    errorMsg(result.message)
                }
            })

        }
        else{
            _this._closeSidePage()
        }
        
    }

    openSubMenu(_data, id, deep, loadComplete) {
        const {addData, odata, updateOData} = this.props
        for (let index = 0; index < _data.length; index++) {
            let d = _data[index]

            if (d.id == id) {
                TUI.platform.get("/units/tree/" + id, function (result) {
                    if (result.code == 0) {
                        let children = []
                        let _deep = parseInt(deep) + 1
                        for (var j = 0; j < result.data.length; j++) {
                            var $s = result.data[j];
                            children.push({
                                id: $s.id,
                                name: $s.name,
                                type: $s.unitCode,
                                isHadSub: $s.isleaf,
                                ext1: $s.unitLevel,
                                deep: _deep,
                                sId:$s.unitCode
                            })
                        }
                        d.children = children

                        loadComplete()
                        updateOData(odata)
                    }
                })
                break
            }
        }
    }
}

export default TUI._connect({
    odata: "orgnizations.odata",
    osdata:  "orgnizations.osdata",
    userId: "publicInfo.userInfo.id",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
    cUserId:"publicInfo.sidePageInfo.gateWay",
}, DataPrivilegesDataMenu)
