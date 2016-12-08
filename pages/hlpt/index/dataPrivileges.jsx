//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { clearCheckBox, updateCheckBoxStatus } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"
import DataPrivilegesDataMenu from "./dataPrivileges.dataMenu"
import DataPrivilegesSideMenu from "./dataPrivileges.sideMenu"

class DataPrivileges extends React.Component {
    render() {
        const {
            dataPrivileges,
            errorMsg,
            userId,
            history,
            sidePageInfo,
            pageInfo,
            addSelectedData,
            addOSData,
            addOData,
            addSide,
            addSelectedSide
        } = this.props

        let _this = this
        let SidePageContent
        if (sidePageInfo.status == "dataPrivilegesDataMenu") {
            SidePageContent = <DataPrivilegesDataMenu key="dataPrivilegesDataMenu" />
        }
        else {
            SidePageContent = <DataPrivilegesSideMenu key="dataPrivilegesSideMenu" />
        }


        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户", "name4": "部门", "name5": "操作" },
            "tbody": []
        }

        for (var i = 0; i < dataPrivileges.length; i++) {
            let _d = dataPrivileges[i]

            //   let _admins = []
            //   for (var j = 0; j < _d.admins.length; j++) {
            //     _admins.push(_d.admins[j].username)
            //   }
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.unitName,
                "fns": [{
                    "name": "数据权限",
                    "fn": function () {
                        openSidePage(_this, {
                            status: "dataPrivilegesDataMenu",
                            width: "500",
                            gateWay: _d.loginUid
                        })

                        TUI.platform.get("/dataprivileges/" + _d.loginUid, function (result) {
                            if (result.code == 0) {
                                let selectedIds = []
                                for (let i = 0; i < result.data.length; i++) {
                                    let $d = result.data[i]
                                    selectedIds.push($d.id)
                                }
                                addOSData(selectedIds)
                            }
                            else if (result.code == 404) {
                                addOSData("")
                            }
                            else {
                                errorMsg(result.message)
                            }
                        }, this)


                    }
                }, {
                    "name": "菜单权限",
                    "fn": function () {
                        openSidePage(_this, {
                            status: "dataPrivilegesSideMenu",
                            width: "400",
                            gateWay: _d.loginUid
                        })

                        TUI.platform.get("/menustaffs/" + _d.loginUid, function (result) {
                            if (result.code == 0) {
                                let selectedIds = []
                                for (let i = 0; i < result.data.length; i++) {
                                    let $d = result.data[i]
                                    selectedIds.push($d.id)
                                }
                                addSelectedSide(selectedIds)
                            }
                            else if (result.code == 404) {
                                addOSData("")
                            }
                            else {
                                errorMsg(result.message)
                            }
                        }, this)


                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="人员列表">
                    <Search placeholder="输入关键字(姓名,账号)搜索" style={{
                        border: "none",
                        borderBottom: "1px solid #ebebeb",
                        width: "98%",
                        margin: "auto"
                    }} fn={this._searchOrgnization.bind(this)} />
                    <Table bindPager="dataPrivilegesPager" tblContent={tblContent} width="50,150,150,0,80" />
                    <Pager id="dataPrivilegesPager" fn={this.pageFn.bind(this)} />
                </Content>
                <SidePage>
                    <div>
                        {SidePageContent}
                    </div>
                </SidePage>
            </div>
        )
    }

    _searchOrgnization(val) {
        let {searchInfo, addDataPrivileges, updatePageInfo, errorMsg, pageInfo} = this.props

        let _pageSize = pageInfo["dataPrivilegesPager"] ? pageInfo["dataPrivilegesPager"].size : 10
        val = val ? "/staffs/?loginName=" + val+"&from={0}&limit="+_pageSize : "/staffs/?isData=1&from={0}&limit=" + _pageSize
        TUI.platform.get(val.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addDataPrivileges(result.data)
            }
            else if (result.code == 404) {
                addDataPrivileges([])
            }
            else {
                errorMsg(result.message)
            }

            updatePageInfo({
                id:"dataPrivilegesPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: val
            })
        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addDataPrivileges, updatePageInfo} = this.props
        let _pageSize = pageInfo["dataPrivilegesPager"] ? pageInfo["dataPrivilegesPager"].size : 10,
            _url = pageInfo.dataPrivilegesPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize

        TUI.platform.get(rUrl.replace("{0}", index * pageInfo.dataPrivilegesPager.size), function (result) {
            if (result.code == 0) {
                addDataPrivileges(result.data)
                updatePageInfo({
                    index: index
                })
                loadComplete()
            }
            else {
                addDataPrivileges([])
            }
            updatePageInfo({
                id: "dataPrivilegesPager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
        })
    }

    componentDidMount() {
        const {
            addDataPrivileges, 
            updateOData, 
            orgnization, 
            updatePageInfo, 
            updateSearchInfo, 
            userId, 
            errorMsg
        } = this.props
        this.props.addBreadNav({ name: "权限管理" })
        //获取数据权限列表
        openLoading()
        let url = "/staffs/?isData=1&from={0}&limit=10"
        TUI.platform.get(url.replace("{0}","0"), function (result) {
            if (result.code == 0) {
                addDataPrivileges(result.data)

                //更新搜索信息
                updateSearchInfo({
                    key: "",
                    name: "dataPrivileges",
                    info: "请输入关键字(用户名)"
                })

                closeLoading()
            }
            else if (result.code == 404) {
                addDataPrivileges([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id:"dataPrivilegesPager",
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 0,
                url: url
            })
        }, this)

        //获取组织机构
        TUI.platform.get("/units/treeCode/0", function (result) {
            if (result.code == 0) {
                let _d = []
                for (var i = 0; i < result.data.length; i++) {
                    var $d = result.data[i];
                    _d.push({
                        id: $d.id,
                        name: $d.name,
                        isHadSub: $d.isleaf,
                        deep: "1",
                        sId: $d.id
                    })
                }
                //sId: $d.unitCode
                updateOData(_d)
            }
            else {
                errorMsg(result.message)
            }
        })

    }
}


export default TUI._connect({
    dataPrivileges: "dataPrivileges.data",
    orgnization: "orgnizations.odata",
    userId: "publicInfo.userInfo.userId",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, DataPrivileges)