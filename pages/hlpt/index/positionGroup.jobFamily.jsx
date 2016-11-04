import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"

class JobFamilyEdit extends React.Component {
    render() {
        const {jobFamily} = this.props

        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="序列ID" ctrl="input" txt={jobFamily.seqId} onChange={this.onChangeBySeqId.bind(this) }  required="required" />
                    <FormControls label="序列名称" ctrl="input" txt={jobFamily.seqName} onChange={this.onChangeBySeqName.bind(this) } required="required"/>
                    <FormControls label="基础级别" ctrl="input" txt={jobFamily.baseLevel} onChange={this.onChangeByBaseLevel.bind(this) } required="required"/>
                    <FormControls label="通道级别" ctrl="input" txt={jobFamily.channelLevel} onChange={this.onChangeByChannelLevel.bind(this) } required="required"/>
                    <FormControls label="序列描叙" ctrl="textarea" txt={jobFamily.remark} onChange={this.onChangeByJobRemark.bind(this) }/>
                    <div style={{ marginLeft: "70px", paddingTop: "5px" }}>
                        <Btn type="check" txt="确定" href={this.editJobFamilyInfo.bind(this) } style={{ float: "left" }}  />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.updatePageInfo({
            sum: 1
        })
    }

    editJobFamilyInfo() {
        const {editDeep, data, type, jobFamily, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

        if (preventSubmit) {
            return false
        }

        let isRequired = false
        let $requiredInput = document.getElementsByClassName("required")
        for (let i = 0; i < $requiredInput.length; i++) {
            if (!$requiredInput[i].value) {
                isRequired = true
                break
            }
        }

        if (isRequired) {
            errorMsg("标星字段为必填项")
            isRequired = false
            return false
        }

        waiteMsg("数据提交中,请稍后...")
        let _this = this
        if (jobFamily.poId) {
            let params = {
                "poid": jobFamily.poId,
                "familyId": jobFamily.familyId,
                "seqId": jobFamily.seqId,
                "seqName": jobFamily.seqName,
                "baseLevel": jobFamily.baseLevel,
                "channelLevel": jobFamily.channelLevel,
                "remark": jobFamily.remark
            }
            TUI.platform.put("/jobfamily", params, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("职位序列编辑成功") }, 800)
                    _this.updateData(data, editDeep.split("-"), params)
                }
                else {
                    errorMsg(TUI.config.ERROR_INFO[result.code]);
                }
            })
        }
        else {
            let editDeeps = editDeep.split("-")
            TUI.platform.post("/jobfamily", {
                "familyId": editDeeps.length > 1 ? editDeeps[editDeeps.length - 1] : editDeeps[0],
                "seqId": jobFamily.seqId,
                "seqName": jobFamily.seqName,
                "baseLevel": jobFamily.baseLevel,
                "channelLevel": jobFamily.channelLevel,
                "remark": jobFamily.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位序列成功") }, 800)
                    let _addData = {
                        id: result.data.poid,
                        name: jobFamily.seqName,
                        type: "2",
                        isHadSub: "0",
                        deep: 2,
                        btns: "D"
                    }
                    _this.addData(data, editDeep.split("-"), _addData)
                }
                else {
                    errorMsg(TUI.config.ERROR_INFO[result.code]);
                }
            })
        }

    }
    onChangeBySeqId(e) {
        const {updateJobFamilyInfo} = this.props
        updateJobFamilyInfo({
            seqId: e.currentTarget.value,
        })
    }
    onChangeBySeqName(e) {
        const {updateJobFamilyInfo} = this.props
        updateJobFamilyInfo({
            seqName: e.currentTarget.value,
        })
    }
    onChangeByBaseLevel(e) {
        const {updateJobFamilyInfo} = this.props
        updateJobFamilyInfo({
            baseLevel: e.currentTarget.value
        })
    }
    onChangeByChannelLevel(e) {
        const {updateJobFamilyInfo} = this.props
        updateJobFamilyInfo({
            channelLevel: e.currentTarget.value
        })
    }
    onChangeByJobRemark(e) {
        const {updateJobFamilyInfo} = this.props
        updateJobFamilyInfo({
            remark: e.currentTarget.value
        })
    }

    addData(_data, deep, newData) {
        if (deep.length == 1) {
            for (let index = 0; index < _data.length; index++) {
                let d = _data[index]
                if (d.id == deep[0]) {

                    d.children.push(newData)
                    this.props.updatePositionGroup(this.props.data)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < _data.length; index++) {
            let d = _data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.addData(d.children, deep, newData)
            }
        }
    }

    updateData(_data, deep, newData) {
        if (deep.length == 1) {
            for (let index = 0; index < _data.length; index++) {
                let d = _data[index]
                if (d.id == deep[0]) {
                    d.name = newData.seqName
                    this.props.updatePositionGroup(this.props.data)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < _data.length; index++) {
            let d = _data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, newData)
            }
        }
    }
}


export default TUI._connect({
    data: "positionGroup.data",
    jobFamily: "positionGroup.jobFamily",
    preventSubmit: "publicInfo.msgInfo.txt",
    type: "positionGroup.type",
    editDeep: "positionGroup.editDeep"
}, JobFamilyEdit)