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
                    <FormControls label="组织编码" ctrl="input" txt={detail.code} disabled="disabled" onChange={this.onChangeByCode.bind(this)} labelWidth="100" />

                    <FormControls label="上级组织" ctrl="input" txt={detail.upper} disabled="disabled" onChange={this.onChangeByUpper.bind(this)} labelWidth="100" />
                    <FormControls label="级别" ctrl="input" txt={detail.level} disabled="disabled" onChange={this.onChangeByLevel.bind(this)} labelWidth="100" />
                    <FormControls label="全称" ctrl="input" txt={detail.unitName} onChange={this.onChangeByFullName.bind(this)} labelWidth="100" required="required" />
                    <FormControls label="短名称" ctrl="input" txt={detail.ext2} onChange={this.onChangeByShortName.bind(this)} labelWidth="100" required="required" />

                    <FormControls label="组织机构" ctrl="select" options={unitKind} txt={detail.kind} onChange={this.onChangeByOrginaztion.bind(this)} labelWidth="100" />
                    <FormControls label="状态" ctrl="select" options={status} txt={detail.status} onChange={this.onChangeByStatus.bind(this)} labelWidth="100" />


                    <FormControls label="序号" ctrl="input" type="number" txt={detail.sort} onChange={this.onChangeByNo.bind(this)} labelWidth="100" required="required" />
                    <FormControls label="编制" ctrl="input" txt={detail.staffing} onChange={this.onChangeByStaffing.bind(this)} labelWidth="100" />
                    <FormControls label="备注" ctrl="textarea" txt={detail.remark} onChange={this.onChangeByComment.bind(this)} labelWidth="100" />

                    <div style={{ marginLeft: "100px", paddingTop: "5px" }}>
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                        <Btn type="check" txt="确定" href={this.editOrgization.bind(this)} style={{ float: "left" }} />
                    </div>
                    <br /><br /><br />
                </div>
            </Content2>
        )
    }

    editOrgization() {
        const {errorMsg, data, detail, sidePageInfo, unitBizTypes, unitKind, status, city, preventSubmit, updateSubList, relateId, unitCode, pushSubList} = this.props

        let _this = this,
            postJson

        if (sidePageInfo.status == "addOrgnization") {
            detail["ownerUnitid"] = ""

            detail["bizType"] = detail.bizType ? detail.bizType : unitBizTypes[0].id
            detail["kind"] = detail.kind ? detail.kind : unitKind[0].id
            detail["status"] = detail.status ? detail.status : status[0].id
            detail["areaCode"] = detail.areaCode ? detail.areaCode : city[0].id

            postJson = {
                "unitName": detail.unitName,
                "ext2": detail.ext2,
                "bizType": detail.bizType,
                "kind": detail.kind,
                "status": detail.status,
                "areaCode": detail.areaCode,
                "email": detail.email,
                "remark": detail.remark,
                "sort": detail.sort,
                "staffing": detail.staffing,
                "superUnitid1": unitCode ? unitCode : sidePageInfo.gateWay.type,
                "unitLevel": relateId ? relateId.split("-").length + 1 : sidePageInfo.gateWay.ext1
            }

            TUI.platform.post("/unit", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("新增组织成功")
                    postJson.unitCode = result.data.unitCode
                    //实时新增组织
                    pushSubList(postJson)

                    _this.addData(data, relateId.split("-"), {
                        id: result.data.unitId,
                        name: result.data.unitName,
                        isleaf: "1",
                        deep: relateId.split("-").length,
                        unitCode: result.data.unitCode
                    })
                }
                else {
                    _this.props.errorMsg(TUI.ERROR_INFO[result.code])
                }
            })
        }
        else {
            postJson = {
                "unitId": sidePageInfo.gateWay.id,
                "unitName": detail.unitName,
                "ext2": detail.ext2,
                "bizType": detail.bizType,
                "kind": detail.kind,
                "status": detail.status,
                "areaCode": detail.areaCode,
                "email": detail.email,
                "sort": detail.sort,
                "staffing": detail.staffing,
                "remark": detail.remark
            }


            TUI.platform.put("/unit", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("编辑组织成功");

                    //实时更新组织
                    updateSubList(postJson)

                    _this.updateData(data, relateId.split("-"), {
                        name: postJson.unitName
                    })
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

    goBack() {
        closeSidePage()
    }
    onChangeByCode(e) {
        const {detail} = this.props
    }
    onChangeByWho(e) {
        const {detail} = this.props
    }
    onChangeByUpper(e) {
        const {detail} = this.props
    }
    onChangeByLevel(e) {
        const {detail} = this.props
    }
    onChangeByFullName(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            unitName: e.currentTarget.value
        })
    }
    onChangeByShortName(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            ext2: e.currentTarget.value
        })
    }
    onChangeByType(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            bizType: e.currentTarget.value
        })
    }
    onChangeByOrginaztion(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            kind: e.currentTarget.value
        })
    }
    onChangeByStatus(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            status: e.currentTarget.value
        })
    }
    onChangeByArea(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            areaCode: e.currentTarget.value
        })
    }
    onChangeByEmail(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            email: e.currentTarget.value
        })
    }
    onChangeByNo(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            sort: e.currentTarget.value
        })
    }
    onChangeByComment(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            remark: e.currentTarget.value
        })
    }
    onChangeByPermission(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            permission: e.currentTarget.value
        })
    }

    onChangeByStaffing(e) {
        const {detail} = this.props
        this.props.updateOrgnizationInfo({
            staffing: e.currentTarget.value
        })
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
    unitCode: "orgnizationManage.type"
}, OrgnizationEdit)
