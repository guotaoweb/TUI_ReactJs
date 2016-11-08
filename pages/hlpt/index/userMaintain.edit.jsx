import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class PositionMaintainEdit extends React.Component {
    render() {
        const {sidePageInfo, baseInfo, positionFamilys, jobFamilys} = this.props

        let tabs = null,
            userEditStatus = []
        if (sidePageInfo.status == "addUserMaintain") {
            tabs = [{ name: "添加用户信息", id: "userMaintain_add" }]
            userEditStatus = <FormControls label="用户名" ctrl="input" value="userMaintainInfo.user" onBlur={this.onBlurByUser.bind(this)}/>
        }
        else {
            tabs = [{ name: "编辑用户信息", id: "userMaintain_edit" }]
            userEditStatus = <FormControls label="用户名" ctrl="input" value="userMaintainInfo.user" onBlur={this.onBlurByUser.bind(this)} disabled="disabled" />
        }

        let userStatus = [{ id: "1", name: "启用" }, { id: "0", name: "禁用" }]
        let isShow = [{ id: "1", name: "是" }, { id: "0", name: "否" }]
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    {userEditStatus}
                    <FormControls label="中文名" ctrl="input" value="userMaintainInfo.name" required="required"/>
                    <FormControls label="账户状态" ctrl="select" options={userStatus} value="userMaintainInfo.status"/>
                    <FormControls label="常用手机" ctrl="input" value="userMaintainInfo.mobile"/>
                    <FormControls label="短号码" ctrl="input" value="userMaintainInfo.shortNumber"/>
                    <FormControls label="传真" ctrl="input" value="userMaintainInfo.fax"/>
                    <FormControls label="办公电话" ctrl="input" value="userMaintainInfo.companyPhone"/>
                    <FormControls label="办公地址" ctrl="input" value="userMaintainInfo.companyAddress"/>
                    <FormControls label="身份证" ctrl="input" value="userMaintainInfo.idCard"/>
                    <FormControls label="排序号" ctrl="input" value="userMaintainInfo.sort"/>
                    <FormControls label="是否显示" ctrl="select" options={isShow} value="userMaintainInfo.isShow"/>

                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)}/>
                        <Btn type="submit" txt="确定" href={this.editUserMaintain.bind(this)}/>
                    </div>
                    <br /><br /><br />
                </div>
            </Content2>
        )
    }


    editUserMaintain() {
        const {errorMsg, data, editInfo, sidePageInfo, orgnizationId, pushUserMaintain, updateUserMaintain} = this.props

        let _this = this,
            postJson = {
                loginUid: editInfo.userMaintainInfo.user,//用户名
                cnName: editInfo.userMaintainInfo.name,//中文名
                status: editInfo.userMaintainInfo.status,//账户状态
                mobilePhone: editInfo.userMaintainInfo.mobile,//常用手机
                shortPhone: editInfo.userMaintainInfo.shortNumber,//短号码
                fax: editInfo.userMaintainInfo.fax,//传真
                telephone: editInfo.userMaintainInfo.companyPhone,//办公电话
                officeAddress: editInfo.userMaintainInfo.companyAddress,//办公地址
                userNumber: editInfo.userMaintainInfo.idCard,//身份证
                unitId: orgnizationId,//默认组织
                sort: editInfo.userMaintainInfo.sort ? editInfo.userMaintainInfo.sort : "9999",//排序号
                ext2: editInfo.userMaintainInfo.isShow//是否显示
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
                    _this.props.errorMsg(Config.ERROR_INFO[result.code])
                }
            })
        }
        else {
            postJson.staffId = editInfo.userMaintainInfo.uId
            postJson.delFlag = "n"
            TUI.platform.put("/staff", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("编辑用户成功");
                    updateUserMaintain(postJson)
                }
                else {
                    _this.props.errorMsg(Config.ERROR_INFO[result.code]);
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
                    _this.props.errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
    }
    goBack() {
        this.props.clearUserMaintainInfo()
        closeSidePage()
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId",
    editInfo:"formControlInfo.data"
}, PositionMaintainEdit)
