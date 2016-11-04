import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'


import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import Btn from "../../components/Btn/index"
import FormControls from "../../components/FormControls/index"



class PositionFamilyEdit extends Component {
    render() {
        const {positionFamily} = this.props

        return (
            <div style={{ marginTop: "10px", padding: "0px 10px" }}>
                <div>
                    <FormControls label="族代码" ctrl="input" txt={positionFamily.familyCode} onChange={this.onChangeByFamilyCode.bind(this) }  disabled="disabled"/>
                    <FormControls label="族名称" ctrl="input" txt={positionFamily.familyName} onChange={this.onChangeByFamilyName.bind(this) } required="required"/>
                    <FormControls label="族简介" ctrl="textarea" txt={positionFamily.remark} onChange={this.onChangeByFamilyRemark.bind(this) }/>
                    <div style={{ marginLeft: "70px", paddingTop: "5px" }}>

                        <Btn type="check" txt="确定" href={this.editPositionFamilyInfo.bind(this) } style={{ float: "left" }}  />
                    </div>
                </div>
            </div>
        )
    }


    editPositionFamilyInfo() {
        const {editDeep, data, type, positionFamily, successMsg, errorMsg, preventSubmit, waiteMsg, pushPositionGroupData} = this.props

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
        if (positionFamily.familyCode) {
            let params = {
                "familyCode": positionFamily.familyCode,
                "familyName": positionFamily.familyName,
                "typeCode": positionFamily.typeCode,
                "remark": positionFamily.remark
            }
            TUI.platform.put("/positionFamily", params, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("职位族编辑成功") }, 800)
                    _this.updateData(data, editDeep.split("-"), params)
                }
                else {
                    errorMsg(TUI.config.ERROR_INFO[result.code]);
                }
            })
        }
        else {
            let editDeeps = editDeep.split("-")
            TUI.platform.post("/positionFamily", {
                "familyName": positionFamily.familyName,
                "typeCode": editDeeps.length > 1 ? editDeeps[editDeeps.length - 1] : editDeeps[0],
                "remark": positionFamily.remark
            }, function (result) {
                if (result.code == 0) {
                    setTimeout(function () { successMsg("新增职位族成功") }, 800)
                    let _addData = {
                        id: result.data.familyCode,
                        name: positionFamily.familyName,
                        type: "1",
                        isHadSub: "0",
                        deep: 1,
                        btns: "A/D"
                    }
                    _this.addData(data, editDeep.split("-"), _addData)
                }
                else {
                    errorMsg(TUI.config.ERROR_INFO[result.code]);
                }
            })
        }
    }

    onChangeByFamilyCode(e) {
        const {updatePositionFamilyInfo} = this.props
        updatePositionFamilyInfo({
            familyCode: e.currentTarget.value
        })
    }
    onChangeByFamilyName(e) {
        const {updatePositionFamilyInfo} = this.props
        updatePositionFamilyInfo({
            familyName: e.currentTarget.value
        })
    }
    onChangeByFamilyRemark(e) {
        const {updatePositionFamilyInfo} = this.props
        updatePositionFamilyInfo({
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
    editDeep: "positionGroup.editDeep"
}, PositionFamilyEdit)