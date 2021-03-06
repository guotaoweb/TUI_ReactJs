//组件
import PositionMaintainEdit from "./positionMaintain.edit"
import PositionMaintainRoleInList from "./positionMaintain.role.jobList"
import FormControls from "FormControls"
import { getContentIndex } from "Content2"
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"
import {openSideContent} from "SideContent"

class PositionMaintain extends React.Component {
    render() {
        const {
            errorMsg,
            odata,
            pageInfo,
            sidePageStatus,
            data,
            sidePageInfo,
            updatePageInfo
        } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "职位代码", "name3": "职位名称-desc-positionName", "name4": "所属组织", "name5": "状态", "name6": "编制","name7":"人数","name8":"排序号-desc-sort", "name9": "操作" },
            "tbody": []
        }

        for (var i = 0; i < data.length; i++) {
            let _d = data[i]
            let _index = pageInfo.positionMaintainPager ? pageInfo.positionMaintainPager.index : 1
            let _size = pageInfo.positionMaintainPager ? pageInfo.positionMaintainPager.size : 0
            tblContent.tbody.push({
                "value1": (_index - 1) * _size + (i + 1),
                "value2": _d.postId,
                "value3": _d.positionName,
                "value4": _d.unitShortName,
                "value5": _d.statusName,
                "value6": _d.staffing,
                "value7": _d.sumStaff,
                "value8": _d.sort,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {

                        openContentLoading()
                        TUI.platform.get("/position/" + _d.positionId, function (result) {
                            if (result.code == 0) {
                                let _data = result.data

                                _this.props.addEditInfo({
                                    infoName: "positionMaintainInfo",
                                    name: _data.positionName,//职位名称
                                    id: _data.positionId,//职位ID
                                    staffing: _data.staffing,//职位编制
                                    positionFamily: _data.jobfamilyId,//职位族
                                    jobFamily: _data.jobseqId,//职位序列
                                    positionLevel: _data.positionLevel,//级别
                                    remark: _data.remark,//职位说明
                                    sort: _data.sort//排序
                                })

                                openSidePage(_this, {
                                    status: "editPositionMaintain",
                                    gateWay: {
                                        positionId: _d.positionId
                                    }
                                })

                                TUI.platform.get("/jobfamilys/" + _data.jobfamilyId, function (result) {
                                    if (result.code == 0) {
                                        let _data = result.data
                                        let newData = []
                                        for (var i = 0; i < _data.length; i++) {
                                            var $d = _data[i];
                                            newData.push({
                                                id: $d.seqId,
                                                name: $d.seqName
                                            })
                                        }
                                        _this.props.addPositionMaintainJobFamilys(newData)
                                    }
                                    else if (result.code == 404) {
                                        addPositionMaintainJobFamilys([])
                                    }
                                    else {
                                        errorMsg(result.message)
                                    }
                                })
                            }
                            else if (result.code == 404) {
                                _this.props.addEditInfo({})
                            }
                            else {
                                errorMsg(result.message)
                            }
                            _this.props.pushBreadNav({ name: _d.positionName })
                            closeContentLoading()
                        })

                        getContentIndex(0)
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        let delFetch = function () {
                            TUI.platform.patch("/position/" + _d.positionId, function (result) {
                                if (result.code == 0) {
                                    _this.props.successMsg("职位删除成功")
                                    _this.props.deletePositionMaintain(_d.positionId)
                                    updatePageInfo({
                                        id: "positionMaintainPager",
                                        sum: parseInt(pageInfo.positionMaintainPager.sum) - 1
                                    })
                                }
                                else {
                                    errorMsg(result.errors)
                                }
                            })
                        }

                        openDialog(_this, "是否确定删除该职位信息?", delFetch)
                    }
                }]
            })
        }


        let _positionMaintainEdit = []
        let _positionMaintainRoleEdit = []
        if (sidePageInfo.status == "addPositionMaintain" || sidePageInfo.status == "editPositionMaintain" || sidePageInfo.status == "editPositionMaintainRole") {
            _positionMaintainEdit.push(<PositionMaintainEdit key="orgnization_edit" />)
        }

        if (sidePageInfo.status == "editPositionMaintainRole") {
            _positionMaintainRoleEdit.push(<PositionMaintainRoleInList key="PositionMaintainRoleInList" />)
        }

        return (
            <div>
                <Content txt="职位维护" addHref={this.addPositionMaintainBtn.bind(this)} addHrefTx="新增">
                    <div>
                        <Search placeholder="输入关键字(职位名称)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchPositionMaintain.bind(this)} />
                        <Table id="positionMaintain" bindPager="positionMaintainPager" tblContent={tblContent}  sort={this.tblSort.bind(this)} width="50,100,0,0,70,70,70,70,100" />
                        <Pager id="positionMaintainPager" fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage id="PositionMaintain">
                    <div>
                        {_positionMaintainEdit}
                    </div>
                </SidePage>
                <SidePage id="PositionMaintainRoleEdit">
                    <div>
                        {_positionMaintainRoleEdit}
                    </div>
                </SidePage>
            </div >
        )
    }

    _searchPositionMaintain(val,loadComplete) {
        let {searchInfo, addPositionMaintain, updatePageInfo, errorMsg, pageInfo} = this.props
        let _pageSize = pageInfo["positionMaintainPager"] ? pageInfo["positionMaintainPager"].size : 10
        val = "/positions?unitId=" + searchInfo.key + "&positionName=" + val + "&from={0}&limit=" + _pageSize
        TUI.platform.get(val.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addPositionMaintain(result.data)
            }
            else if (result.code == 404) {
                addPositionMaintain([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "positionMaintainPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 1,
                url: val
            })
            loadComplete()
        })
    }

    tblSort(params) {
        let sort = ""
        if (params.sort == "desc") {
            sort = "%2B" + params.filter
        }
        else {
            sort = "-" + params.filter
        }

        this.loadPosition(this.props.sideContentInfo.id, sort)
    }

    componentDidUpdate() {
        const {sideContentInfo, componentInfo, updateComponentInfo} = this.props
        if (componentInfo.key != sideContentInfo.key) {
            this.loadPosition(sideContentInfo.id)

            this.props.clearEditInfo({
                infoName: "positionMaintainInfo"
            })
            openContentLoading()
            closeSidePage()
            this.props.updateEditInfo({
                infoName: "jobsInfo",
                status: "list"
            })
            this.props.updateEditInfo({
                infoName: "rolesInfo",
                status: "list"
            })

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

    componentDidMount() {
        let _this = this;

        const {addBreadNav, sideContentInfo} = this.props
        openSideContent()
        this.loadPosition(sideContentInfo.id)

        TUI.platform.get("/positionFamilys", function (result) {
            if (result.code == 0) {
                let _data = result.data
                let newData = []

                for (var i = 0; i < _data.length; i++) {
                    var $d = _data[i];
                    newData.push({
                        id: $d.familyCode,
                        name: $d.familyName
                    })
                }
                _this.props.addPositionMaintainPositionFamilys(newData)
            }
            else if (result.code == 404) {
                _this.props.addPositionMaintainPositionFamilys([])
            }
            else {
                errorMsg(result.message)
            }
        })


        addBreadNav({ name: "职位维护" })
    }

    addPositionMaintainBtn() {
        const {sideContentInfo,updatePositionMaintainEditId,pushBreadNav} = this.props
        openSidePage(this, {
            status: "addPositionMaintain",
            id: "PositionMaintain"
        })

        updatePositionMaintainEditId(sideContentInfo.type)

        pushBreadNav({ name: "添加职位信息" })
    }

    loadPosition(id,sort) {
        const {addPositionMaintain, updatePageInfo, clearPageInfo, updateSearchInfo, pageInfo} = this.props
        let _pageSize = pageInfo["positionMaintainPager"] ? pageInfo["positionMaintainPager"].size : 10,
            url = id ? "/positions?unitId=" + id +"&sort=" + (sort ? sort : "") +  "&from={0}&limit=" + _pageSize : "/positions?unitCode=0&from={0}&limit=" + _pageSize
        TUI.platform.get(url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addPositionMaintain(result.data)
            }
            else if (result.code == 404) {
                addPositionMaintain([])
            }
            else {
                errorMsg(result.message)
            }

            updatePageInfo({
                id: "positionMaintainPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: url
            })

            //更新搜索信息
            updateSearchInfo({
                key: id,
                name: "positionMaintain",
                info: "输入关键字(职位名称)"
            })
            closeContentLoading()
            closeLoading()
        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addPositionMaintain, updatePageInfo} = this.props

        let _pageSize = pageInfo["positionMaintainPager"] ? pageInfo["positionMaintainPager"].size : 10,
            _url = pageInfo.positionMaintainPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", _pageSize * (index - 1)), function (result) {
            if (result.code == 0) {
                addPositionMaintain(result.data)
                loadComplete()
            }
            else if (result.code == 404) {
                addPositionMaintain([])
            }
            else {
                addPositionMaintain([])
            }
            updatePageInfo({
                id: "positionMaintainPager",
                index: index,
                size: _pageSize,
                sum: pageInfo.positionMaintainPager.sum,
                url: rUrl
            })
        })

    }
}

export default TUI._connect({
    data: "positionMaintain.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    searchInfo: "publicInfo.searchInfo",
    eidtInfo: "formControlInfo.data",
    sideContentInfo: "publicInfo.sideContentInfo",
    componentInfo: "personMatchPost.componentInfo"
}, PositionMaintain)