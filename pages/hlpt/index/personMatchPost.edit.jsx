import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"

class PersonMatchPostEdit extends React.Component {
    render() {
        const {dialogInfo,pageInfo, sidePageStatus, roleData, sidePageInfo, deletePersonMatchPostRole, addPersonMatchPostSetRoleData, updatePersonMatchPostNumber, updateSearchInfo } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户名", "name4": "角色","name5": "职位级别", "name6": "操作" },
            "tbody": []
        }
        for (var i = 0; i < roleData.length; i++) {
            let _d = roleData[i]
            tblContent.tbody.push({
                "value1": (i + 1),
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.roleName,
                "value5": "",
                "fns": [{
                    "name": "设置角色",
                    "fn": function () {
                        openSidePage(_this, {
                            status: "personMatchPostEditSetRole",
                            gateWay: {
                                positionId: _d.positionId,
                                poId: _d.poid
                            },
                            id: "PersonMatchPostEditSelect"
                        })
                        updateSearchInfo({
                            key: {
                                type: "addPersonMatchPostSetRoleData",
                                positionId: _d.positionId
                            },
                            name: "personMatchPost",
                            info: "请输入关键字(角色)"
                        })
                        TUI.platform.get("/roles?positionId=" + _d.positionId, function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                addPersonMatchPostSetRoleData(_data)
                            }
                            else if(result.code==404) {
                                addPersonMatchPostSetRoleData([])
                            }
                            else{
                                errorMsg(result.message)
                            }
                        })

                    }
                },{
                    "name":"设置级别",
                    "fn":function(){
                        let _placeholder = "请设置级别",
                        min=0,max=0
                        if(!_d.baseLevel && !_d.channelLevel){
                            min = _d.baseLevel
                            max = _d.baseLevel+_d.channelLevel-1
                            _placeholder= _placeholder+",设置范围("+min+"-"+max+")"
                        }

                        openDialog(_this,{
                            title:"职位级别设置",
                            placeholder:"请设置级别",
                            value:dialogInfo
                        },function(){
                            // if(parseInt(dialogInfo)){
                            //     openDialog(_this,"请填写数字")
                            // }
                        })
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        let delFetch = function () {
                            TUI.platform.patch("/duty/" + _d.poid, function (result) {
                                if (result.code == 0) {
                                    let _data = result.data
                                    deletePersonMatchPostRole(_d.poid)
                                    updatePersonMatchPostNumber({
                                        positionId: _d.positionId,
                                        type: "sub"
                                    })
                                }
                                else{
                                    errorMsg(result.errors)
                                }
                            })
                        }

                        openDialog(_this, "是否确定删除【" + _d.cnName + "】", delFetch)
                    }
                }]
            })
        }

        let _personMatchPostEdit = []
        if (sidePageInfo.status == "personMatchPostEdit") {
            _personMatchPostEdit.push(<PersonMatchPostEdit key="personMatchPostEdit" />)
        }

        return (
            <div>
                <Content
                    txt="人员列表"
                    addHref={this.addUser.bind(this)}
                    editHref={this.editUser.bind(this)}
                    backHref={this.goBackContent.bind(this)}
                    addTxt="调入"
                    editTxt="兼职">
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,150,150,100,220" />
                    <Pager id="personMatchPostEditPager" fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
                </Content>
            </div>
        )
    }

    addUser() {
        //调入
        const {sidePageInfo, updateSearchInfo} = this.props
        let _positionId = sidePageInfo.gateWay.positionId
        openSidePage(this, {
            status: "personMatchPostEdit_callin",
            id: "PersonMatchPostEditSelect",
            gateWay: {
                positionId: _positionId
            }
        })
        updateSearchInfo({
            key: {
                type: "personMatchPostEdit_callin",
                positionId: _positionId
            },
            name: "personMatchPost",
            info: "请输入关键字(用户名)"
        })
        // if (this.props.selectUserData.length == 0) {
        //     this.loadUsers(this.props)
        // }
    }

    editUser() {
        //兼职
        const {sidePageInfo, updateSearchInfo} = this.props
        let _positionId = sidePageInfo.gateWay.positionId
        openSidePage(this, {
            status: "personMatchPostEdit_parttime",
            id: "PersonMatchPostEditSelect",
            gateWay: {
                positionId: _positionId
            }
        })
        updateSearchInfo({
            key: {
                type: "personMatchPostEdit_parttime",
                positionId: _positionId
            },
            name: "personMatchPost",
            info: "请输入关键字(用户名)"
        })
        // if (this.props.selectUserData.length == 0) {
        //     this.loadUsers(this.props)
        // }
    }

    loadUsers(_this) {
        TUI.platform.get("/staffs?from=0&limit=20", function (result) {
            if (result.code == 0) {
                _this.addPersonMatchPostSelectUserData(result.data)
            }
            else if(result.code ==404) {
                _this.addPersonMatchPostSelectUserData([])
            }
            else{
                errorMsg(result.message)
            }
        })
    }

    goBackContent() {
        closeSidePage()
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            status: "addPositionMaintain",

        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addPersonMatchPostRole, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.personMatchPostEditPager.url.replace("{0}", pageInfo.personMatchPostEditPager.size * (index - 1)), function (result) {
            if (result.code == 0) {
                addPersonMatchPostRole(result.data)
                updatePageInfo({
                    id: "personMatchPostEditPager",
                    index: index,
                    size: 10,
                    sum: result._page.total,
                    url: pageInfo.personMatchPostEditPager.url
                })
                loadComplete()
            }
            else {
                addPersonMatchPostRole([])
            }
        })

    }
}

export default TUI._connect({
    roleData: "personMatchPost.roleData",
    selectUserData: "personMatchPost.selectUserData",
    sidePageInfo: "publicInfo.sidePageInfo",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
    eidtId: "personMatchPost.editId",
    pageInfo: "publicInfo.pageInfo",
    dialogInfo:"publicInfo.dialogInfo.txt"
}, PersonMatchPostEdit)