import Content2, { openContentLoading, closeContentLoading } from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"


class UserMaintainDetail extends React.Component {
    render() {
        const {sidePageInfo, positionFamilys, jobFamilys, defaultUnit} = this.props


        let _this = this,
            userEditStatus = []

        let tabs = [{
                name: "用户信息详情",
                id: "userMaintain_detail"
            }]
            userEditStatus = <FormControls label="用户名" ctrl="input" value="userMaintainInfo.user" disabled="disabled" />
      

        let userStatus = [{ id: "1", name: "启用" }, { id: "0", name: "禁用" }]
        let isShow = [{ id: "1", name: "是" }, { id: "0", name: "否" }]
        let kind = [{ id: "1", name: "编制内" }, { id: "2", name: "非编制内" }]
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    {userEditStatus}
                    <FormControls label="中文名" ctrl="input" value="userMaintainInfo.name" required="required" disabled="disabled" />
                    <FormControls label="员工号" ctrl="input" value="userMaintainInfo.empNumber" disabled="disabled" />
                    <FormControls label="内部编码" ctrl="input" value="userMaintainInfo.staffCode" disabled="disabled" />
                    <FormControls label="默认组织" ctrl="select" options={defaultUnit} value="userMaintainInfo.ext5" disabled="disabled" />
                    <FormControls label="员工类型" ctrl="select" options={kind} value="userMaintainInfo.kind" disabled="disabled" />
                    <FormControls label="账户状态" ctrl="select" options={userStatus} value="userMaintainInfo.status" disabled="disabled" />
                    <FormControls label="常用手机" ctrl="input" value="userMaintainInfo.mobile" disabled="disabled" />
                    <FormControls label="短号码" ctrl="input" value="userMaintainInfo.shortNumber" disabled="disabled" />
                    <FormControls label="传真" ctrl="input" value="userMaintainInfo.fax" disabled="disabled" />
                    <FormControls label="办公电话" ctrl="input" value="userMaintainInfo.companyPhone" disabled="disabled" />
                    <FormControls label="办公地址" ctrl="input" value="userMaintainInfo.companyAddress" disabled="disabled" />
                    <FormControls label="身份证" ctrl="input" value="userMaintainInfo.idCard" disabled="disabled" />
                    <FormControls label="排序号" ctrl="input" value="userMaintainInfo.sort" disabled="disabled" />
                    <FormControls label="是否显示" ctrl="select" options={isShow} value="userMaintainInfo.isShow" disabled="disabled" />

                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    </div>
                    <br/><br/><br/>
                </div>
            </Content2>
        )
    }

    goBack() {
        this.props.clearEditInfo({
            infoName: "userMaintainInfo"
        })
        closeSidePage({id:"userMaintainDetail"})
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    baseInfo: "userMaintain.baseInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    sideContentInfo: "publicInfo.sideContentInfo",
    editInfo: "formControlInfo.data",
    defaultUnit: "userMaintain.defaultUnit",
    pageInfo:"publicInfo.pageInfo"
}, UserMaintainDetail)
