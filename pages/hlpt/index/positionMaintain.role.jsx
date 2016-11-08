import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import Table from "Table"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"

import back from "!url!./img/singleLeft.png"

class PositionMaintainRole extends React.Component {
    render() {
        const {sidePageInfo,rolesData, pageInfo} = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "角色名", "name3": "职责", "name4": "操作" },
            "tbody": []
        }
        if (rolesData) {
            for (var i = 0; i < rolesData.length; i++) {
                let _d = rolesData[i]
                tblContent.tbody.push({
                    "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                    "value2": _d.roleName,
                    "value3": _d.jobNames,
                    "fns": [{
                        "name": "编辑",
                        "fn": function () {
                            // _this.props.updatePositionMaintainRolesInfo({
                            //     status: "edit",
                            //     id: _d.roleId
                            // })

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

                                }
                                else {
                                    //_this.props.updatePositionMaintainRolesInfo([])
                                }
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
                <div style={{ borderBottom: "1px solid #ebebeb", height: "60px", lineHeight: "60px", marginTop: "-20px" }}>
                    <span style={{ float: "left", fontSize: "20px" }}>
                        <img src={back} onClick={this.goBack.bind(this)} style={{ width: "25px", height: "25px", verticalAlign: "middle", marginTop: "-3px", cursor: "pointer" }} />
                        角色列表
                    </span>
                    <Btn style={{ float: "right" }} txt="新增" type="add" href={this.addPositionMaintainRole.bind(this)} />
                </div>
                <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,200,0,100" />

            </div>
        )
    }

    addPositionMaintainRole() {
        this.props.updateEditInfo({
            infoName:"rolesInfo",
            status: "add"
        })
    }

    goBack() {
        this.props.cleareEditInfo({
            infoName:"rolesInfo",
        })
        closeSidePage()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    pageInfo: "publicInfo.pageInfo",
    rolesData: "positionMaintain.rolesData",
    editInfo:"formControlInfo.data"
}, PositionMaintainRole)
