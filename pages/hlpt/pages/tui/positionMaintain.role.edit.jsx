import React, { Component } from 'react'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"
import SidePage, { openSidePage, closeSidePage } from "../../components/SidePage/index"

class PositionMaintainRoleEdit extends Component {
    render() {
        const {rolesInfo, tips} = this.props

        return (
            <div>
                <FormControls label="角色名称" ctrl="input" txt={rolesInfo.name} onChange={this.onChangeByName.bind(this)} required="required" labelWidth="100" />
                <FormControls label="关联职责" ctrl="tip" txt={tips} addFn={this.addFn.bind(this)} deleteFn={this.deleteFn.bind(this)} labelWidth="100" /><br className="clear" />
                <FormControls label="备注" ctrl="textarea" txt={rolesInfo.remark} onChange={this.onChangeByRemark.bind(this)} labelWidth="100" />

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
        this.props.deleteTip(id)
    }

    editPositionMaintainRole() {
        const {tips, sidePageInfo, errorMsg, successMsg, rolesInfo, pushPositionMaintainRoles, updatePositionMaintainRoles, jobsSelectedData} = this.props

        let _positionId = [],
            _this = this
        for (let i = 0; i < tips.length; i++) {
            let $d = tips[i];
            _positionId.push($d.id)
        }

        let jsonParam = {
            positionId: sidePageInfo.gateWay.positionId,
            roleName: rolesInfo.name,
            remark: rolesInfo.remark,
            jobIds: _positionId.join(",")
        }


        if (rolesInfo.status == "add") {
            TUI.platform.post("/role/role-jobs", jsonParam, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    successMsg("新增角色成功")
                    pushPositionMaintainRoles(result.data)
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code])
                }
            })
        }
        else {
            jsonParam.roleId = rolesInfo.id
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
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
        }
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
        this.props.updatePositionMaintainRolesInfo({
            status: "list"
        })
        this.props.clearPositionMaintainRolesInfo()
        this.props.clearTip()
        closeSidePage({
            id:"PositionMaintainRoleEdit"
        })
    }

    goClose() {
        closeSidePage()
        this.props.clearPositionMaintainRolesInfo()
        this.props.clearTip()
    }

    onChangeByName(e) {
        this.props.updatePositionMaintainRolesInfo({
            name: e.currentTarget.value
        })
    }

    onChangeByRemark(e) {
        this.props.updatePositionMaintainRolesInfo({
            remark: e.currentTarget.value
        })
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    rolesInfo: "positionMaintain.rolesInfo",
    jobsSelectedData: "positionMaintain.jobsSelectedData",
    tips: "publicInfo.tips"
}, PositionMaintainRoleEdit)
