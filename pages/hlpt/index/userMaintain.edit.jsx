import Content2,{openContentLoading,closeContentLoading} from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import UserMaintainExtInfo from "./userMaintain.extInfo"
import UserMaintainJobsList from "./userMaintain.jobsList"

class PositionMaintainEdit extends React.Component {
    render() {
        const {sidePageInfo, positionFamilys, jobFamilys, defaultUnit} = this.props

        let tabs = null,
            _this = this,
            userEditStatus = []

        if (sidePageInfo.status == "addUserMaintain") {
            tabs = [{
                name: "添加用户信息",
                id: "userMaintain_add"
            }]
            userEditStatus = <FormControls label="用户名" ctrl="input" value="userMaintainInfo.user" required="required" onBlur={this.onBlurByUser.bind(this)} />
        }
        else {
            tabs = [{
                name: "编辑用户信息",
                id: "userMaintain_edit"
            }, {
                name: "扩展信息",
                id: "userMaintain_extinfo",
                fn: function () {
                    _this.getUserMaintainExtInfo(_this)
                }
            }, {
                name: "职位信息",
                id: "userMaintain_jobinfo",
                fn: function () {
                    _this.getUserMaintainJobList(_this)
                }
            }]
            userEditStatus = <FormControls label="用户名" ctrl="input" value="userMaintainInfo.user" disabled="disabled" />
        }

        let userStatus = [{ id: "1", name: "启用" }, { id: "0", name: "禁用" }]
        let isShow = [{ id: "1", name: "是" }, { id: "0", name: "否" }]
        let kind = [{ id: "1", name: "编制内" }, { id: "2", name: "非编制内" }]
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    {userEditStatus}
                    <FormControls label="中文名" ctrl="input" value="userMaintainInfo.name" required="required" />
                    <FormControls label="员工号" ctrl="input" value="userMaintainInfo.staffCode" />
                    <FormControls label="岗位编码" ctrl="input" value="userMaintainInfo.empNumber" />
                    <FormControls label="默认组织" ctrl="select" options={defaultUnit} value="userMaintainInfo.ext5" />
                    <FormControls label="员工类型" ctrl="select" options={kind} value="userMaintainInfo.kind" />
                    <FormControls label="账户状态" ctrl="select" options={userStatus} value="userMaintainInfo.status" />
                    <FormControls label="常用手机" ctrl="input" value="userMaintainInfo.mobile" />
                    <FormControls label="短号码" ctrl="input" value="userMaintainInfo.shortNumber" />
                    <FormControls label="传真" ctrl="input" value="userMaintainInfo.fax" />
                    <FormControls label="办公电话" ctrl="input" value="userMaintainInfo.companyPhone" />
                    <FormControls label="办公地址" ctrl="input" value="userMaintainInfo.companyAddress" />
                    <FormControls label="身份证" ctrl="input" value="userMaintainInfo.idCard" />
                    <FormControls label="排序号" ctrl="input" value="userMaintainInfo.sort" />
                    <FormControls label="是否显示" ctrl="select" options={isShow} value="userMaintainInfo.isShow" />

                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                        <Btn type="submit" txt="确定" href={this.editUserMaintain.bind(this)} />
                    </div>
                  
                </div>
                <div>
                    <UserMaintainExtInfo />
                </div>
                <div>
                    <UserMaintainJobsList />
                </div>
            </Content2>
        )
    }


    editUserMaintain() {
        const {successMsg, errorMsg, data, editInfo, sidePageInfo, orgnizationId, pushUserMaintain, updateUserMaintain} = this.props

        let _this = this,
            postJson = {
                loginUid: editInfo.userMaintainInfo.user,//用户名
                cnName: editInfo.userMaintainInfo.name,//中文名
                status: editInfo.userMaintainInfo.status ? editInfo.userMaintainInfo.status : 1,//账户状态
                mobilePhone: editInfo.userMaintainInfo.mobile,//常用手机
                shortPhone: editInfo.userMaintainInfo.shortNumber,//短号码
                fax: editInfo.userMaintainInfo.fax,//传真
                telephone: editInfo.userMaintainInfo.companyPhone,//办公电话
                officeAddress: editInfo.userMaintainInfo.companyAddress,//办公地址
                userNumber: editInfo.userMaintainInfo.idCard,//身份证
                unitId: orgnizationId,//默认组织id
                sort: editInfo.userMaintainInfo.sort ? editInfo.userMaintainInfo.sort : "9999",//排序号
                ext2: editInfo.userMaintainInfo.isShow ? editInfo.userMaintainInfo.isShow : 1,//是否显示
                staffCode: editInfo.userMaintainInfo.staffCode,
                empNumber: editInfo.userMaintainInfo.empNumber,
                kind: editInfo.userMaintainInfo.kind,
                ext5: editInfo.userMaintainInfo.ext5
            }

        if (sidePageInfo.status == "addUserMaintain") {
            TUI.platform.post("/staff", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    successMsg("新增用户成功")
                    postJson.positionNames = result.data.positionNames //职位
                    postJson.unitName = result.data.unitExt2 //默认组织
                    pushUserMaintain(result.data)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            postJson.staffId = editInfo.userMaintainInfo.uId
            postJson.delFlag = "n"
            TUI.platform.put("/staff", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    successMsg("编辑用户成功");
                    postJson.ext5Name = editInfo.userMaintainInfo.ext5Name
                    updateUserMaintain(postJson)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
    }

    getUserMaintainExtInfo(_this) {
        const {errorMsg, addNation, editInfo} = _this.props
        let id = editInfo.userMaintainInfo.uId
        TUI.platform.get("/staff_s/" + id, function (result) {
            if (result.code == 0) {
                let _d = result.data
                _this.props.addEditInfo({
                    infoName: "userMaintainExtInfo",
                    staffId: _d.staffId,
                    birthday: _d.birthday,
                    postAddr: _d.postAddr,
                    regAddr: _d.regAddr,
                    roomNumber: _d.roomNumber,
                    nation: _d.nation,
                    homePhone: _d.homePhone,
                    homeAddress: _d.homeAddress,
                    education: _d.education,
                    grade: _d.grade,
                    jobTitles: _d.jobTitles,
                    retireDate: _d.retireDate
                })
            }
            else {
                errorMsg(result.message);
            }
        })
        TUI.platform.get("/codeinfos/dict/nation", function (result) {
            if (result.code == 0) {
                addNation(result.data)
            }
            else {
                errorMsg(result.message);
            }
        })
    }

    getUserMaintainJobList(_this) {
        const {errorMsg, addUserMaintainJobsList, editInfo, updatePageInfo} = _this.props
        let id = editInfo.userMaintainInfo.uId
        let _url = "/dutys?staffId=" + id + "&from={0}&limit=10"
        openContentLoading()
        TUI.platform.get(_url.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addUserMaintainJobsList(result.data)
                updatePageInfo({
                    id: "userMaintainJobsList",
                    index: 1,
                    size: 10 > result._page.total ? result._page.total : 10,
                    sum: result._page.total,
                    url: _url
                })
            }
            else {
                errorMsg(result.message);
            }
            closeContentLoading()
        })

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
        this.props.clearEditInfo({
            infoName: "userMaintainInfo"
        })
        closeSidePage()
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId",
    editInfo: "formControlInfo.data",
    defaultUnit: "userMaintain.defaultUnit"
}, PositionMaintainEdit)
