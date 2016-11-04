import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

import PositionMaintainJob from "./positionMaintain.job"
import PositionMaintainRole from "./positionMaintain.role"

class PositionMaintainEdit extends React.Component {
    render() {
        const {jobsInfo} = this.props

        return (
            <div>
                <FormControls label="职责名称" ctrl="input" txt={jobsInfo.name} onChange={this.onChangeByName.bind(this)} required="required" labelWidth="100" />
                <FormControls label="职责描述" ctrl="textarea" txt={jobsInfo.remark} onChange={this.onChangeByRemark.bind(this)} labelWidth="100" />
                <FormControls label="考核标准" ctrl="textarea" txt={jobsInfo.standard} onChange={this.onChangeByStandard.bind(this)} labelWidth="100" />
                <div style={{ marginLeft: "100px", paddingTop: "5px" }}>
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                    <Btn type="submit" txt="确定" href={this.editPositionMaintainJob.bind(this)} style={{ float: "left" }} />
                </div>
                <br /><br /><br />
            </div>
        )
    }


    editPositionMaintainJob() {
        const {errorMsg, jobsInfo, pushPositionMaintainJobs, updatePositionMaintainJobs,positionId,sidePageInfo} = this.props

        let _this = this,
            postJson = {
                "jobName": jobsInfo.name,
                "remark": jobsInfo.remark,
                "standard": jobsInfo.standard
            }

        if (jobsInfo.status == "add") {

            postJson.positionId = sidePageInfo.positionId
            TUI.platform.post("/job", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    _this.props.successMsg("新增职位成功")
                    pushPositionMaintainJobs(result.data)
                }
                else {
                    _this.props.errorMsg(TUI.ERROR_INFO[result.code])
                }
            })
        }
        else {
            postJson["jobId"] = jobsInfo.id,
                TUI.platform.put("/job", postJson, function (result) {
                    if (result.code == 0) {
                        _this.goBack()
                        _this.props.successMsg("编辑职位成功");
                        updatePositionMaintainJob(postJson)
                    }
                    else {
                        _this.props.errorMsg(TUI.ERROR_INFO[result.code]);
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
        this.props.updatePositionMaintainJobsInfo({
            status: "list"
        })
        this.props.clearPositionMaintainJobsInfo()

    }

    goClose() {
        closeSidePage()
        this.props.clearPositionMaintainJobsInfo()
    }

    onChangeByName(e) {
        this.props.updatePositionMaintainJobsInfo({
            name: e.currentTarget.value
        })
    }
    onChangeByRemark(e) {
        this.props.updatePositionMaintainJobsInfo({
            remark: e.currentTarget.value
        })
    }
    onChangeByStandard(e) {
        this.props.updatePositionMaintainJobsInfo({
            standard: e.currentTarget.value
        })
    }
}


export default TUI._connect({
    jobsInfo: "positionMaintain.jobsInfo",
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    positionId:"positionMaintain.editId"
}, PositionMaintainEdit)
