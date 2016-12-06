//图片
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import singleLeft from "!url!./img/singleLeft.png"
//组件
import PositionMaintainEdit from "./positionMaintain.edit"
import PositionMaintainRoleInList from "./positionMaintain.role.jobList"
import FormControls from "FormControls"
import { getContentIndex } from "Content2"
import Content3, { openContentLoading, closeContentLoading } from "Content3"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { editFn } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import Search from "Search"

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
            "thead": { "name1": "序号", "name2": "职位代码", "name3": "职位名称", "name4": "职位类别", "name5": "所属组织", "name6": "状态", "name7": "编制", "name8": "操作" },
            "tbody": []
        }

        for (var i = 0; i < data.length; i++) {
            let _d = data[i]
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.postId,
                "value3": _d.positionName,
                "value4": _d.kindName,
                "value5": _d.unitShortName,
                "value6": _d.statusName,
                "value7": _d.staffing,
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
                                        sum: parseInt(pageInfo.positionMaintainPager.sum) + 1
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

        let addBtn
        if (this.props.eidtId) {
            addBtn = <Btn type="add" txt="新增" href={this.addPositionMaintainBtn.bind(this)} style={{ float: "right" }} />
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
                <Content3>
                    <div>
                        <MultyMenu data={odata} type="nocheck" lastdeep="6" color="white" clickMenu={this.clickMenu.bind(this)} openSubMenu={this.openSubMenu.bind(this)} style={{ marginTop: "20px" }} />
                        <br />
                    </div>
                    <div></div>
                    <div className="t-content_t">
                        <span>职位维护列表</span>
                        {addBtn}
                    </div>
                    <div>
                        <Search placeholder="输入关键字(职位名称)搜索" style={{
                            border: "none",
                            borderBottom: "1px solid #ebebeb",
                            width: "98%",
                            margin: "auto"
                        }} fn={this._searchPositionMaintain.bind(this)} />
                        <Table id="positionMaintain" bindPager="positionMaintainPager" tblContent={tblContent} width="50,100,0,120,0,70,70,100" />
                        <Pager id="positionMaintainPager" fn={this.pageFn.bind(this)} />
                    </div>
                </Content3>
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

    _searchPositionMaintain(val) {
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
        })
    }

    componentDidMount() {
        let _this = this;

        const {addData, errorMsg, addUnitBizTypes, addPositionTypes, addStatus, addCity, addSubList, updatePageInfo, addUnitKind} = this.props

        openLoading()
        //获取组织根节点,且默认展开第一个父节点
        TUI.platform.get("/units/tree/0", function (result) {
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
                let firtNodeId = $clickMenu.getAttribute("data-id")
                $clickMenu.style.backgroundColor = "rgba(250,250,250,0.5)"
                $clickMenu.style.borderRadius = "3px"
                //展开第一个节点的一级子节点
                TUI.platform.get("/units/tree/" + firtNodeId, function (result) {
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
                                //获取职位列表
                                _this.loadPosition();

                            }
                        }

                    }

                    else {
                        errorMsg(result.message)
                    }
                })
            }
            else if (result.code == 404) {
                addData([])
            }
            else {
                errorMsg(result.message)
            }
        })


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


        this.props.addBreadNav({ name: "职位维护" })
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
        closeSidePage()
        this.props.updateEditInfo({
            infoName: "jobsInfo",
            status: "list"
        })
        this.props.updateEditInfo({
            infoName: "rolesInfo",
            status: "list"
        })
        this.props.addBreadNav({ name: "职位维护" })
    }

    addPositionMaintainBtn() {
        openSidePage(this, {
            status: "addPositionMaintain",
            id: "PositionMaintain"
        })

        this.props.pushBreadNav({ name: "添加职位信息" })
    }

    loadPosition(id) {
        const {addPositionMaintain, updatePageInfo, clearPageInfo, updateSearchInfo, pageInfo} = this.props
        let _pageSize = pageInfo["positionMaintainPager"] ? pageInfo["positionMaintainPager"].size : 10
        console.info(_pageSize)
        let url = id ? "/positions?unitId=" + id + "&from={0}&limit=" + _pageSize : "/positions?unitCode=0&from={0}&limit=" + _pageSize
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
        const {addData, odata, errorMsg} = this.props
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
                    else if (result.code == 404) {

                    }
                    else {
                        errorMsg(result.message)
                    }
                })
                break
            }
        }
    }


    pageFn(index, loadComplete) {
        const {pageInfo, addPositionMaintain, updatePageInfo} = this.props

        let _pageSize = pageInfo["positionMaintainPager"] ? pageInfo["positionMaintainPager"].size : 10,
            _url = pageInfo.positionMaintainPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", pageInfo.positionMaintainPager.size * (index - 1)), function (result) {
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
    odata: "orgnizationManage.data",
    data: "positionMaintain.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    searchInfo: "publicInfo.searchInfo",
    eidtId: "positionMaintain.editId",
    eidtInfo: "formControlInfo.data"
}, PositionMaintain)