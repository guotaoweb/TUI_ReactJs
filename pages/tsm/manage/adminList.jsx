//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import EditAdmin from "./adminList.edit"

class AdminList extends React.Component {
    render() {
        const {
            adminList,
            deleteAdminList,
            updateAdminList,
            errorMsg,
            updateSidePageInfo,
            sidePageInfo,
            pageInfo,
            successMsg,
            addEditInfo,
            updatePageInfo
        } = this.props

        let _editAdmin,
            _this = this
        if (sidePageInfo.status == "editAdmin" || sidePageInfo.status == "addAdmin") {
            _editAdmin = <EditAdmin key="adminlistedit" />
        }


        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "登陆错误次数", "name4": "状态", "name5": "操作" },
            "tbody": []
        }

        for (var i = 0; i < adminList.length; i++) {
            let _d = adminList[i]

            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.UserName,
                "value3": _d.AccessFailedCount,
                "value4": _d.LockoutEnabled==0 ? "正常" : "锁定",
                "fns": [{
                    "name": "重置密码",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.put("/ResetPassword/" + _d.Id, {}, function (result) {
                                if (result.code == 0) {
                                    successMsg(result.msg)
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                            })
                        }
                        openDialog(_this, "是否确定要重置【" + _d.UserName + "】?", delFetch)
                    }
                }, {
                    "name": "编辑",
                    "fn": function () {
                        openContentLoading()
                        TUI.platform.get("/User/" + _d.Id, function (result) {
                            if (result.code == 0) {
                                var _d = result.datas[0]
                                addEditInfo({
                                    infoName: "userInfo",
                                    Id: _d.Id,
                                    UserName: _d.UserName,
                                    LockoutEnabled: _d.LockoutEnabled
                                })

                                openSidePage(_this, {
                                    status: "editAdmin",
                                    gateWay: {
                                        id: _d.Id
                                    }
                                })
                            }
                            else {
                                errorMsg(Config.ERROR_INFO[result.code]);
                            }
                            closeContentLoading()
                        })
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.delete("/User/" + _d.Id, function (result) {
                                if (result.code == 0) {
                                    deleteAdminList(_d.Id)
                                    updatePageInfo({
                                        sum: parseInt(pageInfo.index.sum) - 1
                                    })
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                            })
                        }
                        openDialog(_this, "是否确定删除【" + _d.UserName + "】", delFetch)
                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="管理员列表" addHref={this.addAdmin.bind(this)}>
                    <div>
                        <Table tblContent={tblContent} width="50,0,250,250,180" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage>
                    <div>
                        {_editAdmin}
                    </div>
                </SidePage>
            </div>
        )
    }

    pageFn(index, loadComplete) {
        const {pageInfo, updateAdminList, errorMsg, updatePageInfo} = this.props
        // TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
        //     if (result.code == 0) {
        //         updateAdminList(result.datas)
        //         updatePageInfo({
        //             index: index,
        //             size: 10,
        //             sum: parseInt(result.total),
        //             url: pageInfo.url
        //         })
        //     }
        //     else if (result.code == 1) {
        //         updateAdminList([])
        //     }
        //     else {
        //         errorMsg(Config.ERROR_INFO[result.code])
        //     }
        // })
    }

    componentDidMount() {
        const {loadAdminList, errorMsg, updatePageInfo} = this.props

        //获取管理员列表
        let url = "/User?pageIndex={0}&pageSize=10"

        TUI.platform.get(url.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                loadAdminList(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result.total,
                    url: url
                })
            }
            else if (result.code == 1) {
                loadAdminList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code])
            }
        })
    }

    addAdmin() {
        const {addEditInfo} = this.props
        openSidePage(this, {
            status: "addAdmin",
            width: ""
        })
        addEditInfo({
            infoName: "userInfo",
            LockoutEnabled: 1
        })
    }
}


export default TUI._connect({
    adminList: "adminList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, AdminList)


// , {
//                     "name": "权限",
//                     "fn": function () {
//                         openSidePage(_this,{
//                             status: "vteamUserList",
//                             width: "400"
//                         })

//                         // TUI.platform.get("/projectteam/permission/getpersons/" + _d.team_id, function (result) {
//                         //     if (result.code == 0) {
//                         //         let selectedArry = []

//                         //         updateAdminList(_d.team_id)
//                         //     }
//                         //     else {
//                         //         //errorMsg(TUI.ERROR_INFO[result.code]);
//                         //     }
//                         // })

//                     }
//                 }