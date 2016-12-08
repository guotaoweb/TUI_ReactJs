import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import Table from "Table"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import Content, { openContentLoading, closeContentLoading } from "Content"

import back from "!url!./img/singleLeft.png"

class PositionMaintainRole extends React.Component {
    render() {
        const {sidePageInfo, rolesData, pageInfo, updatePageInfo} = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "角色名", "name3": "职责", "name4": "操作" },
            "tbody": []
        }
        if (rolesData) {
            for (var i = 0; i < rolesData.length; i++) {
                let _d = rolesData[i]
                let _index = pageInfo.positionMaintainRolePager ? pageInfo.positionMaintainRolePager.index : 1
                let _size = pageInfo.positionMaintainRolePager ? pageInfo.positionMaintainRolePager.size : 0
                tblContent.tbody.push({
                    "value1": (_index - 1) * _size + (i + 1),
                    "value2": _d.roleName,
                    "value3": _d.jobNames,
                    "fns": [{
                        "name": "编辑",
                        "fn": function () {
                            TUI.platform.get("/role/" + _d.roleId, function (result) {
                                if (result.code == 0) {
                                    let _data = result.data
                                    let _tips = []

                                    let jobIds = _data.jobIds.split(",")
                                    let jobNames = _data.jobNames.split(",")

                                    if (_data.jobIds.length > 0) {
                                        for (let j = 0; j < jobIds.length; j++) {
                                            let $i = jobIds[j]
                                            let $n = jobNames[j]

                                            _tips.push({
                                                name: $n,
                                                id: $i
                                            })
                                        }
                                        _this.props.addTip(eval(JSON.stringify(_tips)))
                                    }

                                    let _editInfo = {
                                        infoName: "rolesInfo",
                                        id: _d.roleId,
                                        name: _data.roleName,
                                        position: _tips,
                                        remark: _data.remark
                                    }
                                    _this.props.addEditInfo(_editInfo)
                                    _this.props.updateEditInfo({
                                        infoName: "rolesInfo",
                                        status: "edit",
                                        id: _d.roleId
                                    })

                                }
                                else if (result.code == 404) {
                                    _this.props.updatePositionMaintainRolesInfo([])
                                }
                                else {
                                    errorMsg(result.message)
                                }
                                _this.props.pushBreadNav({ name: _d.roleName })
                            })

                        }
                    }, {
                        "name": "删除",
                        "fn": function () {
                            let delFetch = function () {
                                TUI.platform.patch("/role/" + _d.roleId, function (result) {
                                    if (result.code == 0) {
                                        _this.props.successMsg("角色删除成功")
                                        _this.props.deletePositionMaintainRoles(_d.roleId)
                                        updatePageInfo({
                                            id: "positionMaintainRolePager",
                                            sum: parseInt(pageInfo.positionMaintainRolePager.sum) + 1
                                        })
                                    }
                                    else {
                                        errorMsg(result.errors)
                                    }
                                })
                            }

                            openDialog(_this, "是否确定删除【" + _d.roleName + "】", delFetch)
                        }
                    }]
                })
            }
        }
        return (
            <div>
                <div style={{ borderBottom: "1px solid #ebebeb", height: "50px", lineHeight: "50px", marginTop: "-10px" }}>
                    <span style={{ float: "left", fontSize: "20px" }}>
                        <img src={back} onClick={this.goBack.bind(this)} style={{ width: "25px", height: "25px", verticalAlign: "middle", marginTop: "-3px", cursor: "pointer" }} />
                        角色列表
                    </span>
                    <Btn style={{ float: "right" }} txt="新增" type="add" href={this.addPositionMaintainRole.bind(this)} />
                </div>
                <Table id="positionMaintainRole" bindPager="positionMaintainRolePager" tblContent={tblContent} width="50,200,0,100" />
                <Pager id="positionMaintainRolePager" fn={this.pageFn2.bind(this)} />
            </div>
        )
    }
    pageFn2(index, loadComplete) {
        const {pageInfo, addPositionMaintainRoles, updatePageInfo} = this.props

        let _pageSize = pageInfo["positionMaintainRolePager"] ? pageInfo["positionMaintainRolePager"].size : 10,
            _url = pageInfo.positionMaintainRolePager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", pageInfo.positionMaintainRolePager.size * (index - 1)), function (result) {
            if (result.code == 0) {
                addPositionMaintainRoles(result.data)
            }
            else if (result.code == 404) {
                addPositionMaintainRoles([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "positionMaintainRolePager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
        })

    }
    addPositionMaintainRole() {
        this.props.updateEditInfo({
            infoName: "rolesInfo",
            status: "add"
        })

        this.props.pushBreadNav({
            name: "新增角色"
        })
    }

    goBack() {
        this.props.clearEditInfo({
            infoName: "rolesInfo",
        })
        closeSidePage()
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    pageInfo: "publicInfo.pageInfo",
    rolesData: "positionMaintain.rolesData",
    editInfo: "formControlInfo.data"
}, PositionMaintainRole)
