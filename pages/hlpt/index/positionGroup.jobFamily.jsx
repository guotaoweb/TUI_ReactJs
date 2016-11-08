import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"

class JobFamilyEdit extends React.Component {
    render() {
        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="序列ID" ctrl="input" value="jobFamilyInfo.seqId" required="required" />
                    <FormControls label="序列名称" ctrl="input" value="jobFamilyInfo.seqName"  required="required"/>
                    <FormControls label="基础级别" ctrl="input" value="jobFamilyInfo.baseLevel"  required="required"/>
                    <FormControls label="通道级别" ctrl="input" value="jobFamilyInfo.channelLevel"  required="required"/>
                    <FormControls label="序列描叙" ctrl="textarea" value="jobFamilyInfo.remark"/>
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
        const {editDeep, data, type, editInfo, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

        let _this = this
        if (editInfo.jobFamilyInfo.poId) {
            let params = {
                "poid": editInfo.jobFamilyInfo.poId,
                "familyId": editInfo.jobFamilyInfo.familyId,
                "seqId": editInfo.jobFamilyInfo.seqId,
                "seqName": editInfo.jobFamilyInfo.seqName,
                "baseLevel": editInfo.jobFamilyInfo.baseLevel,
                "channelLevel": editInfo.jobFamilyInfo.channelLevel,
                "remark": editInfo.jobFamilyInfo.remark
            }
            TUI.platform.put("/jobfamily", params, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("职位序列编辑成功") }, 800)
                    _this.updateData(data, editDeep.split("-"), params)
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
        else {
            let editDeeps = editDeep.split("-")
            TUI.platform.post("/jobfamily", {
                "familyId": editDeeps.length > 1 ? editDeeps[editDeeps.length - 1] : editDeeps[0],
                "seqId": editInfo.jobFamilyInfo.seqId,
                "seqName": editInfo.jobFamilyInfo.seqName,
                "baseLevel": editInfo.jobFamilyInfo.baseLevel,
                "channelLevel": editInfo.jobFamilyInfo.channelLevel,
                "remark": editInfo.jobFamilyInfo.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位序列成功") }, 800)
                    let _addData = {
                        id: result.data.poid,
                        name: editInfo.jobFamilyInfo.seqName,
                        type: "2",
                        isHadSub: "0",
                        deep: 2,
                        btns: "D"
                    }
                    _this.addData(data, editDeep.split("-"), _addData)
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }

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
    editDeep: "positionGroup.editDeep",
    editInfo:"formControlInfo.data"
}, JobFamilyEdit)