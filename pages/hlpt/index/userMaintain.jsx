//组件
import FormControls from "FormControls"
import { getContentIndex } from "Content2"
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from 'Search'
import { openSideContent } from "SideContent"

import UserMaintainEdit from "./userMaintain.edit"
import UserMaintainResetJob from "./userMaintain.resetJob"
import UserMaintainDetail from "./userMaintain.detail"

let USERMAINTAIN_ID = ""

class UserMaintain extends React.Component {
    render() {
        const {
            odata,
            pageInfo,
            sidePageStatus,
            data,
            addEditInfo,
            errorMsg,
            updatePageInfo
        } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "用户名-desc-cnName", "name3": "账号-desc-loginUid", "name4": "默认组织", "name5": "职位", "name6": "手机", "name7": "排序号", "name9": "操作" },
            "tbody": []
        }//empNumber
        for (var i = 0; i < data.length; i++) {
            let _d = data[i]
            let _index = pageInfo.userMaintainPager ? pageInfo.userMaintainPager.index : 1
            let _size = pageInfo.userMaintainPager ? pageInfo.userMaintainPager.size : 0
            tblContent.tbody.push({
                "value1": (_index - 1) * _size + (i + 1),
                "value2": _d.cnName+"_"+_d.empNumber,
                "value3": _d.loginUid,
                "value4": _d.unitName,
                "value5": _d.positionNames,
                "value6": _d.mobilePhone,
                "value7": _d.sort,

                "fns": [{
                    "name": "详情",
                    "fn": function () {
                        openContentLoading()

                        TUI.platform.get("/staff/" + _d.staffId, function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                addEditInfo({
                                    infoName: "userMaintainInfo",
                                    uId: _data.staffId,//用户ID
                                    user: _data.loginUid,//用户名
                                    name: _data.cnName,//中文名
                                    status: _data.status,//账户状态
                                    mobile: _data.mobilePhone,//常用手机
                                    shortNumber: _data.shortPhone,//短号码
                                    fax: _data.fax,//传真
                                    companyPhone: _data.telephone,//办公电话
                                    companyAddress: _data.officeAddress,//办公地址
                                    idCard: _data.userNumber,//身份证
                                    orgnization: _data.unitId,//默认组织
                                    wx: "",//微信号
                                    sort: _data.sort,//排序号
                                    isShow: _data.ext2,//是否显示
                                    kind: _data.kind,
                                    staffCode: _data.staffCode,
                                    ext5: _data.ext5,
                                    ext5Name: _d.unitName,
                                    empNumber: _data.empNumber
                                })


                                TUI.platform.get("/staff/unit/" + _d.staffId, function (result) {
                                    if (result.code == 0) {
                                        _this.props.addDefaultUnit(result.data)
                                    }
                                })
                            }
                            else if (result.code == 404) {
                                addEditInfo({})
                            }
                            else {
                                errorMsg(result.message)
                            }
                            openSidePage(_this, {
                                id: "userMaintainDetail",
                                status: "userMaintainDetail"
                            })
                            closeContentLoading()
                            getContentIndex(0)
                            _this.props.pushBreadNav({ name: _d.cnName })
                        })
                    }
                }, {
                    "name": "编辑",
                    "fn": function () {
                        openContentLoading()

                        TUI.platform.get("/staff/" + _d.staffId, function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                addEditInfo({
                                    infoName: "userMaintainInfo",
                                    uId: _data.staffId,//用户ID
                                    user: _data.loginUid,//用户名
                                    name: _data.cnName,//中文名
                                    status: _data.status,//账户状态
                                    mobile: _data.mobilePhone,//常用手机
                                    shortNumber: _data.shortPhone,//短号码
                                    fax: _data.fax,//传真
                                    companyPhone: _data.telephone,//办公电话
                                    companyAddress: _data.officeAddress,//办公地址
                                    idCard: _data.userNumber,//身份证
                                    orgnization: _data.unitId,//默认组织
                                    wx: "",//微信号
                                    sort: _data.sort,//排序号
                                    isShow: _data.ext2,//是否显示
                                    kind: _data.kind,
                                    staffCode: _data.staffCode,
                                    ext5: _data.ext5,
                                    ext5Name: _d.unitName,
                                    empNumber: _data.empNumber
                                })


                                TUI.platform.get("/staff/unit/" + _d.staffId, function (result) {
                                    if (result.code == 0) {
                                        _this.props.addDefaultUnit(result.data)
                                    }
                                })
                            }
                            else if (result.code == 404) {
                                addEditInfo({})
                            }
                            else {
                                errorMsg(result.message)
                            }
                            openSidePage(_this, {
                                id: "userMaintainEdit",
                                status: "editUserMaintain"
                            })
                            closeContentLoading()
                            getContentIndex(0)
                            _this.props.pushBreadNav({ name: _d.cnName })
                        })

                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        let delFetch = function () {
                            TUI.platform.patch("/staff/" + _d.staffId, function (result) {
                                if (result.code == 0) {
                                    _this.props.successMsg("用户删除成功")
                                    _this.props.deleteUserMaintain(_d.staffId)
                                    updatePageInfo({
                                        id: "userMaintainPager",
                                        sum: parseInt(pageInfo.orgnizationPager.sum) - 1
                                    })
                                }
                                else {
                                    errorMsg(result.errors)
                                }
                            })
                        }

                        openDialog(_this, "警告:执行“删除”操作该用户将被永久删除，如果只删除职位请点击[编辑]进入[职位信息]列表删除对应的职位", delFetch)
                    }
                }]
            })
        }



        return (
            <div>
                <Content txt="用户信息维护" addHref={this.addUserMaintainBtn.bind(this)} addHrefTxt="新增">
                    <div>
                        <Search placeholder="输入关键字(用户名、账号、员工号)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchUserMaintain.bind(this)} />
                        <Table id="userMaintain" bindPager="userMaintainPager" tblContent={tblContent} width="50,100,100,0,0,200,80,80" sort={this.tblSort.bind(this)} />
                        <Pager id="userMaintainPager" fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
                    </div>
                </Content>
                <SidePage id="userMaintainEdit">
                    <div>
                        <UserMaintainEdit key="userMaintain_edit" />
                    </div>
                </SidePage>
                <SidePage id="userMaintainDetail">
                    <div>
                        <UserMaintainDetail key="userMaintain_detail" />
                    </div>
                </SidePage>

                <SidePage id="resetJob">
                    <div>
                        <UserMaintainResetJob key="userMaintain_resetjob" />
                    </div>
                </SidePage>
            </div >
        )
    }

    tblSort(params) {
        let sort = ""
        if (params.sort == "desc") {
            sort = "%2B" + params.filter
        }
        else {
            sort = "-" + params.filter
        }

        this.loadUser(USERMAINTAIN_ID, sort)
    }

    componentDidUpdate() {
        const {sideContentInfo, componentInfo, updateComponentInfo} = this.props
        if (componentInfo.key != sideContentInfo.key) {
            this.props.clearEditInfo({
                infoName: "userMaintainInfo"
            })
            openContentLoading()
            this.loadUser(sideContentInfo.id)
            USERMAINTAIN_ID = sideContentInfo.id
            closeSidePage()
            this.props.addBreadNav({ name: "用户信息维护" })
            openContentLoading()

            updateComponentInfo(sideContentInfo)
            return true
        }
        else {
            return false
        }
    }

    componentWillUnmount() {
        this.props.updateSideContentInfo({
            key: TUI.fn.newGuid()
        })
    }

    _searchUserMaintain(val) {
        let {searchInfo, addUserMaintain, updatePageInfo, errorMsg, pageInfo} = this.props
        let _pageSize = pageInfo["userMaintainPager"] ? pageInfo["userMaintainPager"].size : 10
        val = val ? "/staffs?loginName=" + val + "&from={0}&limit=10" : pageInfo.userMaintainPager.url
        TUI.platform.get(val.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addUserMaintain(result.data)
            }
            else if (result.code == 404) {
                addUserMaintain([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "userMaintainPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                surl: val
            })
        })
    }

    componentDidMount() {
        const {addBreadNav, sideContentInfo} = this.props
        openSideContent()
        this.loadUser(sideContentInfo.id)
        addBreadNav({ name: "用户信息维护" })
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            id: "userMaintainEdit",
            status: "addUserMaintain",
        })

        this.props.clearEditInfo({
            infoName: "userMaintainInfo"
        })
    }

    loadUser(id, sort) {
        const {errorMsg, addUserMaintain, updatePageInfo, clearPageInfo, updateSearchInfo, pageInfo} = this.props
        let _pageSize = pageInfo["userMaintainPager"] ? pageInfo["userMaintainPager"].size : 10,
            url = id ? "/staffs?unitId=" + id + "&sort=" + (sort ? sort : "") + "&from={0}&limit=" + _pageSize : "/staffs?from={0}&limit=" + _pageSize

        TUI.platform.get(url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addUserMaintain(result.data)
            }
            else if (result.code == 404) {
                addUserMaintain([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "userMaintainPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: url
            })
            //更新搜索信息
            updateSearchInfo({
                key: id,
                name: "userMaintain",
                info: "输入关键字(用户名称或账号)"
            })
            closeContentLoading()
        })
    }



    pageFn(index, loadComplete) {
        const {pageInfo, addUserMaintain, updatePageInfo} = this.props
        let _pageSize = pageInfo["userMaintainPager"] ? pageInfo["userMaintainPager"].size : 10,
            _initUrl = pageInfo.userMaintainPager.url,
            _initSurl = pageInfo.userMaintainPager.surl,
            _url = _initSurl == "#" ? _initUrl : _initSurl,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", _pageSize * (index - 1)), function (result) {
            if (result.code == 0) {
                addUserMaintain(result.data)
                loadComplete()
            }
            else {
                addUserMaintain([])
            }
            updatePageInfo({
                id: "userMaintainPager",
                index: index,
                size: _pageSize,
                sum: pageInfo.userMaintainPager ? pageInfo.userMaintainPager.sum : 0,
                url: _initSurl == "#" ? rUrl : _initUrl,
                surl: _initSurl == "#" ? _initSurl : rUrl,
            })
        })

    }

    addUserMaintainBtn() {
        openSidePage(this, {
            id: "userMaintainEdit",
            status: "addUserMaintain",
        })

        this.props.pushBreadNav({ name: "添加用户信息" })
    }

    // loadUserUnint() {
    //     TUI.platform.get("/staff/unit/" + _d.staffId, function (result) {
    //         if (result.code == 0) {
    //             _this.props.addDefaultUnit(result.data)
    //         }
    //     })
    // }
}

export default TUI._connect({
    data: "userMaintain.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    searchInfo: "publicInfo.searchInfo",
    sideContentInfo: "publicInfo.sideContentInfo",
    componentInfo: "personMatchPost.componentInfo"
}, UserMaintain)