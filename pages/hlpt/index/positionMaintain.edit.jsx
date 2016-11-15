import Content2, { getContentIndex } from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

import PositionMaintainJob from "./positionMaintain.job"
import PositionMaintainRole from "./positionMaintain.role"
import PositionMaintainJobEdit from "./positionMaintain.job.edit"
import PositionMaintainRoleEdit from "./positionMaintain.role.edit"
import PositionMaintainWorkStandard from "./positionMaintain.workStandard"
// import PositionMaintainPersonMatchPost from "./positionMaintain.personMatchPost"

class PositionMaintainEdit extends React.Component {
    render() {
        const {sidePageInfo, positionFamilys, jobFamilys, editInfo} = this.props

        let tabs = null,
            _this = this
        if (sidePageInfo.status == "addPositionMaintain") {
            tabs = [{ name: "添加职位信息", id: "baseInfo" }]
        }
        else {
            tabs = [{
                name: "编辑职位信息", id: "baseInfo"
            }, {
                name: "工作职责", id: "positionmaintain", fn: function () { _this.getPositionMaintainJobs() }
            }, {
                name: "角色设置", id: "roleset", fn: function () { _this.getPositionMaintainRoles() }
            }, {
                name: "工作标准", id: "workstandard", fn: function () { _this.getWorkStandard() }
            }]
            // , {
            //     name: "人职匹配", id: "personMatchPost", fn: function () {
            //         //_this.getWorkStandard() 
            //     }
            // }
        }

        let _PositionMaintainJob = [],
            _PositionMaintainRole = []

        if (editInfo.jobsInfo) {
            if (editInfo.jobsInfo.status == "edit" || editInfo.jobsInfo.status == "add") {
                _PositionMaintainJob.push(<PositionMaintainJobEdit key="PositionMaintainJobEdit" />)
            }
            else {
                _PositionMaintainJob.push(<PositionMaintainJob key="PositionMaintainJob" />)
            }
        }
        else {
            _PositionMaintainJob.push(<PositionMaintainJob key="PositionMaintainJob" />)
        }

        if (editInfo.rolesInfo) {
            if (editInfo.rolesInfo.status == "edit" || editInfo.rolesInfo.status == "add") {
                _PositionMaintainRole.push(<PositionMaintainRoleEdit key="PositionMaintainRoleEdit" />)
            }
            else {
                _PositionMaintainRole.push(<PositionMaintainRole key="PositionMaintainRole" />)
            }
        }
        else {
            _PositionMaintainRole.push(<PositionMaintainRole key="PositionMaintainRole" />)
        }




        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    <FormControls label="职位ID" ctrl="input" value="positionMaintainInfo.id" disabled="disabled" />

                    <FormControls label="职位名称" ctrl="input" value="positionMaintainInfo.name" required="required" />
                    <FormControls label="职位编制" ctrl="input" type="number" value="positionMaintainInfo.staffing" />

                    <FormControls label="职位族" ctrl="select" options={positionFamilys} value="positionMaintainInfo.positionFamily" onChangeFn={this.onChangeFnByPositionFamilys.bind(this)} />
                    <FormControls label="职位序列" ctrl="select" options={jobFamilys} value="positionMaintainInfo.jobFamily" />
                    <FormControls label="排序号" ctrl="input" type="number" value="positionMaintainInfo.sort" />
                    <FormControls label="备注" ctrl="textarea" value="positionMaintainInfo.remark" />

                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                        <Btn type="submit" txt="确定" href={this.editPositionMaintain.bind(this)} />
                    </div>
                    <br /><br /><br />
                </div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>{_PositionMaintainJob}</div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>{_PositionMaintainRole}</div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>
                    <PositionMaintainWorkStandard />
                </div>

            </Content2>
        )
    }

                // <div style={{ borderTop: "1px solid #ebebeb" }}>
                //     <PositionMaintainPersonMatchPost />
                // </div>
    onChangeFnByPositionFamilys(id) {
        this.loadJobFamilys(id)
    }

    getPositionMaintainJobs() {
        const {sidePageInfo, addPositionMaintainJobs, searchPositionMaintainJobs, updatePageInfo} = this.props
        TUI.platform.get("/jobs?positionId=" + sidePageInfo.gateWay.positionId + "&from=0&limit=10", function (result) {
            if (result.code == 0) {
                addPositionMaintainJobs(result.data)
                searchPositionMaintainJobs(eval(JSON.stringify(result.data)))
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result._page.total,
                    url: "/jobs?positionId=" + sidePageInfo.gateWay.positionId + "&from={0}&limit=10"
                })
            }
            else if (result.code == 404) {
                addPositionMaintainJobs([])
            }
            else {
                errorMsg(result.message)
            }
        })
    }

    getPositionMaintainRoles() {
        const {sidePageInfo, addPositionMaintainRoles, updatePageInfo, jobsData} = this.props
        TUI.platform.get("/roles?positionId=" + sidePageInfo.gateWay.positionId + "&from=0&limit=10", function (result) {
            if (result.code == 0) {
                addPositionMaintainRoles(result.data)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result._page.total,
                    url: "/roles?positionId=" + sidePageInfo.gateWay.positionId + "&from={0}&limit=10"
                })
            }
            else if (result.code == 404) {
                addPositionMaintainRoles([])
            }
            else {
                errorMsg(result.message)
            }
        })

        if (jobsData) {
            this.getPositionMaintainJobs()
        }
    }

    getWorkStandard() {
        const {errorMsg, sidePageInfo, addEditInfo} = this.props
        TUI.platform.get("/workstandards/byPosition/" + sidePageInfo.gateWay.positionId, function (result) {
            if (result.code == 0) {
                let _d = result.data
                addEditInfo({
                    "infoName": "workStandardInfo",
                    "standardId": _d.standardId,
                    "specialty": _d.specialty,
                    "education": _d.education,
                    "proKnowledge": _d.proKnowledge,
                    "qualification": _d.qualification,
                    "workExperience": _d.workExperience,
                    "workSchedule": _d.workSchedule,
                    "environment": _d.environment,
                    "others": _d.others
                })
            }
            else if (result.code == 404) {

            }
            else {
                errorMsg(result.message)
            }
        })
    }

    editPositionMaintain() {
        const {errorMsg, data, editInfo, sidePageInfo, editId, pushPositionMaintain, updatePositionMaintain} = this.props

        let _this = this,
            postJson = {
                "unitId": editId,
                "positionName": editInfo.positionMaintainInfo.name,
                "staffing": parseInt(editInfo.positionMaintainInfo.staffing),
                "jobfamilyId": editInfo.positionMaintainInfo.positionFamily,
                "jobseqId": editInfo.positionMaintainInfo.jobFamily,
                "remark": editInfo.positionMaintainInfo.remark,
                "sort": editInfo.positionMaintainInfo.sort
            }
        if (sidePageInfo.status == "addPositionMaintain") {
            TUI.platform.post("/position", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("新增职位成功")
                    pushPositionMaintain(result.data)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            postJson.positionId = editInfo.positionMaintainInfo.id
            TUI.platform.put("/position", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("编辑职位成功");
                    updatePositionMaintain(postJson)
                }
                else {
                    errorMsg(result.message)
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
        this.props.clearEditInfo({
            infoName: "positionMaintainInfo"
        })
        closeSidePage()
    }

    loadJobFamilys(familyId) {
        const {errorMsg, addPositionMaintainJobFamilys} = this.props
        if (familyId) {
            let _this = this
            TUI.platform.get("/jobfamilys/" + familyId, function (result) {
                if (result.code == 0) {
                    let _data = result.data
                    let newData = []
                    newData.push({
                        id: "-1",
                        name: "请选择"
                    })
                    for (var i = 0; i < _data.length; i++) {
                        var $d = _data[i];
                        newData.push({
                            id: $d.seqId,
                            name: $d.seqName
                        })
                    }
                    addPositionMaintainJobFamilys(newData)
                }
                else if (result.code == 404) {
                    addPositionMaintainJobFamilys([])
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
    }
}


export default TUI._connect({
    baseInfo: "positionMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    positionFamilys: "positionMaintain.positionFamilys",
    jobFamilys: "positionMaintain.jobFamilys",
    editId: "positionMaintain.editId",
    jobsData: "positionMaintain.jobsData",
    editInfo: "formControlInfo.data"
}, PositionMaintainEdit)
