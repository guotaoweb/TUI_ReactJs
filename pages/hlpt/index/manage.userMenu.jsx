import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import MultyMenu from "MultyMenu"

import singleLeft from "!url!./img/singleLeft.png"

class ManageUserMenu extends React.Component {
    render() {
        const {odata, osdata, hasVerticalScroll} = this.props
        return (
            <div key="content2_userList">
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />新增项目组成员</span>
                    <Btn style={{ float: "right" }} txt="保存" href={this.saveSelectedPerson.bind(this)} />
                </div>

                <div>
                    <MultyMenu sdata={osdata} data={odata} type="lastcheck" lastdeep="3" color="dark" openSubMenu={this.openSubMenu.bind(this)} style={{ marginTop: "10px" }} />
                    <br />
                </div>
            </div>
        )
    }

    saveSelectedPerson() {
        var $checkbox = document.getElementsByClassName("menu_checkbox")
        var additem = [];
        var deleteitem = [];
        for (var index = 0; index < $checkbox.length; index++) {
            var c = $checkbox[index];
            if (c.getAttribute("data-status") == "check" && c.getAttribute("data-selected") != "true") {
                let mid = c.getAttribute("data-mid")
                let mtype = c.getAttribute("data-mtype")
                let mname = c.getAttribute("data-mtype")
                additem.push({ "user_type": 0, "user_id": mid, "user_name": mname, "sort": "999" })
            }
            if (c.getAttribute("data-status") == "uncheck" && c.getAttribute("data-selected") == "true") {
                let mid = c.getAttribute("data-mid")
                let mtype = c.getAttribute("data-mtype")
                deleteitem.push({ "user_id": mid, "user_type": 0, "sort": "" })
            }
        }

        if (additem.length > 0 || deleteitem.length > 0) {
            const {data, relateId, successMsg, errorMsg, addOSData, teamId, userId, updateUserInVTeam, pageInfo, updatePageInfo} = this.props
            //选中管理员或组织
            let _params = {
                "team_id": teamId,
                "last_modid": userId,
                "last_modtime": TUI.fn.currentTime(),
                "usersadd": additem,
                "usersdelete": deleteitem
            }
            let _this = this

            TUI.platform.post("/projectteam/persons", _params, function (result) {
                if (result.code == 0) {
                    successMsg("成功设置虚拟组成员.");
                    //选择虚拟子组织人员后,需要做的事情有如下三步:
                    //1:更新人员列表
                    //updateUserInVTeam(additem, deleteitem)
                    //2:更新分页总数
                    _this.loadSubVTeamList(teamId)
                    //3:更新虚拟子组织统计人数
                    //addSubVTeamData
                    let num = pageInfo.sum + additem.length - deleteitem.length

                    _this.updateSubVTeamUserSum(data, relateId.split("-"), num, _this)
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
        }
        this._closeSidePage()
    }

    _closeSidePage() {
        const {clearOSData} = this.props
        clearOSData()
        closeSidePage()
    }


    componentDidMount() {
        // let $scrollContent = ReactDOM.findDOMNode(this.refs.scrollContent)
        // let header = document.querySelector(".t-header")
        // header = header ? header.offsetHeight : 0
        // let contentTitle = document.querySelector(".t-content_t")
        // contentTitle = contentTitle ? contentTitle.offsetHeight : 0
        // $scrollContent.style.height = document.documentElement.clientHeight - header - contentTitle + "px"
    }

    loadSubVTeamList(id) {
        const {updateSubVTeamId, addUserInVTeam, updatePageInfo} = this.props
        updateSubVTeamId(id)
        TUI.platform.get("/projectteam/persons/" + id + "/1/6", function (result) {
            if (result.code == 0) {
                addUserInVTeam(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 6,
                    sum: parseInt(result.pagertotal),
                    url: "/projectteam/persons/" + id + "/{0}/6"
                })
            }
            else {
                addUserInVTeam([])
            }
        })
    }

    openSubMenu(data, id, deep, loadComplete) {
        const {updateOData, odata} = this.props
        for (let index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == id) {
                TUI.platform.post("/treenode/unittree", { "unitCode": id, "isLoadUser": deep == 2 ? "true" : "false" }, function (result) {
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

    updateSubVTeamUserSum(_data, deep, num, $this) {
        if (deep.length == 1) {
            for (let i = 0; i < _data.length; i++) {
                let d = _data[i]
                if (d.id == deep[0]) {
                    d.num = num
                    $this.props.addSubVTeamData(eval(JSON.stringify($this.props.data)))
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < _data.length; index++) {
            let d = _data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateSubVTeamUserSum(d.children, deep, num, $this)
            }
        }
    }
}



export default TUI._connect({
    data: "manages.data",
    odata: "orgnizations.odata",
    osdata: "orgnizations.osdata",
    sidePageInfo: "publicInfo.sidePageInfo",
    userId: "publicInfo.userInfo.id",
    teamId: "manages.detail.id",
    relateId: "manages.detail.relateId",
    pageInfo: "publicInfo.pageInfo",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll"
}, ManageUserMenu)
