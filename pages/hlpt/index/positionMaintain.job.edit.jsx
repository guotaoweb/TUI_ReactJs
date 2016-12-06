import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

import PositionMaintainJob from "./positionMaintain.job"
import PositionMaintainRole from "./positionMaintain.role"

class PositionMaintainEdit extends React.Component {
    render() {
        return (
            <div>
                <FormControls label="职责名称" ctrl="input" value="jobsInfo.name" required="required" />
                <FormControls label="职责描述" ctrl="textarea" value="jobsInfo.remark" />
                <FormControls label="考核标准" ctrl="textarea" value="jobsInfo.standard" />
                <div className="formControl-btn">
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    <Btn type="submit" txt="确定" href={this.editPositionMaintainJob.bind(this)} />
                </div>
                <br /><br /><br />
            </div>
        )
    }


    editPositionMaintainJob() {
        const {
            errorMsg, 
            editInfo, 
            pushPositionMaintainJobs, 
            updatePositionMaintainJobs, 
            positionId, 
            sidePageInfo,
            updatePageInfo,
            pageInfo
        } = this.props

        let _this = this,
            postJson = {
                "jobName": editInfo.jobsInfo.name,
                "remark": editInfo.jobsInfo.remark,
                "standard": editInfo.jobsInfo.standard
            }

        if (editInfo.jobsInfo.status == "add") {

            postJson.positionId = sidePageInfo.positionId
            TUI.platform.post("/job", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    _this.props.successMsg("新增职位成功")
                    pushPositionMaintainJobs(result.data)
                    updatePageInfo({
                        id: "positionMaintainJobPager",
                        sum: parseInt(pageInfo.positionMaintainJobPager.sum) + 1
                    })
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            postJson["jobId"] = editInfo.jobsInfo.id,
                TUI.platform.put("/job", postJson, function (result) {
                    if (result.code == 0) {
                        _this.goBack()
                        _this.props.successMsg("编辑职位成功");
                        updatePositionMaintainJob(postJson)
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
        this.props.clearEditInfo({
            infoName: "jobsInfo"
        })
        this.props.updateEditInfo({
            infoName: "jobsInfo",
            status: "list"
        })

        this.props.backBreadNav()
    }

    goClose() {
        closeSidePage()
        this.props.clearEditInfo({
            infoName: "jobsInfo"
        })
    }
}


export default TUI._connect({
    jobsInfo: "positionMaintain.jobsInfo",
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    positionId: "positionMaintain.editId",
    editInfo: "formControlInfo.data",
    pageInfo:"publicInfo.pageInfo"
}, PositionMaintainEdit)
