//图片
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import singleLeft from "!url!./img/singleLeft.png"
//组件

import OrgnizationEdit from "./orgnization.edit"
import FormControls from "FormControls"
import Content3, { openContentLoading, closeContentLoading } from "Content3"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { editFn } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"

class Orgnization extends React.Component {
    render() {
        let _this = this
        const {
            odata,
            pageInfo,
            sidePageStatus,
            hasVerticalScroll,
            subList,
            successMsg,
            delSubList,
            errorMsg
        } = _this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "组织编码", "name3": "名称", "name4": "排序号", "name5": "上级组织", "name6": "状态", "name7": "操作" },
            "tbody": []
        }
        for (var i = 0; i < subList.length; i++) {
            let _d = subList[i]
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.unitCode,
                "value3": _d.unitName,
                "value4": _d.sort,
                "value5": _d.superExt2,
                "value6": _d.statusName,
                "fns": [{
                    "name": "编辑",
                    "fn": function() {
                        //获取单击的组织详情
                        openContentLoading()
                        _this.editMenu({ id: _d.unitId, deep: "0-" + _d.unitId })


                    }
                }, {
                    "name": "删除",
                    "fn": function() {
                        let delFetch = function() {
                            TUI.platform.patch("/unit/" + _d.unitId, function(result) {
                                if (result.code == 0) {
                                    //删除列表中的组织
                                    delSubList({
                                        unitId: _d.unitId
                                    })

                                    let _deep = _this.props.relateId + "-" + _d.unitId
                                    //删除树中的组织
                                    _this.deleteData(_this.props.odata, _deep.split("-"))

                                    successMsg("组织删除成功")
                                }
                                else {
                                    errorMsg(result.message)
                                }
                            })
                        }

                        openDialog(_this, "是否确定删除【" + _d.unitName + "】", delFetch)
                    }
                }]
            })
        }

        let addBtn
        if (this.props.relateId) {
            addBtn = <Btn type="add" txt="新增" href={this.addMenuBtn.bind(this)} style={{ float: "right" }} />
        }

        return (
            <div>
                <Content3>
                    <div>
                        <MultyMenu data={odata} type="edit" lastdeep="6" color="white" addMenu={this.addMenu.bind(this)} editMenu={this.editMenu.bind(this)} delMenu={this.delMenu.bind(this)} clickMenu={this.clickMenu.bind(this)} openSubMenu={this.openSubMenu.bind(this)} style={{ marginTop: "20px" }} />
                        <br />
                    </div>

                    <div></div>
                    <div className="t-content_t">
                        <span>组织信息列表</span>
                        {addBtn}
                    </div>
                    <div>
                        <Search placeholder="输入关键字(名称,组织编码)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchOrgnization.bind(this)} />
                        <Table num="10" tblContent={tblContent} width="50,140,0,80,0,80,80" />
                        <Pager fn={this.pageFn.bind(this)} style={{ float: "right"}} />
                    </div>
                </Content3>
                <SidePage>
                    <div>
                        <OrgnizationEdit key="orgnization_edit" />
                    </div>
                </SidePage>
            </div >
        )
    }


    componentDidMount() {
        let _this = this;

        const {addData, errorMsg, addUnitBizTypes, addPositionTypes, addStatus, addCity, addSubList, updatePageInfo, addUnitKind} = this.props
        openLoading()
        //获取组织根节点,且默认展开第一个父节点
        TUI.platform.get("/units/tree/0", function(result) {
            if (result.code == 0) {
                let node = []
                for (let index = 0; index < result.data.length; index++) {
                    let _d = result.data[index];
                    node.push({
                        id: _d.id,
                        name: _d.name,
                        type: _d.unitCode,
                        isHadSub: _d.isleaf,
                        ext1: _d.unitLevel,
                        num: "",
                        deep: 1,
                        btns: "A/E"
                    })
                }
                addData(node)


                let $clickMenu = document.getElementsByClassName("clickmenu")[0]
                $clickMenu.style.backgroundColor = "rgba(250,250,250,0.5)"
                $clickMenu.style.borderRadius = "3px"
                let firtNodeId = $clickMenu.getAttribute("data-id")
                let firstRelateId = $clickMenu.getAttribute("data-deep") ? $clickMenu.getAttribute("data-deep") : firtNodeId
                let firstUnitCode = $clickMenu.getAttribute("data-type")
                _this.loadSubOrgnization(firtNodeId)

                _this.props.updateOrgnizationRelateId({
                    relateId: firstRelateId,//级联的关系ID
                    unitCode: firstUnitCode //上级的code
                })

                //展开第一个节点的一级子节点
                TUI.platform.get("/units/tree/" + firtNodeId, function(result) {
                    if (result.code == 0) {

                        for (var i = 0; i < _this.props.odata.length; i++) {
                            var d = _this.props.odata[i]
                            if (d.id == firtNodeId) {
                                let children = []
                                for (var j = 0; j < result.data.length; j++) {
                                    var $s = result.data[j];
                                    children.push({
                                        id: $s.id,
                                        name: $s.name,
                                        type: $s.unitCode,
                                        isHadSub: $s.isleaf,
                                        num: "",
                                        ext1: $s.unitLevel,
                                        deep: 2
                                    })
                                }

                                d.children = children
                                addData(_this.props.odata)
                                $clickMenu.nextSibling.style.display = "block"
                                let $img = $clickMenu.getElementsByTagName("img")[1]
                                $img.setAttribute("data-status", "show")
                                $img.setAttribute("src", minus)

                                closeLoading()
                            }
                        }

                    }
                })
            }
            else {
                errorMsg(result.message);
            }
        })

        //获取业务类型
        TUI.platform.get("/unitbiztypes/dict", function(result) {
            if (result.code == 0) {
                addUnitBizTypes(result.data)
            }
            else {
                errorMsg("业务类型:" + Config.ERROR_INFO[result.code]);
            }
        })


        //获取机构类别
        TUI.platform.get("/codeinfos/dict/unitKind", function(result) {
            if (result.code == 0) {
                addUnitKind(result.data)
            }
            else {
                errorMsg("机构类别:" + Config.ERROR_INFO[result.code]);
            }
        })

        //获取状态
        TUI.platform.get("/codeinfos/dict/unitStatus", function(result) {
            if (result.code == 0) {
                addStatus(result.data)
            }
            else {
                errorMsg("状态:" + Config.ERROR_INFO[result.code]);
            }
        })

        //获取地区
        TUI.platform.get("/codeinfos/dict/city", function(result) {
            if (result.code == 0) {
                addCity(result.data)
            }
            else {
                errorMsg("地区:" + Config.ERROR_INFO[result.code]);
            }
        })



        this.props.addBreadNav({ name: "组织架构维护" })
        //this.loadSubOrgnization();
    }


    _searchOrgnization(val) {
        let {searchInfo, addSubList, updatePageInfo, errorMsg} = this.props
        //uid=" + searchInfo.key + "&
        let params = ["", ""]
        var _val = val.split(",")
        for (var i = 0; i < _val.length; i++) {
            if (i > 1) { break }
            var $v = _val[i]
            if (isNaN(parseInt($v))) {
                params[0] = $v
            }
            else {
                params[1] = $v
            }
        }

        val = val ? "/units?from={0}&limit=10&unitName=" + params[0] + "&unitCode=" + params[1] : "/units?from={0}&limit=10"
        TUI.platform.get(val.replace("{0}",0), function(result) {
            if (result.code == 0) {
                addSubList(result.data)
            }
            else if (result.code == 404) {
                addSubList([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 1,
                url: val
            })
        })
    }

    closeEidtUserPage() {
        closeSidePage()
        this.props.clearTeamPersonInfo()
    }

    addMenu(params) {
        const {updateTeamInfo, clearEditInfo, detail} = this.props
        let _this = this

        closeSidePage()

        clearEditInfo({
            infoName: "orgnizationInfo"
        })

        setTimeout(function() {
            openSidePage(_this, {
                status: "addOrgnization",
                gateWay: params
            })
        }, 300)
    }

    addMenuBtn() {
        const {clearEditInfo, sidePageInfo} = this.props
        let _this = this

        clearEditInfo({
            infoName: "orgnizationInfo"
        })
        closeSidePage()

        setTimeout(function() {
            openSidePage(_this, {
                status: "addOrgnization",
                gateWay: sidePageInfo.gateWay
            })
        }, 300)

        this.props.pushBreadNav({ name: "添加组织机构" })
    }

    editMenu(params) {
        let _this = this
        const {addEditInfo} = _this.props

        closeSidePage()
        setTimeout(function() {
            openSidePage(_this, {
                status: "editOrgnization",
                gateWay: params
            })
        }, 300)

        let ids = params.deep.split("-")

        _this.props.updateOrgnizationRelateId({
            relateId: _this.props.relateId + "-" + ids[ids.length - 1],//级联的关系ID
        })

        TUI.platform.get("/unit/" + ids[ids.length - 1], function(result) {
            if (result.code == 0) {
                var _d = result.data
                addEditInfo({
                    infoName: "orgnizationInfo",
                    id: _d.unitId,
                    code: _d.unitCode,
                    who: _d.unitName,
                    upper: _d.superExt2,
                    level: _d.unitLevel,
                    unitName: _d.unitName,
                    ext2: _d.ext2,
                    bizType: _d.bizType,
                    kind: _d.kind,
                    status: _d.status,
                    areaCode: _d.areaCode,
                    email: _d.email,
                    sort: _d.sort,
                    remark: _d.remark,
                    permission: _d.unitCode,
                    globalCode: _d.globalCode,
                    staffing: _d.staffing
                })
            }
            _this.props.pushBreadNav({ name: _d.unitName })
            closeContentLoading()
        })
    }


    delMenu(params) {
        let _this = this

        let delFetch = function() {
            TUI.platform.patch("/unit/" + params.id, function(result) {
                if (result.code == 0) {
                    _this.props.successMsg("组织删除成功")
                    _this.props.delSubList({
                        unitId: params.id
                    })

                    _this.deleteData(_this.props.odata, params.deep.split("-"))
                }
                else {
                    _this.props.errorMsg(result.errors)
                }
            })
        }

        openDialog(_this, "是否确定删除此项？", delFetch)
    }

    clickMenu($m) {
        let _this = this
        let $menuLi = document.getElementsByClassName("clickmenu")
        for (let j = 0; j < $menuLi.length; j++) {
            let $m1 = $menuLi[j]
            $m1.style.backgroundColor = ""
        }
        $m.style.backgroundColor = "rgba(250,250,250,0.5)"
        $m.style.borderRadius = "3px"

        let id = $m.getAttribute("data-id")
        let relateId = $m.getAttribute("data-deep") ? $m.getAttribute("data-deep") : id
        let unitCode = $m.getAttribute("data-type")

        _this.props.updateOrgnizationRelateId({
            relateId: relateId,//级联的关系ID
            unitCode: unitCode //上级的code
        })

        this.loadSubOrgnization(id)

        closeSidePage()

        openContentLoading()

        this.props.addBreadNav({ name: "组织架构维护" })
    }

    loadSubOrgnization(id) {
        const {addSubList, updatePageInfo, clearPageInfo, updateSearchInfo} = this.props
        let url = id ? "/units?uid=" + id + "&from={0}&limit=10" : "/units?from={0}&limit=10"
        TUI.platform.get(url.replace("{0}", "0"), function(result) {
            if (result.code == 0) {
                addSubList(result.data)

                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result._page.total,
                    url: url
                })
                //更新搜索信息
                updateSearchInfo({
                    key: id,
                    name: "orgnization",
                    info: "输入关键字(名称,组织编码)"
                })
            }
            else {
                addSubList([])
                clearPageInfo()
            }
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


    //展开树子节点方法
    openSubMenu(_data, id, deep, loadComplete) {
        const {addData, odata, errorMsg} = this.props
        for (let index = 0; index < _data.length; index++) {
            let d = _data[index]
            if (d.id == id) {
                TUI.platform.get("/units/tree/" + id, function(result) {
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
                    }
                    else if (result.code == 404) {

                    }
                    else {
                        errorMsg(result.message)
                    }

                    setTimeout(function() { loadComplete() }, 1000)
                })
                break
            }
        }
    }


    //翻页方法
    pageFn(index, loadComplete) {
        const {pageInfo, addSubList, updatePageInfo, errorMsg} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", pageInfo.index.size * (index - 1)), function(result) {
            if (result.code == 0) {
                addSubList(result.data)
                updatePageInfo({
                    index: index
                })
                loadComplete()
            }
            else if (result.code == 404) {
                addSubList([])
            }
            else {
                errorMsg(result.message)
            }
        })
    }
}

export default TUI._connect({
    odata: "orgnizationManage.data",
    subList: "orgnizationManage.subList",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
    detail: "orgnizationManage.detail",
    searchInfo: "publicInfo.searchInfo",
    relateId: "orgnizationManage.relateId",
    editInfo: "formControlInfo.data",
    isRefreshTable: "orgnizationManage.isRefreshTable"
}, Orgnization)