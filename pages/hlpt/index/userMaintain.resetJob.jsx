import Content2 from "Content2"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import Table from "Table"
import { openDialog, closeDialog } from "Dialog"

import singleLeft from "!url!./img/singleLeft.png"

class UserMaintainResetJob extends React.Component {
    render() {
        const {
            errorMsg,
            waiteMsg,
            successMsg,
            sidePageInfo,
            jobsAllList,
            updateJobAllList,
            sideContentInfo
        } = this.props

        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name6": "操作" },
            "tbody": []
        }

        if (jobsAllList) {
            for (var i = 0; i < jobsAllList.length; i++) {
                let _d = jobsAllList[i]

                tblContent.tbody.push({
                    "value1": (i + 1),
                    "value2": _d.name,
                    "fns": [{
                        "name": "设置",
                        "fn": function () {
                            waiteMsg("正在提交,请稍等...")
                            let jsonParam = {
                                "poid":sidePageInfo.gateWay.poid,
                                "positionId":_d.id,
                                "dutyType":"1"
                            }
                            TUI.platform.post("/duty",jsonParam, function (result) {
                                if (result.code == 0) {
                                    updateJobAllList({
                                        id:jsonParam.poid,
                                        name:_d.name,
                                        orgnization:sideContentInfo.name
                                    })
                                    successMsg("设置成功")
                                    _this._closeSidePage()
                                }
                                else {
                                    errorMsg(result.message);
                                }
                                //_this._closeSidePage()
                            })
                        }
                    }]
                })
            }
        }
        return (
            <div>
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />职位列表</span>
                </div>
                <Table id="userMaintainJobsListTable" tblContent={tblContent} width="100,0,120" />
            </div>
        )
    }

    _closeSidePage() {
        closeSidePage({
            id:"resetJob"
        })
        this.props.backBreadNav()
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
                kind: editInfo.userMaintainInfo.kind
            }

        if (sidePageInfo.status == "addUserMaintain") {
            TUI.platform.post("/staff", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
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
                    closeSidePage()
                    successMsg("编辑用户成功");
                    updateUserMaintain(postJson)
                }
                else {
                    errorMsg(result.message)
                }
            })
        }
    }

    goBack() {
        closeSidePage()
    }
}


export default TUI._connect({
    pageInfo: "publicInfo.pageInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    editInfo: "formControlInfo.data",
    jobsAllList: "userMaintain.jobsAllList",
    sideContentInfo: "publicInfo.sideContentInfo"
}, UserMaintainResetJob)
