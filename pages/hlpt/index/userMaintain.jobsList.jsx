import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"
import Table from "Table"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"

import singleLeft from "!url!./img/singleLeft.png"

class UserMaintainJobsList extends React.Component {
    render() { 
        const {
            errorMsg, 
            waiteMsg, 
            successMsg, 
            sidePageInfo, 
            jobsList, 
            pageInfo, 
            updatePageInfo,
            delUserMaintainJobsList
        } = this.props

        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "部门", "name3": "职位", "name4": "角色", "name5": "默认组织", "name6": "操作" },
            "tbody": []
        }

        for (var i = 0; i < jobsList.length; i++) {
            let _d = jobsList[i]

            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.unitName,
                "value3": _d.positionName,
                "value4": _d.roleName,
                "value5": _d.unitCodeM == _d.unitCode ? "是" : "否",
                "fns": [{
                    "name": "设为默认",
                    "fn": function () {
                        waiteMsg("正在提交,请稍等...")
                        TUI.platform.put("/staff/unit", {
                            "staffId": _this.props.editInfo.userMaintainInfo.uId,
                            "unitCode": _d.unitCode
                        }, function (result) {
                            if (result.code == 0) {
                                successMsg("设置成功")
                            }
                            else {
                                errorMsg(result.message);
                            }
                            closeSidePage()
                        })
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.patch("/duty/"+_d.poid,function (result) {
                                if (result.code == 0) {
                                    delUserMaintainJobsList(_d.poid)
                                }
                                else {
                                    errorMsg(result.message);
                                }
                            })
                        }
                        openDialog(_this, "是否确定删除【" + _d.unitName + "】", delFetch)
                    }
                }]
            })
        }
        return (
            <div>
                <div className="t-content_t" style={{ marginTop: "-20px" }}>
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />职位列表</span>
                </div>
                <Table id="userMaintainJobsListTable" num="10" tblContent={tblContent} width="50,200,0,0,100,80" />
                <Pager id="userMaintainJobsList" fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
            </div>
        )
    }

    _closeSidePage() {
        closeSidePage()
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


    pageFn(index, loadComplete) {
        const {pageInfo, addUserMaintainJobsList, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", pageInfo.index.size * (index - 1)), function (result) {
            if (result.code == 0) {
                addUserMaintainJobsList(result.data)
                updatePageInfo({
                    index: index
                })
                loadComplete()
            }
            else {
                addUserMaintainJobsList([])
            }
        })
    }

    goBack() {
        this.props.clearEditInfo({
            infoName: "userMaintainInfo"
        })
        closeSidePage()
    }
}


export default TUI._connect({
    pageInfo: "publicInfo.pageInfo",
    sidePageInfo: "publicInfo.sidePageInfo",
    orgnizationId: "userMaintain.orgnizationId",
    editInfo: "formControlInfo.data",
    jobsList: "userMaintain.jobsList"
}, UserMaintainJobsList)
