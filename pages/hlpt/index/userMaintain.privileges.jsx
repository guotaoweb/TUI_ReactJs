import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class UserMaintainPrivileges extends React.Component {
    render() {
        const {sidePageInfo, positionFamilys, jobFamilys, nations, editInfo} = this.props

        let status = [{ id: 1, name: "已开通" }, { id: 0, name: "未开通" }]
   
        return (
            <div>
                <FormControls label="用户短信" ctrl="slide" size="long" options={status} value="userMaintainSMSStatus.val" selected={editInfo.userMaintainSMSStatus ? editInfo.userMaintainSMSStatus.val : 0} fn={this.updateSMSStatus.bind(this)} />
                <FormControls label="用户邮箱" ctrl="slide" size="long" options={status} value="userMaintainEmailStatus.val" selected={editInfo.userMaintainEmailStatus ? editInfo.userMaintainEmailStatus.val : 0} fn={this.updateEmailStatus.bind(this)} />
                <FormControls label="单点登录" ctrl="slide" size="long" options={status} value="userMaintainLoginStatus.val" selected={editInfo.userMaintainEmailStatus ? editInfo.userMaintainEmailStatus.val : 0} fn={this.updateLoginStatus.bind(this)} />
            </div>
        )
    }
    updateSMSStatus(info) {
        const {errorMsg, editInfo} = this.props
        let id = editInfo.userMaintainInfo.uId
        let action = info.val == 1 ? 0 : 1
        if (action == 1) {
            TUI.platform.put("/staff/addSMS/" + id,{}, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
        else {
            TUI.platform.put("/staff/deleteSMS/" + id, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
    }
    updateLoginStatus(info) {
        const {errorMsg, editInfo} = this.props
        let id = editInfo.userMaintainInfo.uId
        let action = info.val == 1 ? 0 : 1
        if (action == 1) {
            TUI.platform.put("/staff/addTAM/" + id,{}, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
        else {
            TUI.platform.put("/staff/deleteTAM/" + id, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
    }

    updateEmailStatus(info) {
        const {errorMsg,editInfo} = this.props
        let id = editInfo.userMaintainInfo.uId
        let action = info.val == 1 ? 0 : 2
        if (action == 2) {
            TUI.platform.put("/staff/addEmail/" + id,{}, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
        else {
            TUI.platform.put("/staff/deleteEmail/" + id, function (result) {
                if (result.code == 0) {

                }
                else {
                    errorMsg(result.message);
                }

            })
        }
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId",
    editInfo: "formControlInfo.data",
    nations: "userMaintain.nation"
}, UserMaintainPrivileges)
