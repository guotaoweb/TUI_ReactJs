import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"

class PositionFamilyEdit extends React.Component {
    render() {
        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="族代码" ctrl="input" value="positionFamilyInfo.familyCode" disabled="disabled"/>
                    <FormControls label="族名称" ctrl="input" value="positionFamilyInfo.familyName" required="required"/>
                    <FormControls label="族简介" ctrl="textarea" value="positionFamilyInfo.remark" />
                    <div className="formControl-btn">
                        <Btn type="submit" txt="确定" href={this.editPositionFamilyInfo.bind(this) }/>
                    </div>
                </div>
            </div>
        )
    }


    editPositionFamilyInfo() {
        const {editDeep, data, type, editInfo, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

        let _this = this
        if (editInfo.positionFamilyInfo.familyCode) {
            let params = {
                "familyCode": editInfo.positionFamilyInfo.familyCode,
                "familyName": editInfo.positionFamilyInfo.familyName,
                "typeCode": editInfo.positionFamilyInfo.typeCode,
                "remark": editInfo.positionFamilyInfo.remark
            }
            TUI.platform.put("/positionFamily", params, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("职位族编辑成功") }, 800)
                    _this.updateData(data, editDeep.split("-"), params)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            let editDeeps = editDeep.split("-")
            TUI.platform.post("/positionFamily", {
                "familyName": editInfo.positionFamilyInfo.familyName,
                "typeCode": editInfo.positionFamilyInfo.length > 1 ? editDeeps[editDeeps.length - 1] : editDeeps[0],
                "remark": editInfo.positionFamilyInfo.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位族成功") }, 800)
                    let _addData = {
                        id: result.data.familyCode,
                        name: editInfo.positionFamilyInfo.familyName,
                        type: "1",
                        isHadSub: "0",
                        deep: 1,
                        btns: "A/D"
                    }
                    _this.addData(data, editDeep.split("-"), _addData)
                }
                else {
                    errorMsg(result.message)
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
                    d.name = newData.familyName
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
};


export default TUI._connect({
    data: "positionGroup.data",
    positionFamily: "positionGroup.positionFamily",
    preventSubmit: "publicInfo.msgInfo.txt",
    type: "positionGroup.type",
    editDeep: "positionGroup.editDeep",
    editInfo:"formControlInfo.data"
}, PositionFamilyEdit)