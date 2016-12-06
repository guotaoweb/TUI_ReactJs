import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class OrgnizationEdit extends React.Component {
    render() {
        const {sidePageInfo, detail, unitBizTypes, unitKind, status, city} = this.props
        let tabs = null
        if (sidePageInfo.status == "addOrgnization") {
            tabs = [{ name: "添加组织机构", }]
        }
        else {
            tabs = [{ name: "编辑组织机构" }]
        }
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    <FormControls label="组织编码" ctrl="input" value="orgnizationInfo.code" disabled="disabled" />

                    <FormControls label="上级组织" ctrl="input" value="orgnizationInfo.upper" disabled="disabled" />
                    <FormControls label="级别" ctrl="input" value="orgnizationInfo.level" disabled="disabled" />
                    <FormControls label="全称" ctrl="input" value="orgnizationInfo.unitName" required="required" />
                    <FormControls label="短名称" ctrl="input" value="orgnizationInfo.ext2" required="required" />

                    <FormControls label="组织机构" ctrl="select" options={unitKind} value="orgnizationInfo.kind" />
                    <FormControls label="状态" ctrl="select" options={status} value="orgnizationInfo.status" />

                    <FormControls label="序号" ctrl="input" type="number" value="orgnizationInfo.sort" required="required" />
                    <FormControls label="编制" ctrl="input" type="number" value="orgnizationInfo.staffing" />
                    <FormControls label="人资编码" ctrl="input" value="orgnizationInfo.globalCode" />
                    <FormControls label="备注" ctrl="textarea" value="orgnizationInfo.remark" />

                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                        <Btn type="submit" txt="确定" href={this.editOrgization.bind(this)} />
                    </div>
                    <br /><br /><br />
                </div>
            </Content2>
        )
    }

    editOrgization() {
        const {
            errorMsg, 
            data, 
            editInfo, 
            sidePageInfo, 
            unitBizTypes, 
            unitKind, 
            status, 
            city, 
            updateSubList, 
            relateId, 
            unitCode, 
            pushSubList,
            updatePageInfo,
            pageInfo
        } = this.props

        let _this = this,
            postJson

        if (sidePageInfo.status == "addOrgnization") {
            editInfo.orgnizationInfo["ownerUnitid"] = ""

            editInfo.orgnizationInfo["bizType"] = editInfo.orgnizationInfo.bizType ? editInfo.orgnizationInfo.bizType : unitBizTypes[0].id
            editInfo.orgnizationInfo["kind"] = editInfo.orgnizationInfo.kind ? editInfo.orgnizationInfo.kind : unitKind[0].id
            editInfo.orgnizationInfo["status"] = editInfo.orgnizationInfo.status ? editInfo.orgnizationInfo.status : status[0].id
            editInfo.orgnizationInfo["areaCode"] = editInfo.orgnizationInfo.areaCode ? editInfo.orgnizationInfo.areaCode : city[0].id

            postJson = {
                "unitName": editInfo.orgnizationInfo.unitName,
                "ext2": editInfo.orgnizationInfo.ext2,
                "bizType": editInfo.orgnizationInfo.bizType,
                "kind": editInfo.orgnizationInfo.kind == "-1" ? "" : editInfo.orgnizationInfo.kind,
                "status": editInfo.orgnizationInfo.status,
                "areaCode": editInfo.orgnizationInfo.areaCode,
                "email": editInfo.orgnizationInfo.email,
                "remark": editInfo.orgnizationInfo.remark,
                "sort": editInfo.orgnizationInfo.sort,
                "staffing": editInfo.orgnizationInfo.staffing,
                "superUnitid1": unitCode ? unitCode : sidePageInfo.gateWay.type,
                "unitLevel": relateId ? relateId.split("-").length + 1 : sidePageInfo.gateWay.ext1,
                "globalCode": editInfo.orgnizationInfo.globalCode
            }

            TUI.platform.post("/unit", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    _this.props.successMsg("新增组织成功")
                    postJson.unitId = result.data.unitId
                    postJson.unitCode = result.data.unitCode
                    postJson.superExt2 = result.data.superExt2
                    postJson.statusName = result.data.statusName
                    //实时新增组织
                    pushSubList(postJson)


                    _this.addOrgnizationData(data, relateId.split("-"), {
                        id: result.data.unitId,
                        name: result.data.unitName,
                        isleaf: "1",
                        deep: relateId.split("-").length,
                        unitCode: result.data.unitCode
                    })

                    updatePageInfo({
                        id: "orgnizationPager",
                        sum: parseInt(pageInfo.orgnizationPager.sum) + 1
                    })

                    console.info(pageInfo)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
        else {
            postJson = {
                "unitId": sidePageInfo.gateWay.id,
                "unitName": editInfo.orgnizationInfo.unitName,
                "ext2": editInfo.orgnizationInfo.ext2,
                "bizType": editInfo.orgnizationInfo.bizType,
                "kind": editInfo.orgnizationInfo.kind,
                "status": editInfo.orgnizationInfo.status,
                "areaCode": editInfo.orgnizationInfo.areaCode,
                "email": editInfo.orgnizationInfo.email,
                "sort": editInfo.orgnizationInfo.sort,
                "staffing": editInfo.orgnizationInfo.staffing,
                "remark": editInfo.orgnizationInfo.remark,
                "globalCode": editInfo.orgnizationInfo.globalCode
            }


            TUI.platform.put("/unit", postJson, function (result) {
                if (result.code == 0) {
                    _this.goBack()
                    _this.props.successMsg("编辑组织成功");
                    postJson["statusName"] = editInfo.orgnizationInfo.statusName
                    //实时更新组织
                    updateSubList(postJson)

                    _this.updateOrgnizationData(data, relateId.split("-"), {
                        name: postJson.unitName
                    })
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
    }

    updateOrgnizationData(data, deep, newData) {
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
                this.updateOrgnizationData(d.children, deep, newData)
            }
        }
    }


    addOrgnizationData(data, deep, newData) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == deep) {
                    data[i].isHadSub = 0
                    if (!data[i].children) {
                        data[i].children = []
                    }
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
                this.addOrgnizationData(d.children, deep, newData)
            }
        }
    }

    goBack() {
        closeSidePage()
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
}, OrgnizationEdit)
