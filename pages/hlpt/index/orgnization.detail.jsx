import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class OrgnizationDetail extends React.Component {
    render() {
        const {sidePageInfo, detail, unitBizTypes, unitKind, status, city} = this.props

        let _slideBtn = []
        let tabs = [{ name: "组织机构详情" }]

        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
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
            
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    </div>
                    <br /><br /><br />
                </div>
            </Content2>
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
