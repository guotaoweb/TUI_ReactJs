import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"

class PersonMatchPostEdit extends React.Component {
    render() {
        const {
            setPersonLevel,
            dialogInfo,
            pageInfo,
            sidePageStatus,
            roleData,
            sidePageInfo,
            deletePersonMatchPostRole,
            addPersonMatchPostSetRoleData,
            updatePersonMatchPostNumber,
            updateSearchInfo,
            errorMsg,
            updatePageInfo
        } = this.props

        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户名", "name4": "角色", "name5": "职位级别", "name6": "操作" },
            "tbody": []
        }
        for (var i = 0; i < roleData.length; i++) {
            let _d = roleData[i]
            let _index = pageInfo.personMatchPostEditPager ? pageInfo.personMatchPostEditPager.index : 1
            let _size = pageInfo.personMatchPostEditPager ? pageInfo.personMatchPostEditPager.size : 0
            tblContent.tbody.push({
                "value1": (_index - 1) * _size + (i + 1),
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.roleName,
                "value5": _d.userLevel,
                "fns": [{
                    "name": "设置角色",
                    "fn": function () {
                        openContentLoading()
                        let url = "/roles?positionId=" + _d.positionId + "&from={0}&limit=10"
                        TUI.platform.get(url.replace("{0}", "0"), function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                addPersonMatchPostSetRoleData(_data)
                            }
                            else if (result.code == 404) {
                                addPersonMatchPostSetRoleData([])
                            }
                            else {
                                errorMsg(result.message)
                            }
                            updatePageInfo({
                                id: "personMatchPostSetRolePager",
                                index: 1,
                                size: 10,
                                sum: result._page ? result._page.total : 0,
                                url: url
                            })


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
                            closeContentLoading()

                            _this.props.pushBreadNav({
                                name: _d.cnName
                            })
                        })
                    }
                }, {
                    "name": "设置级别",
                    "fn": function () {
                        let _placeholder = "仅限输入数字",
                            min = 0, max = 0

                        if (!isNaN(parseInt(_d.baseLevel)) && !isNaN(parseInt(_d.channelLevel))) {
                            min = _d.baseLevel
                            max = parseInt(_d.baseLevel) + parseInt(_d.channelLevel) - 1


                            _placeholder = _placeholder + ",设置范围(" + min + "-" + max + ")"
                        }
                        openDialog(_this, {
                            title: "设置级别",
                            placeholder: _placeholder,
                            type: "textarea"
                        }, function () {
                            let _value = _this.props.dialogInfo.value
                            if (isNaN(parseInt(_value))) {
                                openDialog(_this, "请填写数字")
                            }
                            else {
                                let _valid = false
                                if (max == 0 && min == 0) {
                                    _valid = true
                                }
                                else {
                                    if (max > 0 && min < parseInt(_value) && parseInt(_value) < (min + max - 1)) {
                                        _valid = true
                                    }
                                    else {

                                        _valid = false
                                    }
                                }

                                if (_valid) {
                                    let _jsonParam = {
                                        "staffId": _d.staffId,
                                        "userLevel": _value
                                    }
                                    TUI.platform.put("/staff/level", _jsonParam, function (result) {
                                        if (result.code == 0) {
                                            setPersonLevel(_jsonParam)
                                            _this.props.refreshTable()
                                            closeDialog()
                                        }
                                        else {
                                            errorMsg(result.errors)
                                        }
                                    })
                                }
                                else {
                                    openDialog(_this, _placeholder)
                                }

                            }
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
                                    updatePageInfo({
                                        id: "personMatchPostEditPager",
                                        sum: parseInt(pageInfo.personMatchPostEditPager.sum) - 1
                                    })
                                }
                                else {
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
                    <div>
                        <Search placeholder="请输入关键字(用户名)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchPersonMachPostEdit.bind(this)} />
                        <Table bindPager="personMatchPostEditPager" tblContent={tblContent} width="50,0,150,150,100,220" />
                        <Pager id="personMatchPostEditPager" fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
                    </div>
                </Content>
            </div>
        )
    }
    _searchPersonMachPostEdit(val) {
        const {addPersonMatchPostRole, updatePageInfo, errorMsg, pageInfo} = this.props
        let _pageSize = pageInfo["personMatchPostEditPager"] ? pageInfo["personMatchPostEditPager"].size : 10
        let _url = "/dutys/?positionId=" + this.props.sidePageInfo.gateWay.positionId + "&loginUid=" + val + "&from={0}&limit=" + _pageSize
        TUI.platform.get(_url.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                let _data = result.data
                addPersonMatchPostRole(_data)
            }
            else if (result.code == 404) {
                addPersonMatchPostRole([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "personMatchPostEditPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 1,
                url: _url
            })
        })
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
        this.props.pushBreadNav({ name: "调入列表" })
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
        this.props.pushBreadNav({ name: "兼职列表" })
    }

    loadUsers(_this) {
        TUI.platform.get("/staffs?from=0&limit=20", function (result) {
            if (result.code == 0) {
                _this.addPersonMatchPostSelectUserData(result.data)
            }
            else if (result.code == 404) {
                _this.addPersonMatchPostSelectUserData([])
            }
            else {
                errorMsg(result.message)
            }
        })
    }

    goBackContent() {
        closeSidePage()
        this.props.backBreadNav()
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            status: "addPositionMaintain",
        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addPersonMatchPostRole, updatePageInfo} = this.props
        let _pageSize = pageInfo["personMatchPostEditPager"] ? pageInfo["personMatchPostEditPager"].size : 10,
            _url = pageInfo.personMatchPostEditPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", pageInfo.personMatchPostEditPager.size * (index - 1)), function (result) {
            if (result.code == 0) {
                addPersonMatchPostRole(result.data)
                loadComplete()
            }
            else {
                addPersonMatchPostRole([])
            }
            updatePageInfo({
                id: "personMatchPostEditPager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
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
    dialogInfo: "publicInfo.dialogInfo.txt"
}, PersonMatchPostEdit)