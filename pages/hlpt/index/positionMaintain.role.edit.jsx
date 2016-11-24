import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

class PositionMaintainRoleEdit extends React.Component {
    render() {
        const {tips} = this.props

        return (
            <div>
                <FormControls label="角色名称" ctrl="input" onFocus={this.closeSelectList} value="rolesInfo.name" required="required" />
                <FormControls label="关联职责" ctrl="tip" txt={tips} addFn={this.addFn.bind(this)} deleteFn={this.deleteFn.bind(this)} /><br className="clear" />
                <FormControls label="备注" ctrl="textarea" value="rolesInfo.remark" onFocus={this.closeSelectList} />

                <div style={{ marginLeft: "100px", paddingTop: "5px" }}>
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                    <Btn type="submit" txt="确定" href={this.editPositionMaintainRole.bind(this)} style={{ float: "left" }} />
                </div>
                <br /><br /><br />
            </div>
        )
    }

    addFn() {
        const {sidePageInfo} = this.props
        openSidePage(this, {
            status: "editPositionMaintainRole",
            width: "400",
            id: "PositionMaintainRoleEdit",
            gateWay: sidePageInfo.gateWay
        })
    }

    deleteFn(id) {
        const {deleteTip, editInfo} = this.props
        deleteTip(id)
    }

    editPositionMaintainRole() {
        const {updatePositionMaintainRoles,tips, sidePageInfo, errorMsg, successMsg, editInfo, pushPositionMaintainRoles, jobsSelectedData} = this.props
  
        let _positionId = [],
            _this = this
        for (let i = 0; i < tips.length; i++) {
            let $d = tips[i];
            _positionId.push($d.id)
        }

        let jsonParam = {
            positionId: sidePageInfo.gateWay.positionId,
            roleName: editInfo.rolesInfo.name,
            remark: editInfo.rolesInfo.remark,
            jobIds: _positionId.join(",")
        }


        if (editInfo.rolesInfo.status == "add") {
            TUI.platform.post("/role/role-jobs", jsonParam, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    successMsg("新增角色成功")
                    pushPositionMaintainRoles(result.data)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            jsonParam.roleId = editInfo.rolesInfo.id
            TUI.platform.put("/role/role-jobs", jsonParam, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    successMsg("编辑角色成功")
                    let _jobNames = []
                    for (var i = 0; i < tips.length; i++) {
                        var $t = tips[i]
                        _jobNames.push($t.name)
                    }
                    jsonParam.jobNames = _jobNames.join(",")
                    updatePositionMaintainRoles(jsonParam)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        this.props.refreshTable()
    }

    updateData(data, deep, newData) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == deep) {
                    data[i].name = newData.name
                    this.props.addData(this.props.data)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, newData)
            }
        }
    }


    addData(data, deep, newData) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == deep) {
                    data[i].children.push(newData)
                    this.props.addData(this.props.data)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.addData(d.children, deep, newData)
            }
        }
    }

    goBack() {
        this.props.updateEditInfo({
            infoName: "rolesInfo",
            status: "list"
        })
        this.props.clearEditInfo({
            infoName: "rolesInfo"
        })
        this.props.clearTip()
        closeSidePage({
            id: "PositionMaintainRoleEdit"
        })

        this.props.backBreadNav()
    }

    closeSelectList() {
        closeSidePage({
            id: "PositionMaintainRoleEdit"
        })
    }

    goClose() {
        closeSidePage()
        this.props.clearEditInfo({
            infoName: "rolesInfo"
        })
        this.props.clearTip()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    rolesInfo: "positionMaintain.rolesInfo",
    jobsSelectedData: "positionMaintain.jobsSelectedData",
    tips: "publicInfo.tips",
    editInfo: "formControlInfo.data"
}, PositionMaintainRoleEdit)
