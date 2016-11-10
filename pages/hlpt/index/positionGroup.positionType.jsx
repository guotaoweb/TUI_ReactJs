import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"

class PositionTypeEdit extends React.Component {
    render() {
        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="类别代码" ctrl="input" value="positionTypeInfo.typeCode" disabled="disabled"/>
                    <FormControls label="类别名称" ctrl="input" value="positionTypeInfo.typeName" required="required"/>
                    <FormControls label="类别简介" ctrl="textarea" value="positionTypeInfo.remark" />
                    <div className="formControl-btn">
                        <Btn type="submit" txt="确定" href={this.editPositionTypeInfo.bind(this) } />
                    </div>
                </div>
            </div>
        )
    }


    editPositionTypeInfo() {
        const {editDeep, data, type, editInfo, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

        let _this = this
        if (editInfo.positionTypeInfo.typeCode) {
            let params = {
                "typeCode": editInfo.positionTypeInfo.typeCode,
                "typeName": editInfo.positionTypeInfo.typeName,
                "remark": editInfo.positionTypeInfo.remark
            }
            TUI.platform.put("/positionType", params, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("职位序列编辑成功") }, 800)
                    _this.updateData(data, editDeep.split("-"), params)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            TUI.platform.post("/positionType", {
                "typeName": editInfo.positionTypeInfo.typeName,
                "remark": editInfo.positionTypeInfo.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位序列成功") }, 800)
                    let _addData = {
                        id: result.data,
                        name: editInfo.positionTypeInfo.seqName,
                        type: "2",
                        isHadSub: "0",
                        deep: 3
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
                    d.push(newData)
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
                    d.name = newData.typeName
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
    positionType: "positionGroup.positionType",
    preventSubmit: "publicInfo.msgInfo.txt",
    type: "positionGroup.type",
    editDeep: "positionGroup.editDeep",
    editInfo:"formControlInfo.data"
}, PositionTypeEdit)