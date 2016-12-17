import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class UserMaintainExtInfo extends React.Component {
    render() {
        const {sidePageInfo, positionFamilys, jobFamilys, nations} = this.props

        return (
            <div>
                <FormControls label="生日" ctrl="datepicker" value="userMaintainExtInfo.birthday" />
                <FormControls label="退休日期" ctrl="datepicker" value="userMaintainExtInfo.retireDate" />
                <FormControls label="籍贯" ctrl="input" value="userMaintainExtInfo.postAddr" />
                <FormControls label="国籍" ctrl="input" value="userMaintainExtInfo.regAddr" />
                <FormControls label="政治面貌" ctrl="input" value="userMaintainExtInfo.roomNumber" />
                <FormControls label="民族" ctrl="select" options={nations} value="userMaintainExtInfo.nation" />
                <FormControls label="家庭电话" ctrl="input" value="userMaintainExtInfo.homePhone" />
                <FormControls label="家庭地址" ctrl="input" value="userMaintainExtInfo.homeAddress" />
                <FormControls label="学历" ctrl="input" value="userMaintainExtInfo.education" />
                <FormControls label="职称名" ctrl="input" value="userMaintainExtInfo.jobTitles" />
                <FormControls label="职位等级" ctrl="input" value="userMaintainExtInfo.grade" />
                <div className="formControl-btn">
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    <Btn type="submit" txt="确定" href={this.editUserMaintainExtInfo.bind(this)} />
                </div>
                <br/>
            </div>
        )
    }


    editUserMaintainExtInfo() {
        const {
            successMsg,
            errorMsg,
            editInfo
        } = this.props

        let _this = this,
            postJson = {
                staffId: editInfo.userMaintainExtInfo.staffId,
                birthday: editInfo.userMaintainExtInfo.birthday,
                postAddr: editInfo.userMaintainExtInfo.postAddr,
                regAddr: editInfo.userMaintainExtInfo.regAddr,
                roomNumber: editInfo.userMaintainExtInfo.roomNumber,
                nation: editInfo.userMaintainExtInfo.nation,
                homePhone: editInfo.userMaintainExtInfo.homePhone,
                homeAddress: editInfo.userMaintainExtInfo.homeAddress,
                education: editInfo.userMaintainExtInfo.education,
                grade: editInfo.userMaintainExtInfo.grade,
                jobTitles: editInfo.userMaintainExtInfo.jobTitles,
                retireDate: editInfo.userMaintainExtInfo.retireDate
            }

        TUI.platform.put("/staff_s", postJson, function (result) {
            if (result.code == 0) {
                _this.goBack()
                successMsg("编辑用户扩展信息成功");
            }
            else {
                errorMsg(result.message)
            }
        })

    }

    goBack() {
        this.props.clearEditInfo({
            infoName: "userMaintainExtInfo"
        })
        closeSidePage()
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId",
    editInfo: "formControlInfo.data",
    nations: "userMaintain.nation"
}, UserMaintainExtInfo)
