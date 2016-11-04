import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'


import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import Btn from "../../components/Btn/index"
import FormControls from "../../components/FormControls/index"



class PositionTypeEdit extends Component {
    render() {
        const {positionType} = this.props

        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="类别代码" ctrl="input" txt={positionType.typeCode} onChange={this.onChangeByTypeCode.bind(this) } disabled="disabled"/>
                    <FormControls label="类别名称" ctrl="input" txt={positionType.typeName} onChange={this.onChangeByTypeName.bind(this) } required="required"/>
                    <FormControls label="类别简介" ctrl="textarea" txt={positionType.remark} onChange={this.onChangeByTypeRemark.bind(this) }/>
                    <div style={{ marginLeft: "70px", paddingTop: "5px" }}>
                        <Btn type="check" txt="确定" href={this.editPositionTypeInfo.bind(this) } style={{ float: "left" }}  />
                    </div>
                </div>
            </div>
        )
    }


    editPositionTypeInfo() {
        const {editDeep, data, type, positionType, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

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
        if (positionType.typeCode) {
            let params = {
                "typeCode": positionType.typeCode,
                "typeName": positionType.typeName,
                "remark": positionType.remark
            }
            TUI.platform.put("/positionType", params, function (result) {
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
            TUI.platform.post("/positionType", {
                "typeName": positionType.typeName,
                "remark": positionType.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位序列成功") }, 800)
                    let _addData = {
                        id: result.data,
                        name: positionType.seqName,
                        type: "2",
                        isHadSub: "0",
                        deep: 3
                    }
                    _this.addData(data, editDeep.split("-"), _addData)
                }
                else {
                    errorMsg(TUI.config.ERROR_INFO[result.code]);
                }
            })
        }
    }

    onChangeByTypeCode(e) {
        const {updatePositionTypeInfo} = this.props
        updatePositionTypeInfo({
            typeCode: e.currentTarget.value,
        })
    }
    onChangeByTypeName(e) {
        const {updatePositionTypeInfo} = this.props
        updatePositionTypeInfo({
            typeName: e.currentTarget.value
        })
    }
    onChangeByTypeRemark(e) {
        const {updatePositionTypeInfo} = this.props
        updatePositionTypeInfo({
            remark: e.currentTarget.value
        })
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
    editDeep: "positionGroup.editDeep"
}, PositionTypeEdit)