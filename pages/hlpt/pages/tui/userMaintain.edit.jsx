import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"
import { closeSidePage } from "../../components/SidePage/index"
//  <FormControls label="默认组织" ctrl="input" txt={baseInfo.orgnization} onChange={this.onChangeByOrgnization.bind(this)} labelWidth="100" />
// <FormControls label="微信号" ctrl="input" txt={baseInfo.wx} onChange={this.onChangeByWX.bind(this)} labelWidth="100" />
class PositionMaintainEdit extends Component {
    render() {
        const {sidePageInfo, baseInfo, positionFamilys, jobFamilys} = this.props

        let tabs = null,
            userEditStatus = []
        if (sidePageInfo.status == "addUserMaintain") {
            tabs = [{ name: "添加用户信息", id: "userMaintain_add" }]
            userEditStatus = <FormControls label="用户名" ctrl="input" txt={baseInfo.user} onBlur={this.onBlurByUser.bind(this)} onChange={this.onChangeByUser.bind(this)} labelWidth="100" />
        }
        else {
            tabs = [{ name: "编辑用户信息", id: "userMaintain_edit" }]
            userEditStatus = <FormControls label="用户名" ctrl="input" txt={baseInfo.user} onBlur={this.onBlurByUser.bind(this)} onChange={this.onChangeByUser.bind(this)} labelWidth="100" disabled="disabled" />
        }

        let userStatus = [{ id: "1", name: "启用" }, { id: "0", name: "禁用" }]
        let isShow = [{ id: "1", name: "是" }, { id: "0", name: "否" }]
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    {userEditStatus}
                    <FormControls label="中文名" ctrl="input" txt={baseInfo.name} onChange={this.onChangeByName.bind(this)} required="required" labelWidth="100" />
                    <FormControls label="账户状态" ctrl="select" options={userStatus} txt={baseInfo.status} onChange={this.onChangeByStatus.bind(this)} labelWidth="100" />
                    <FormControls label="常用手机" ctrl="input" txt={baseInfo.mobile} onChange={this.onChangeByMobile.bind(this)} labelWidth="100" required="required" />
                    <FormControls label="短号码" ctrl="input" txt={baseInfo.shortNumber} onChange={this.onChangeByShortNumber.bind(this)} labelWidth="100" />
                    <FormControls label="传真" ctrl="input" txt={baseInfo.fax} onChange={this.onChangeByFax.bind(this)} labelWidth="100" />
                    <FormControls label="办公电话" ctrl="input" txt={baseInfo.companyPhone} onChange={this.onChangeCompanyPhone.bind(this)} labelWidth="100" />
                    <FormControls label="办公地址" ctrl="input" txt={baseInfo.companyAddress} onChange={this.onChangeByCompanyAddress.bind(this)} labelWidth="100" />
                    <FormControls label="身份证" ctrl="input" txt={baseInfo.idCard} onChange={this.onChangeByIdCard.bind(this)} labelWidth="100" />


                    <FormControls label="排序号" ctrl="input" txt={baseInfo.sort} onChange={this.onChangeBySort.bind(this)} labelWidth="100" />
                    <FormControls label="是否显示" ctrl="select" options={isShow} txt={baseInfo.isShow} onChange={this.onChangeByisShow.bind(this)} labelWidth="100" />

                    <div style={{ marginLeft: "100px", paddingTop: "5px" }}>
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                        <Btn type="submit" txt="确定" href={this.editUserMaintain.bind(this)} style={{ float: "left" }} />
                    </div>
                    <br /><br /><br />
                </div>
            </Content2>
        )
    }


    editUserMaintain() {
        const {errorMsg, data, baseInfo, sidePageInfo, orgnizationId, pushUserMaintain, updateUserMaintain} = this.props

        let _this = this,
            postJson = {
                loginUid: baseInfo.user,//用户名
                cnName: baseInfo.name,//中文名
                status: baseInfo.status,//账户状态
                mobilePhone: baseInfo.mobile,//常用手机
                shortPhone: baseInfo.shortNumber,//短号码
                fax: baseInfo.fax,//传真
                telephone: baseInfo.companyPhone,//办公电话
                officeAddress: baseInfo.companyAddress,//办公地址
                userNumber: baseInfo.idCard,//身份证
                unitId: orgnizationId,//默认组织
                sort: baseInfo.sort ? baseInfo.sort : "9999",//排序号
                ext2: baseInfo.isShow//是否显示
            }


        //wx: baseInfo.wx,//微信号
        if (sidePageInfo.status == "addUserMaintain") {
            TUI.platform.post("/staff", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("新增用户成功")
                    pushUserMaintain(result.data)
                }
                else {
                    _this.props.errorMsg(TUI.ERROR_INFO[result.code])
                }
            })
        }
        else {
            postJson.staffId = baseInfo.uId
            postJson.delFlag = "n"
            TUI.platform.put("/staff", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("编辑用户成功");
                    updateUserMaintain(postJson)
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
    onBlurByUser(e) {
        let uId = e.currentTarget.value
        if (uId) {
            let _this = this
            TUI.platform.get("/staff/isExist/" + uId, function (result) {
                if (result.data == 1) {
                    _this.props.errorMsg("用户已存在");
                }
                else {
                    _this.props.errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
        }
    }
    goBack() {
        this.props.clearUserMaintainInfo()
        closeSidePage()
    }

    onChangeByUser(e) {
        this.props.updateUserMaintainInfo({
            user: e.currentTarget.value
        })
    }
    onChangeByName(e) {
        this.props.updateUserMaintainInfo({
            name: e.currentTarget.value
        })
    }
    onChangeByStatus(e) {
        this.props.updateUserMaintainInfo({
            status: e.currentTarget.value
        })
    }
    onChangeByMobile(e) {
        this.props.updateUserMaintainInfo({
            mobile: e.currentTarget.value
        })
    }
    onChangeByShortNumber(e) {
        this.props.updateUserMaintainInfo({
            shortNumber: e.currentTarget.value
        })
    }
    onChangeByFax(e) {
        this.props.updateUserMaintainInfo({
            fax: e.currentTarget.value
        })
    }
    onChangeCompanyPhone(e) {
        this.props.updateUserMaintainInfo({
            companyPhone: e.currentTarget.value
        })
    }
    onChangeByCompanyAddress(e) {
        this.props.updateUserMaintainInfo({
            companyAddress: e.currentTarget.value
        })
    }
    onChangeByIdCard(e) {
        this.props.updateUserMaintainInfo({
            idCard: e.currentTarget.value
        })
    }
    onChangeByOrgnization(e) {
        this.props.updateUserMaintainInfo({
            orgnization: e.currentTarget.value
        })
    }
    onChangeByWX(e) {
        this.props.updateUserMaintainInfo({
            wx: e.currentTarget.value
        })
    }
    onChangeBySort(e) {
        this.props.updateUserMaintainInfo({
            sort: e.currentTarget.value
        })
    }
    onChangeByisShow(e) {
        this.props.updateUserMaintainInfo({
            isShow: e.currentTarget.value
        })
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId"
}, PositionMaintainEdit)
