//组件
import PersonMatchPostEdit from "./personMatchPost.edit"
import PositionMaintainEditSelect from "./personMatchPost.editSelect"
import PersonMatchPostEditSetRole from "./personMatchPost.editSetRole"

import FormControls from "FormControls"
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"
import { openSideContent } from "SideContent"

class PersonMatchPost extends React.Component {

    render() {
        const {
            clearPageInfo,
            errorMsg,
            updatePageInfo,
            odata,
            pageInfo,
            sidePageStatus,
            data,
            sidePageInfo,
            addPersonMatchPostRole,
            updateSearchInfo
        } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "职位", "name3": "人数", "name4": "编制数量", "name5": "操作" },
            "tbody": []
        }
        for (var i = 0; i < data.length; i++) {
            let _d = data[i]
            let _index = pageInfo.personMatchPostPager ? pageInfo.personMatchPostPager.index : 1
            let _size = pageInfo.personMatchPostPager ? pageInfo.personMatchPostPager.size : 0
            tblContent.tbody.push({
                "value1": (_index - 1) * _size + (i + 1),
                "value2": _d.positionName,
                "value3": _d.sumStaff,
                "value4": _d.staffing ? _d.staffing : 0,
                "fns": [{
                    "name": "设置",
                    "fn": function () {
                        openContentLoading()
                        clearPageInfo({
                            id: "personMatchPostEditPager"
                        })
                        let _url = "/dutys/?positionId=" + _d.positionId + "&from={0}&limit=10"
                        TUI.platform.get(_url.replace("{0}", 0), function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                addPersonMatchPostRole(_data)
                                _this.props.refreshTable()

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
                                size: 10,
                                sum: result._page ? result._page.total : 1,
                                url: _url
                            })
                            openSidePage(_this, {
                                status: "personMatchPostEdit",
                                id: "PersonMatchPostEdit",
                                gateWay: {
                                    positionId: _d.positionId
                                }
                            })

                            updateSearchInfo({
                                key: {
                                    type: "addPersonMatchPostRole",
                                    positionId: _d.positionId
                                },
                                name: "personMatchPost",
                                info: "请输入关键字(用户名)"
                            })
                            closeContentLoading()
                            _this.props.pushBreadNav({ name: _d.positionName })
                        })

                    }
                }]
            })
        }

        let _personMatchPostEdit = []
        let _personMatchPostEditSelect = []
        if (sidePageInfo.status == "personMatchPostEditSetRole" || sidePageInfo.status == "personMatchPostEdit_callin" || sidePageInfo.status == "personMatchPostEdit_parttime" || sidePageInfo.status == "personMatchPostEdit") {
            _personMatchPostEdit.push(<PersonMatchPostEdit key="personMatchPostEdit" />)
        }

        if (sidePageInfo.status == "personMatchPostEdit_callin" || sidePageInfo.status == "personMatchPostEdit_parttime") {
            //调入/兼职
            _personMatchPostEditSelect.push(<PositionMaintainEditSelect key="personMatchPostEditSelect" />)
        }
        else {
            _personMatchPostEditSelect.push(<PersonMatchPostEditSetRole key="personMatchPostEditSetRole" />)
        }

        return (
            <div>
                <Content txt="人职匹配">
                    <div>
                        <Search placeholder="输入关键字(职位名称)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchPersonMachPost.bind(this)} />
                        <Table bindPager="personMatchPostPager" tblContent={tblContent} width="50,0,150,150,100" />
                        <Pager id="personMatchPostPager" fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
                    </div>
                </Content>
                <SidePage id="PersonMatchPostEdit">
                    <div>
                        {_personMatchPostEdit}
                    </div>
                </SidePage>
                <SidePage id="PersonMatchPostEditSelect">
                    <div>
                        {_personMatchPostEditSelect}
                    </div>
                </SidePage>
            </div >
        )
    }

    _searchPersonMachPost(val) {
        let {errormsg, searchInfo, updatePageInfo, addPersonMatchPost, pageInfo} = this.props
        let _pageSize = pageInfo["personMatchPostPager"] ? pageInfo["personMatchPostPager"].size : 10
        let _url = "/positions/?unitId=" + searchInfo.key.unitId + "&positionName=" + val + "&from={0}&limit=" + _pageSize
        TUI.platform.get(_url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                let _data = result.data
                addPersonMatchPost(_data)
            }
            else if (result.code == 404) {
                addPersonMatchPost([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 1,
                url: _url
            })
        })
    }

    componentDidUpdate(prevProps) {
        const {sideContentInfo, componentInfo, updateComponentInfo} = this.props
        if (componentInfo.key != sideContentInfo.key) {
            this.loadPosition(sideContentInfo.id)
            //关闭之后可能打开的SidePage
            closeSidePage({ id: "PersonMatchPostEdit" })
            closeSidePage({ id: "PersonMatchPostEditSelect" })
            this.props.addBreadNav({ name: "人职匹配" })

            this.props.clearEditInfo({
                infoName: "positionMaintainInfo"
            })
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

    componentDidMount() {
        const {addBreadNav,sideContentInfo} = this.props
        openSideContent()
        this.loadPosition(sideContentInfo.id)
        addBreadNav({
            name: "人职匹配"
        })
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            status: "addPositionMaintain",
        })
    }

    loadPosition(id) {
        const {addPersonMatchPost, updatePageInfo, clearPageInfo, updateSearchInfo, pageInfo} = this.props
        clearPageInfo()
        let _pageSize = pageInfo["personMatchPostPager"] ? pageInfo["personMatchPostPager"].size : 10
        let url = id ? "/positions?unitId=" + id + "&from={0}&limit=" + _pageSize : "/positions?unitCode=0&from={0}&limit=" + _pageSize
        TUI.platform.get(url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addPersonMatchPost(result.data)
            }
            else if (result.code == 404) {
                addPersonMatchPost([])
            }
            else {
                errorMsg(result.message)
                addPersonMatchPost([])
                clearPageInfo()
            }
            updatePageInfo({
                id: "personMatchPostPager",
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 1,
                url: url
            })
            //更新搜索信息
            updateSearchInfo({
                key: {
                    type: "addPersonMatchPost",
                    unitId: id
                },
                name: "personMatchPost",
                info: "输入关键字(职位名称)"
            })
            closeLoading()
            closeContentLoading()
        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addPersonMatchPost, updatePageInfo} = this.props
        let _pageSize = pageInfo["personMatchPostPager"] ? pageInfo["personMatchPostPager"].size : 10,
            _url = pageInfo.personMatchPostPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", _pageSize * (index - 1)), function (result) {
            if (result.code == 0) {
                addPersonMatchPost(result.data)
                loadComplete()
            }
            else {
                addPersonMatchPost([])
            }
            updatePageInfo({
                id: "personMatchPostPager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
        })

    }
}

export default TUI._connect({
    data: "personMatchPost.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    searchInfo: "publicInfo.searchInfo",
    sideContentInfo: "publicInfo.sideContentInfo",
    componentInfo: "personMatchPost.componentInfo"
}, PersonMatchPost)