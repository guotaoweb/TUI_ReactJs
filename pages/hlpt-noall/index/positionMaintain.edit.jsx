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

let POSITION_ISEXIST = false

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
                name: "编辑职位信息", id: "baseInfo", fn: function () {
                    //更新面包屑
                    if (editInfo.jobsInfo.status == "add" || editInfo.jobsInfo.status == "add" || editInfo.jobsInfo.status == "edit" || editInfo.jobsInfo.status == "edit") {
                        _this.props.backBreadNav()
                        _this.props.updateEditInfo({
                            infoName: "jobsInfo",
                            status: "list"
                        })
                        _this.props.updateEditInfo({
                            infoName: "rolesInfo",
                            status: "list"
                        })
                    }
                }
            }, {
                name: "工作职责", id: "positionmaintain", fn: function () {
                    _this.getPositionMaintainJobs()
                }
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
            <Content2 tabs={tabs} key="content2_userEdit" goBackHref={this.goBack.bind(this)}>
                <div>
                    <FormControls label="职位ID" ctrl="input" value="positionMaintainInfo.id" disabled="disabled" />

                    <FormControls label="职位名称" ctrl="input" value="positionMaintainInfo.name" required="required" onBlur={this.onBlur.bind(this)} />
                    <FormControls label="职位编制" ctrl="input" type="number" value="positionMaintainInfo.staffing" />

                    <div style={{display:"none"}}><FormControls label="职位族" ctrl="select" options={positionFamilys} value="positionMaintainInfo.positionFamily" onChangeFn={this.onChangeFnByPositionFamilys.bind(this)} /></div>
                    <div style={{display:"none"}}><FormControls label="职位序列" ctrl="select" options={jobFamilys} value="positionMaintainInfo.jobFamily" /></div>
                    <FormControls label="排序号" ctrl="input" type="number" value="positionMaintainInfo.sort" />
                    <FormControls label="备注" ctrl="textarea" value="positionMaintainInfo.remark" />

                    <div className="formControl-btn">
                        <Btn type="submit" txt="确定" href={this.editPositionMaintain.bind(this)} />
                    </div>
                    <br /><br />
                </div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>{_PositionMaintainJob}</div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>{_PositionMaintainRole}</div>
                <div style={{ borderTop: "1px solid #ebebeb" }}>
                    <PositionMaintainWorkStandard />
                </div>

            </Content2>
        )
    }

    onChangeFnByPositionFamilys(id) {
        this.loadJobFamilys(id)
    }

    onBlur(e) {
        const {sideContentInfo, errorMsg, sidePageInfo} = this.props
        if (e.currentTarget.value) {
            TUI.platform.get("/position/" + sideContentInfo.type + "/" + e.currentTarget.value + "?positionId=" + sidePageInfo.gateWay.positionId, function (result) {
                if (result.code == 0) {
                    if (result.data == 1) {
                        errorMsg("职位名称已存在")
                        POSITION_ISEXIST = true
                    }
                    else {
                        POSITION_ISEXIST = false
                    }
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
    }

    getPositionMaintainJobs() {
        const {sidePageInfo, addPositionMaintainJobs, searchPositionMaintainJobs, updatePageInfo, editInfo} = this.props
        let url = "/jobs?positionId=" + sidePageInfo.gateWay.positionId + "&from={0}&limit=10"
        TUI.platform.get(url.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addPositionMaintainJobs(result.data)
                searchPositionMaintainJobs(eval(JSON.stringify(result.data)))
            }
            else if (result.code == 404) {
                addPositionMaintainJobs([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "positionMaintainJobPager",
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 0,
                url: url
            })
        })

        if (editInfo.rolesInfo.status == "edit" || editInfo.rolesInfo.status == "add") {
            this.props.backBreadNav()
            this.props.updateEditInfo({
                infoName: "rolesInfo",
                status: "list"
            })
        }
    }

    getPositionMaintainRoles() {
        const {sidePageInfo, addPositionMaintainRoles, updatePageInfo, jobsData, editInfo} = this.props
        TUI.platform.get("/roles?positionId=" + sidePageInfo.gateWay.positionId + "&from=0&limit=10", function (result) {
            if (result.code == 0) {
                addPositionMaintainRoles(result.data)
            }
            else if (result.code == 404) {
                addPositionMaintainRoles([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "positionMaintainRolePager",
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 0,
                url: "/roles?positionId=" + sidePageInfo.gateWay.positionId + "&from={0}&limit=10"
            })
        })

        if (jobsData) {
            this.getPositionMaintainJobs()
        }

        if (editInfo.jobsInfo.status == "edit" || editInfo.jobsInfo.status == "add") {
            this.props.backBreadNav()
            this.props.updateEditInfo({
                infoName: "jobsInfo",
                status: "list"
            })
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
        const {
            errorMsg,
            data,
            editInfo,
            sidePageInfo,
            sideContentInfo,
            pushPositionMaintain,
            updatePositionMaintain,
            updatePageInfo,
            pageInfo
        } = this.props
        if (POSITION_ISEXIST) {
            setTimeout(function () { errorMsg("职位名称已存在") }, 500)
            return false
        }
        let _this = this,
            postJson = {
                "unitId": sideContentInfo.type,
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
                    _this.goBack()
                    _this.props.successMsg("新增职位成功")
                    pushPositionMaintain(result.data)
                    updatePageInfo({
                        id: "positionMaintainPager",
                        sum: parseInt(pageInfo.positionMaintainPager.sum) + 1
                    })
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
                    _this.goBack()
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
        this.props.backBreadNav()
    }

    loadJobFamilys(familyId) {
        const {errorMsg, addPositionMaintainJobFamilys} = this.props
        if (familyId) {
            let _this = this
            TUI.platform.get("/jobfamilys/" + familyId, function (result) {
                if (result.code == 0) {
                    let _data = result.data
                    let newData = []
                    // newData.push({
                    //     id: "-1",
                    //     name: "请选择"
                    // })
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
    jobsData: "positionMaintain.jobsData",
    editInfo: "formControlInfo.data",
    pageInfo: "publicInfo.pageInfo",
    sideContentInfo: "publicInfo.sideContentInfo"
}, PositionMaintainEdit)
