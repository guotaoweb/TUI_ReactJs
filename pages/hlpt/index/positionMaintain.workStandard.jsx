
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class PositionMaintainWorkStandard extends React.Component {
    render() {
        return (
            <div>
                <FormControls label="学历" ctrl="input" value="workStandardInfo.specialty"/>
                <FormControls label="专业" ctrl="input" value="workStandardInfo.education" />
                <FormControls label="专业知识" ctrl="input" value="workStandardInfo.proKnowledge" />
                <FormControls label="资格证书" ctrl="input" value="workStandardInfo.qualification" />
                <FormControls label="工作经验" ctrl="input" value="workStandardInfo.workExperience" />
                <FormControls label="工作时制" ctrl="input" value="workStandardInfo.workSchedule" />
                <FormControls label="环境特性" ctrl="input" value="workStandardInfo.environment" />
                <FormControls label="其他要求" ctrl="textarea" value="workStandardInfo.others" />
                <div className="formControl-btn">
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    <Btn type="submit" txt="确定" href={this.editPositionMaintainWorkStandard.bind(this)} />
                </div>
                <br /><br /><br />
            </div>
        )
    }


    editPositionMaintainWorkStandard() {
        const {errorMsg, editInfo, pushPositionMaintainJobs, updatePositionMaintainJobs, positionId, sidePageInfo} = this.props

        let _this = this,
            postJson = {
                "specialty": editInfo.workStandardInfo.specialty,
                "education": editInfo.workStandardInfo.education,
                "proKnowledge": editInfo.workStandardInfo.proKnowledge,
                "qualification": editInfo.workStandardInfo.qualification,
                "workExperience": editInfo.workStandardInfo.workExperience,
                "workSchedule": editInfo.workStandardInfo.workSchedule,
                "environment": editInfo.workStandardInfo.environment,
                "standardId":editInfo.workStandardInfo.standardId,
                "positionId":sidePageInfo.gateWay.positionId,
                "others":editInfo.workStandardInfo.others,
            }

        TUI.platform.post("/workstandards", postJson, function (result) {
            if (result.code == 0) {
                _this.goBack()
                _this.props.successMsg("编辑工作标准成功");
                updateEditInfo(postJson)
            }
            else {
                errorMsg(result.message)
            }
        })
    }

    goBack() {
        this.props.clearEditInfo({
            infoName: "workStandardInfo"
        })
        closeSidePage()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    positionId: "positionMaintain.editId",
    editInfo: "formControlInfo.data"
}, PositionMaintainWorkStandard)
