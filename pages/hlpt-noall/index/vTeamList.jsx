//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { clearCheckBox, updateCheckBoxStatus } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import { openLoading, closeLoading } from "Loading"
import VTeamListEdit from "./vTeamList.edit"
import VTeamListUserMenu from "./vTeamList.userMenu"
import Search from "Search"

class Manage extends React.Component {
    render() {
        const {
            vteamList,
            errorMsg,
            userId,
            router,
            sidePageInfo,
            updateVTeamId,
            updateEditInfo,
            pageInfo,
            delTeamList,
            addOSData
        } = this.props

        let _this = this
        let SidePageContent
        if (sidePageInfo.status == "editVTeam" || sidePageInfo.status == "addVTeam") {
            SidePageContent = <VTeamListEdit key="vteamlistedit" />
        }
        else {
            SidePageContent = <VTeamListUserMenu key="vteamlistusermenu" />
        }

        let tblContent = {
            "thead": { "name1": "序号", "name2": "虚拟组织名称", "name3": "简介", "name4": "管理员", "name5": "操作" },
            "tbody": []
        }

        for (var i = 0; i < vteamList.length; i++) {
            let _d = vteamList[i]

            let _admins = []
            for (var j = 0; j < _d.admins.length; j++) {
                _admins.push(_d.admins[j].username)
            }
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.team_name,
                "value3": _d.team_note,
                "value4": _admins.join(","),
                "fns": [{
                    "name": "编辑",
                    "fn": function() {
                        TUI.platform.get("/projectteam/team/" + _d.team_id, function(result) {
                            if (result.code == 0) {
                                var _d = result.datas[0]

                                updateEditInfo({
                                    infoName: "VTeamInfo",
                                    id: _d.team_id,
                                    code: _d.team_code,
                                    name: _d.team_name,
                                    note: _d.team_note
                                })

                                openSidePage(_this, {
                                    status: "editVTeam",
                                    width: ""
                                })
                            }
                            else {
                                errorMsg(Config.ERROR_INFO[result.code]);
                            }

                            _this.props.pushBreadNav({ name: _d.team_name })
                        })
                    }
                }, {
                    "name": "管理",
                    "fn": function() {
                        router.push(Config.ROOTPATH + "manage/" + _d.team_id)
                        _this.props.pushBreadNav({ name: _d.team_name })
                    }
                }, {
                    "name": "权限",
                    "fn": function() {
                        openContentLoading()
                        TUI.platform.get("/projectteam/permission/getpersons/" + _d.team_id, function(result) {
                            if (result.code == 0) {
                                let selectedArry = []
                                for (let i = 0; i < result.datas.length; i++) {
                                    let d = result.datas[i];
                                    selectedArry.push(d.power_value)
                                }
                                updateVTeamId(_d.team_id)
                                addOSData(selectedArry)
                            }
                            else {
                                //errorMsg(TUI.ERROR_INFO[result.code]);
                            }
                            openSidePage(_this, {
                                status: "vteamUserList",
                                width: "400"
                            })
                            closeContentLoading()
                        })

                    }
                }, {
                    "name": "删除",
                    "fn": function() {
                        var delFetch = function() {
                            TUI.platform.post("/projectteam/team", {
                                "uid": userId,
                                "team_id": _d.team_id,
                                "upper_team_id": "-1",
                                "del_flag": "y",
                                "opertype": "U"
                            }, function(result) {
                                if (result.code == 0) {
                                    delTeamList(_d.team_id)
                                }
                                else {
                                    errorMsg(TUI.ERROR_INFO[result.code]);
                                }
                            })
                        }
                        openDialog(_this, "是否确定删除【" + _d.team_name + "】", delFetch)
                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="虚拟组织列表" addHref={this.addVTeamList.bind(this)}>
                    <div>
                        <Search placeholder="请输入关键字(虚拟组织名称)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchVTeam.bind(this)} />
                        <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,200,0,0,180" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage>
                    {SidePageContent}
                </SidePage>
            </div>
        )
    }

    _searchVTeam(val) {
        let _this = this
        val = val ? "/projectteam/team/name/" + val + "/p" : "/projectteam/teams/all/1/7"
        TUI.platform.get(val, function(result) {
            if (result.code == 0) {
                if (result.code == 0) {
                    _this.props.addVTeamData(result.datas)

                    //搜索结果不分页
                    if (val.indexOf("all") > -1) {
                        _this.props.updatePageInfo({
                            index: 1,
                            size: 7,
                            sum: result.pagertotal,
                            url: "/projectteam/teams/all/{0}/7"
                        })
                    }
                }
                else if (result.code == 404) {
                    addVTeamData([])
                }
                else {
                    errorMsg(result.message)
                }
            }
        })
    }

    pageFn(index) {
        // let obj1 = { "pagertotal": "12", "code": "0", "msg": "", "datas": [{ "id": "CE7993D326454A52859BEE9D308CFBFA", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "wugf1202", "user_name": "吴高峰", "user_note": "领导", "del_flag": "n", "user_type": "1", "sort": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:42" }, { "id": "692A224422E44716A8B1B98E76463E29", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "dingjh0625", "user_name": "丁君辉", "user_note": "领导", "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:49" }, { "id": "C271D82C7BA14687A6BC92426C45F88F", "team_id": "1FD8F6E054B04D79AC30ADC81C8A5138", "user_id": "p_luob", "user_name": "罗柏", "user_note": null, "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_wenren", "last_modtime": "2016-07-04 18:18:21" }] }
        // this.props.addXNUserData(obj1.datas)
        //openDialog()
        const {pageInfo, updateVTeamData, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", index), function(result) {
            if (result.code == 0) {
                updateVTeamData(result.datas)
                updatePageInfo({
                    index: index,
                    size: 7,
                    sum: parseInt(result.pagertotal),
                    url: pageInfo.url
                })
            }
            else {
                updateVTeamData([])
            }
        })
    }

    componentDidMount() {
        // let data1 = { "pagertotal": "4", "code": "0", "msg": "", "datas": [{ "team_id": "F228F65C63D546A5B10CCE9D7AA6926C", "upper_team_id": "-1", "team_code": "HX01", "team_name": "和信移动互联平台项目组", "team_note": "和信移动互联平台", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:39:11", "ext1": "", "ext2": "", "team_users": "", "admins": [{ "userid": "wugf1202", "username": "吴高峰" }, { "userid": "p_wenren", "username": "文仁" }, { "userid": "p_guiyue", "username": "桌面端客服" }] }, { "team_id": "B00B0E5B96CB47CE974946491DDD6414", "upper_team_id": "-1", "team_code": "XX01", "team_name": "信息工程部常用联系人", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_wenren", "last_modtime": "2016-07-14 11:24:13", "ext1": "", "ext2": "", "team_users": "", "admins": [{ "userid": "wugf1202", "username": "吴高峰" }, { "userid": "dingjh0625", "username": "丁君辉" }, { "userid": "p_wenren", "username": "文仁" }] }, { "team_id": "82FC68C77C11495F8BC187BA5215B8DC", "upper_team_id": "-1", "team_code": "T1", "team_name": "虚拟组织测试", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_guiyue", "last_modtime": "2016-06-08 11:50:37", "ext1": "", "ext2": "", "team_users": "", "admins": {} }, { "team_id": "50FE5065CC994D9AA4740211C01D26AE", "upper_team_id": "-1", "team_code": "zy001", "team_name": "zy001", "team_note": "zy001", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_xjy", "last_modtime": "2016-06-13 16:38:10", "ext1": "", "ext2": "", "team_users": "", "admins": {} }] }
        // this.props.addVTeamData(data1.datas)

        const {addVTeamData, errorMsg, addOData, updateOData, vteamList, orgnization, updatePageInfo, updateSearchInfo} = this.props

        //获取虚拟组织列表
        //if (!vteamList) {
        openLoading()
        TUI.platform.get("/projectteam/teams/all/1/7", function(result) {
            if (result.code == 0) {
                addVTeamData(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 7,
                    sum: result.pagertotal,
                    url: "/projectteam/teams/all/{0}/7"
                })
                //更新搜索信息
                updateSearchInfo({
                    key: "",
                    name: "vteam",
                    info: "请输入关键字(虚拟组织名称)"
                })
                closeLoading()
            }
            else if (result.code == 9) {
                addVTeamData([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        }, this)
        //}



        //获取组织机构
        TUI.platform.post("/treenode/unittree", { "unitCode": "0", "isLoadUser": "false" }, function(result) {
            if (result.code == 0) {
                let _d = []
                for (var i = 0; i < result.datas.length; i++) {
                    var $d = result.datas[i];
                    _d.push({
                        id: $d.id,
                        name: $d.name,
                        type: $d.id,
                        isHadSub: "0",
                        deep: "1"
                    })
                }

                updateOData(_d)
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
        this.props.addBreadNav({ name: "虚拟组织管理" })
    }

    addVTeamList() {
        openSidePage(this, {
            status: "addVTeam",
            width: ""
        })
    }
}


export default TUI._connect({
    vteamList: "vteamList.data",
    orgnization: "orgnizations.odata",
    userId: "publicInfo.userInfo.userId",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    isRefreshPage: "publicInfo.isRefreshPage",
    editInfo: "formControlInfo.data"
}, Manage)