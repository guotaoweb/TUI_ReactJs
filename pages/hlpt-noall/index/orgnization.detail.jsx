import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class OrgnizationDetail extends React.Component {
    render() {
        const {sidePageInfo, detail, unitBizTypes, unitKind, status, city} = this.props

        let _slideBtn = []
        let tabs = [{ name: "" }]

        return (
            <Content txt="组织机构详情" backHref={this.goBack.bind(this)} key="content2_userEdit" style={{top:"-5px"}}>
                <div style={{paddingTop:"10px"}}>
                    <FormControls label="组织编码" ctrl="input" value="orgnizationInfo.code" disabled="disabled" />

                    <FormControls label="上级组织" ctrl="input" value="orgnizationInfo.upper" disabled="disabled" />
                    <FormControls label="级别" ctrl="input" value="orgnizationInfo.level" disabled="disabled" />
                    <FormControls label="全称" ctrl="input" value="orgnizationInfo.unitName" required="required" disabled="disabled" />
                    <FormControls label="短名称" ctrl="input" value="orgnizationInfo.ext2" required="required" disabled="disabled" />

                    <FormControls label="组织机构" ctrl="select" options={unitKind} value="orgnizationInfo.kind" disabled="disabled" />
                    <FormControls label="状态" ctrl="select" options={status} value="orgnizationInfo.status" disabled="disabled" />

                    <FormControls label="序号" ctrl="input" type="number" value="orgnizationInfo.sort" required="required" disabled="disabled" />
                    <FormControls label="编制" ctrl="input" type="number" value="orgnizationInfo.staffing" disabled="disabled" />
                    <FormControls label="人资编码" ctrl="input" value="orgnizationInfo.globalCode" disabled="disabled" />
                    <FormControls label="备注" ctrl="textarea" value="orgnizationInfo.remark" disabled="disabled" />
                </div>
            </Content>
        )
    }

    goBack() {
        closeSidePage({id:"orgnizationDetail"})
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    data: "orgnizationManage.data",
    detail: "orgnizationManage.detail",
    sidePageInfo: "publicInfo.sidePageInfo",
    unitBizTypes: "orgnizationManage.unitBizTypes",
    unitKind: "orgnizationManage.unitKind",
    status: "orgnizationManage.status",
    city: "orgnizationManage.city",
    relateId: "orgnizationManage.relateId",
    unitCode: "orgnizationManage.unitCode",
    editInfo: "formControlInfo.data",
    pageInfo:"publicInfo.pageInfo"
}, OrgnizationDetail)
