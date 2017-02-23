import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

//图片
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import singleLeft from "!url!./img/singleLeft.png"
//组件
import PersonMatchPostEdit from "./personMatchPost.edit"
import PositionMaintainEditSelect from "./personMatchPost.editSelect"
import PersonMatchPostEditSetRole from "./personMatchPost.editSetRole"

import FormControls from "FormControls"
import Content3, { openContentLoading, closeContentLoading } from "Content3"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { editFn } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"

class PersonMatchPost extends React.Component {

    render() {
        const {clearPageInfo, errorMsg, updatePageInfo, odata, pageInfo, sidePageStatus, hasVerticalScroll, data, sidePageInfo, addPersonMatchPostRole, updateSearchInfo} = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "职位", "name3": "人数", "name4": "编制数量", "name5": "操作" },
            "tbody": []
        }
        for (var i = 0; i < data.length; i++) {
            let _d = data[i]
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
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
                                updatePageInfo({
                                    id: "personMatchPostEditPager",
                                    index: 1,
                                    size: 10,
                                    sum: result._page.total,
                                    url: _url
                                })
                            }
                            else if (result.code == 404) {
                                addPersonMatchPostRole([])
                            }
                            else {
                                errorMsg(result.message)
                            }
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
                <div>
                    <div className="t-content_t">
                        <span>人职匹配</span>
                    </div>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,150,150,100" />
                    <Pager fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
                </div>
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



    onScrollRefresh(iScrollInstance, $this) {
        this.props.setCanVerticallyScroll(iScrollInstance.hasVerticalScroll)
    }

    componentDidMount() {

    }

    clickMenu($m) {
        let _this = this
        let $menuLi = document.getElementsByClassName("clickmenu")
        for (let j = 0; j < $menuLi.length; j++) {
            let $m1 = $menuLi[j];
            $m1.style.backgroundColor = ""
        }
        $m.style.backgroundColor = "rgba(250,250,250,0.5)"
        $m.style.borderRadius = "3px"

        let id = $m.getAttribute("data-id")
        let code = $m.getAttribute("data-type")
        _this.props.updatePositionMaintainEditId(code)

        this.props.clearEditInfo({
            infoName: "positionMaintainInfo"
        })
        openContentLoading()
        this.loadPosition(id)

        //关闭之后可能打开的SidePage
        closeSidePage({ id: "PersonMatchPostEdit" })
        closeSidePage({ id: "PersonMatchPostEditSelect" })
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            status: "addPositionMaintain",

        })
    }

    loadPosition(id) {
        const {addPersonMatchPost, updatePageInfo, clearPageInfo, updateSearchInfo} = this.props
        clearPageInfo()
        let url = id ? "/positions?unitId=" + id + "&from={0}&limit=10" : "/positions?unitCode=0&from={0}&limit=10"
        TUI.platform.get(url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addPersonMatchPost(result.data)
                updatePageInfo({

                    index: 1,
                    size: 10,
                    sum: result._page.total,
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
            }
            else if (result.code == 404) {
                addPersonMatchPost([])
            }
            else {
                errorMsg(result.message)
                addPersonMatchPost([])
                clearPageInfo()
            }
            closeLoading()
            closeContentLoading()
        })
    }

    updateData(data, deep, fn, _deep, addData, action) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let index = 0; index < data.length; index++) {
                let d = data[index]
                if (d.id == deep[0]) {
                    if (action == "A") {
                        d.deep = parseInt(_deep) + 1

                        if (typeof d.children == "undefined") {
                            d.children = []
                        }

                        d.children.push(addData)
                    }
                    else {
                        d.id = addData.id
                        d.name = addData.name
                        d.code = addData.code
                        d.note = addData.note
                    }
                    fn(this.props.xnsubdata)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, fn, _deep + 1, addData, action)
            }
        }
    }

    delData(data, deep, fn, _deep) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let index = 0; index < data.length; index++) {
                let d = data[index]
                if (d.id == deep[0]) {
                    data.splice(index, 1)
                    fn(this.props.xnsubdata)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.delData(d.children, deep, fn, _deep + 1)
            }
        }
    }


    deleteData(data, deep) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let index = 0; index < data.length; index++) {
                let d = data[index]
                if (d.id == deep[0]) {
                    data.splice(index, 1)
                    this.props.addData(this.props.odata)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.deleteData(d.children, deep)
            }
        }
    }

    openSubMenu(_data, id, deep, loadComplete) {
        const {addData, odata} = this.props
        for (let index = 0; index < _data.length; index++) {
            let d = _data[index]

            if (d.id == id) {
                TUI.platform.get("/units/tree/" + id, function (result) {
                    if (result.code == 0) {
                        let children = []
                        let _deep = parseInt(deep) + 1
                        for (var j = 0; j < result.data.length; j++) {
                            var $s = result.data[j];
                            children.push({
                                id: $s.id,
                                name: $s.name,
                                type: $s.unitCode,
                                isHadSub: $s.isleaf,
                                ext1: $s.unitLevel,
                                num: "",
                                deep: _deep
                            })
                        }
                        d.children = children

                        setTimeout(function () { loadComplete() }, 1000)
                    }
                })
                break
            }
        }
    }


    pageFn(index, loadComplete) {
        const {pageInfo, addPositionMaintain, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", pageInfo.index.size * (index - 1)), function (result) {
            if (result.code == 0) {
                addPositionMaintain(result.data)
                updatePageInfo({
                    index: index
                })
                loadComplete()
            }
            else {
                addPositionMaintain([])
            }
        })

    }
}

export default TUI._connect({
    odata: "orgnizationManage.data",
    data: "personMatchPost.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
    searchInfo: "publicInfo.searchInfo",
    eidtId: "personMatchPost.editId"
}, PersonMatchPost)