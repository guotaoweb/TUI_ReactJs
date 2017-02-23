import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"


class ManageEditUser extends React.Component {
    render() {
        const {userDetail} = this.props

        let tabs = [{ name: "编辑项目组成员" }]
        let options = [{ name: "是", value: "1" }, { name: "否", value: "0" }]

        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    <FormControls label="ID" ctrl="input" disabled="disabled" value="editUserInfo.user" />
                    <FormControls label="姓名" ctrl="input" disabled="disabled" value="editUserInfo.name" />
                    <FormControls label="角色" ctrl="textarea" value="editUserInfo.role"/>
                    <FormControls label="管理员" ctrl="select" options={options} style={{ width: "60px" }} value="editUserInfo.admin"/>
                    <FormControls label="排序" ctrl="input" style={{ width: "60px" }} value="editUserInfo.sort"/>
                    <div  className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.closeEidtUserPage.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                        <Btn type="check" txt="确定" style={{ float: "left" }} href={this.eidtTeamUser.bind(this)} />
                    </div>
                </div>
            </Content2>
        )
    }

    closeEidtUserPage() {
        closeSidePage()
        this.props.clearSubVTeamUser()
    }

    eidtTeamUser() {
        const {userDetail, userId, errorMsg, updateSubVTeamUserToList, teamId, editInfo} = this.props

        let _this = this
        let _default = {
            "team_id": teamId,
            "id": editInfo.editUserInfo.id,
            "user_note": editInfo.editUserInfo.role,
            "del_flag": "n",
            "user_type": editInfo.editUserInfo.admin,
            "sort": editInfo.editUserInfo.sort,
            "last-modid": userId
        }
        closeSidePage()

        TUI.platform.post("/projectteam/person", _default, function (result) {
            if (result.code == 0) {
                updateSubVTeamUserToList(_default)
                closeSidePage()
            }
            else {
                errorMsg(result.message)
            }
        })


    }
}

export default TUI._connect({
    userDetail: "manages.userDetail",
    sidePageInfo: "manages.sidePageInfo",
    teamId: "manages.detail.id",
    userId: "publicInfo.userInfo.id",
    editInfo:"formControlInfo.data"
}, ManageEditUser)