//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content2 from "Content2"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, {clearCheckBox, updateCheckBoxStatus} from "MultyMenu"
import SidePage, {openSidePage, closeSidePage} from "SidePage"
import {openDialog, closeDialog} from "Dialog"
import EditClasses from "./classesList.edit"

import Pager, {pageLoadCompelte} from "Pager"

class ClassesList extends React.Component {
    render() {
        const {
            vteamList,
            errorMsg,
            updateSidePageInfo,
            userId, history,
            updateDialog,
            sidePageInfo,
            updateVTeamId,
            updateVTeamInfo,
            pageInfo,
            delTeamList,
            addOSData
        } = this.props

        let SidePageContent
        if (sidePageInfo.status == "editClasses" || sidePageInfo.status == "addClasses") {
            SidePageContent = <EditClasses key="adminlistedit"/>
        }
        else {
            SidePageContent = <VTeamListUserMenu key="vteamlistusermenu"/>
        }

        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "人数", "name4": "操作" },
            "tbody": []
        }

        for (var i = 0; i < vteamList.length; i++) {
            let _d = vteamList[i]

            let _admins = []
            for (var j = 0; j < _d.admins.length; j++) {
                _admins.push(_d.admins[j].username)
            }
            tblContent.tbody.push({
                "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                "value2": _d.team_name,
                "value3": _d.team_note,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        updateSidePageInfo({
                            status: "editClasses",
                            width: ""
                        })
                        openSidePage()
                        // TUI.platform.get("/projectteam/team/" + _d.team_id, function (result) {
                        //   if (result.code == 0) {
                        //     var _d = result.datas[0]
                        //     updateVTeamInfo({
                        //       id: _d.team_id,
                        //       code: _d.team_code,
                        //       name: _d.team_name,
                        //       note: _d.team_note
                        //     })

                        //     openSidePage()
                        //   }
                        //   else {
                        //     errorMsg(config.ERROR_INFO[result.code]);
                        //   }
                        // })
                    }
                }, {
                        "name": "权限",
                        "fn": function () {
                            updateSidePageInfo({
                                status: "vteamUserList",
                                width: "400"
                            })
                            openSidePage()

                            TUI.platform.get("/projectteam/permission/getpersons/" + _d.team_id, function (result) {
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
                            })

                        }
                    }, {
                        "name": "删除",
                        "fn": function () {
                            var delFetch = function () {
                                TUI.platform.post("/projectteam/team", {
                                    "uid": userId,
                                    "team_id": _d.team_id,
                                    "upper_team_id": "-1",
                                    "del_flag": "y",
                                    "opertype": "U"
                                }, function (result) {
                                    if (result.code == 0) {
                                        delTeamList(_d.team_id)
                                    }
                                    else {
                                        errorMsg(TUI.ERROR_INFO[result.code]);
                                    }
                                })
                            }
                            // var delFetch = function () {
                            //   console.info("删除")
                            // }
                            updateDialog("是否确定删除【" + _d.team_name + "】")
                            openDialog(delFetch)
                        }
                    }]
            })
        }
        let tabs = [{ name: "初一" },{ name: "初二" },{ name: "初三" },{ name: "高一" },{ name: "高二" },{ name: "高三" }]
        return (
            <div>
                <Content2 tabs={tabs}>
                    <div className="t-content_t" style={{height:"40px",lineHeight:"30px",marginTop:"-10px"}}>
                        <span>班级列表</span>
                        <Btn type="add" txt="新增" href={this.addClasses.bind(this)} style={{float:"right"}} />
                    </div>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,200,0,180"/>
                    <Pager fn={this.pageFn.bind(this) }/>
                </Content2>
                <SidePage>
                    {SidePageContent}
                </SidePage>
            </div>
        )
    }

    pageFn(index) {
        // let obj1 = { "pagertotal": "12", "code": "0", "msg": "", "datas": [{ "id": "CE7993D326454A52859BEE9D308CFBFA", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "wugf1202", "user_name": "吴高峰", "user_note": "领导", "del_flag": "n", "user_type": "1", "sort": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:42" }, { "id": "692A224422E44716A8B1B98E76463E29", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "dingjh0625", "user_name": "丁君辉", "user_note": "领导", "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:49" }, { "id": "C271D82C7BA14687A6BC92426C45F88F", "team_id": "1FD8F6E054B04D79AC30ADC81C8A5138", "user_id": "p_luob", "user_name": "罗柏", "user_note": null, "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_wenren", "last_modtime": "2016-07-04 18:18:21" }] }
        // this.props.addXNUserData(obj1.datas)
        openDialog()
        const {pageInfo, updateVTeamData, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
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
        let data1 = { "pagertotal": "4", "code": "0", "msg": "", "datas": [{ "team_id": "F228F65C63D546A5B10CCE9D7AA6926C", "upper_team_id": "-1", "team_code": "HX01", "team_name": "和信移动互联平台项目组", "team_note": "和信移动互联平台", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:39:11", "ext1": "", "ext2": "", "team_users": "", "admins": [{ "userid": "wugf1202", "username": "吴高峰" }, { "userid": "p_wenren", "username": "文仁" }, { "userid": "p_guiyue", "username": "桌面端客服" }] }, { "team_id": "B00B0E5B96CB47CE974946491DDD6414", "upper_team_id": "-1", "team_code": "XX01", "team_name": "信息工程部常用联系人", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_wenren", "last_modtime": "2016-07-14 11:24:13", "ext1": "", "ext2": "", "team_users": "", "admins": [{ "userid": "wugf1202", "username": "吴高峰" }, { "userid": "dingjh0625", "username": "丁君辉" }, { "userid": "p_wenren", "username": "文仁" }] }, { "team_id": "82FC68C77C11495F8BC187BA5215B8DC", "upper_team_id": "-1", "team_code": "T1", "team_name": "虚拟组织测试", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_guiyue", "last_modtime": "2016-06-08 11:50:37", "ext1": "", "ext2": "", "team_users": "", "admins": {} }, { "team_id": "50FE5065CC994D9AA4740211C01D26AE", "upper_team_id": "-1", "team_code": "zy001", "team_name": "zy001", "team_note": "zy001", "del_flag": "n", "sort": "99", "state": "1", "last_modid": "p_xjy", "last_modtime": "2016-06-13 16:38:10", "ext1": "", "ext2": "", "team_users": "", "admins": {} }] }
        this.props.addVTeamData(data1.datas)

        const {addVTeamData, alertMsg, addOData, vteamList, orgnization, updatePageInfo} = this.props

        //获取虚拟组织列表
        //if (!vteamList) {
        TUI.platform.get("/projectteam/teams/all/1/7", function (result) {
            if (result.code == 0) {
                addVTeamData(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 7,
                    sum: result.pagertotal,
                    url: "/projectteam/teams/all/{0}/7"
                })
            }
            else if (result.code == 9) {
                addVTeamData([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
        //}

        if (!orgnization) {
            //获取组织机构
            TUI.platform.post("/treenode/unittree", { "unitCode": "0", "isLoadUser": "false" }, function (result) {
                if (result.code == 0) {
                    addOData(result.datas)
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
        }
    }





    addClasses() {
        const {updateSidePageInfo, preventSubmit} = this.props

        updateSidePageInfo({
            status: "addClasses",
            width: ""
        })

        openSidePage()
    }
}


export default TUI._connect({
    vteamList: "vteamList.data",
    orgnization: "orgnizations.odata",
    userId: "publicInfo.userInfo.userId",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesList)