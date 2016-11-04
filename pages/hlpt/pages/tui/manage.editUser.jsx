import '!style!css!postcss!sass!./style.scss'
import React, {Component} from 'react'


import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"
import {closeSidePage} from "../../components/SidePage/index"


class ManageEditUser extends Component {
    render() {
        const {userDetail} = this.props

        let tabs = [{ name: "编辑项目组成员" }]
        let options = [{ name: "是", value: "1" }, { name: "否", value: "0" }]

        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <FormControls label="ID" ctrl="input" disabled="disabled" txt={userDetail.user} />
                <FormControls label="姓名" ctrl="input" disabled="disabled" txt={userDetail.name}/>
                <FormControls label="角色" ctrl="textarea" txt={userDetail.role} onChange={this.onChangeByUserRole.bind(this) }/>
                <FormControls label="管理员" ctrl="select" options={options}  style={{ width: "60px" }} txt={userDetail.admin} onChange={this.onChangeByUserAdmin.bind(this) }/>
                <FormControls label="排序" ctrl="input" style={{ width: "60px" }}  txt={userDetail.sort} onChange={this.onChangeByUserSort.bind(this) }/>
                <div style={{ marginLeft: "60px", paddingTop: "5px" }}>
                    <Btn type="cancel" txt="取消" href={this.closeEidtUserPage.bind(this) } style={{ float: "left", marginRight: "10px" }} />
                    <Btn type="check" txt="确定" style={{ float: "left" }} href={this.eidtTeamUser.bind(this) } />
                </div>
            </Content2>
        )
    }

    closeEidtUserPage() {
        closeSidePage()
        this.props.clearSubVTeamUser()
    }

    eidtTeamUser() {
        const {userDetail, userId, errorMsg, updateSubVTeamUserToList, teamId, preventSubmit} = this.props

        let _this = this
        let _default = {
            "team_id": teamId,
            "id": userDetail.id,
            "user_note": userDetail.role,
            "del_flag": "n",
            "user_type": userDetail.admin,
            "sort": userDetail.sort,
            "last-modid": userId
        }
        closeSidePage()

        TUI.platform.post("/projectteam/person", _default, function (result) {
            if (result.code == 0) {
                updateSubVTeamUserToList({})
                closeSidePage()
            }
            else {
                errorMsg(config.ERROR_INFO[resultobj.code]);
            }
        })


    }
    onChangeByUserRole(e) {
        const {userDetail} = this.props
        this.props.updateSubVTeamUser({
            role: e.currentTarget.value,
            admin: userDetail.admin,
            sort: userDetail.sort
        })
    }
    onChangeByUserAdmin(e) {
        const {userDetail} = this.props
        this.props.updateSubVTeamUser({
            role: userDetail.role,
            admin: e.currentTarget.value,
            sort: userDetail.sort
        })
    }
    onChangeByUserSort(e) {
        const {userDetail} = this.props
        this.props.updateSubVTeamUser({
            role: userDetail.role,
            admin: userDetail.admin,
            sort: e.currentTarget.value
        })
    }
}

export default TUI._connect({
    userDetail: "manages.userDetail",
    sidePageInfo: "manages.sidePageInfo",
    teamId: "manages.detail.id",
    userId: "publicInfo.userInfo.id"
}, ManageEditUser)