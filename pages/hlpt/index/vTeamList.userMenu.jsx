
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

import Btn from "Btn"
import { closeSidePage } from "SidePage"

//图片
import singleLeft from "!url!./img/singleLeft.png"
import MultyMenu from "../../components/MultyMenu/index"


class VTeamListUserMenu extends React.Component {
    render() {
        const {odata, osdata, updateOData, hasVerticalScroll} = this.props
        //let odata1 = [{name:"测试1",id:"1"},{"name":"测试2","id":"2"}]

        return (
            <div key="content2_userList" >
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />添加虚拟组织权限</span>
                    <Btn style={{ float: "right" }} txt="保存" href={this.saveOrgnizationSelected.bind(this)} />
                </div>
                <div ref="scrollContent">
                    <ReactIScroll iScroll={iScroll} options={{
                        mouseWheel: true,
                        scrollbars: hasVerticalScroll
                    }} onRefresh={this.onScrollRefresh.bind(this)}>
                        <div>
                            <MultyMenu data={odata} sdata={osdata} openSubMenu={this.openSubMenu.bind(this)} type="allcheck" lastdeep="3" color="dark" style={{ marginTop: "10px" }} />
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
        const {errorMsg, successMsg, userId, teamId, clearOSData, preventSubmit} = this.props
        if (preventSubmit) {
            return false
        }
        var $checkbox = document.getElementsByClassName("menu_checkbox")
        var additem = [];
        var deleteitem = [];
        for (var index = 0; index < $checkbox.length; index++) {
            var c = $checkbox[index];
            if (c.getAttribute("data-status") == "check" && c.getAttribute("data-selected") != "true") {
                let mid = c.getAttribute("data-mid")
                let mtype = c.getAttribute("data-mtype")
                additem.push({ "power_type": mtype == "UNIT" ? "0" : "1", "power_value": mid })
            }
            if (c.getAttribute("data-status") == "uncheck" && c.getAttribute("data-selected") == "true") {
                let mid = c.getAttribute("data-mid")
                let mtype = c.getAttribute("data-mtype")
                deleteitem.push({ "power_value": mid, "power_type": mtype == "UNIT" ? "0" : "1" })
            }
        }

        if (additem.length > 0 || deleteitem.length > 0) {
            //选中管理员或组织
            TUI.platform.post("/projectteam/permission/persons", {
                "team_id": teamId,
                "last_modid": userId,
                "additem": additem,
                "deleteitem": deleteitem
            }, function (result) {
                if (result.code == 0) {
                    addOData(result.datas)
                    successMsg("虚拟组织权限设置成功.");
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })

        }
        this._closeSidePage()
    }

    openSubMenu(data, id, deep, loadComplete) {
        const {updateOData, odata} = this.props
        for (let index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == id) {
                let jsonParam = {
                    "unitCode": id,
                    "isLoadUser": deep == 2 ? "true" : "false"
                }
          
                TUI.platform.post("/treenode/unittree", jsonParam, function (result) {
                    if (result.code == 0) {
                        
                        let _d = []
                        for (var i = 0; i < result.datas.length; i++) {
                            var $d = result.datas[i];
                            _d.push({
                                id: $d.id,
                                name: $d.name,
                                type: $d.id,
                                isHadSub: "0",
                                deep: parseInt(deep) + 1
                            })
                        }
                        d.children = _d
                        updateOData(odata)
                        loadComplete()
                    }
                })
                break
            }
        }
    }
}

export default TUI._connect({
    odata: "orgnizations.odata",
    osdata: "orgnizations.osdata",
    userId: "publicInfo.userInfo.id",
    teamId: "vteamList.detail.id",
    preventSubmit: "publicInfo.msgInfo.txt",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll"
}, VTeamListUserMenu)
