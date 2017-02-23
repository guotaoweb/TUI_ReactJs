import cha from "!url!./img/close.png"
//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import Pager, { pageLoadCompelte } from "Pager"
import { openLoading, closeLoading } from "Loading"
import FormControls from "FormControls"

class AuditLogs extends React.Component {
    render() {
        const {
            auditlogs,
            errorMsg,
            sidePageInfo,
            pageInfo,
            filtersTxt,
            filters
        } = this.props

        let _this = this

        let tblContent = {
            "thead": { "name1": "序号", "name2": "操作人", "日志类型": "动作类型", "name4": "日志内容", "name5": "日志内容", "name6": "操作日期", "name7": "日志大类", "name8": "是否发送MQ", "name9": "是否发送LDAP" },
            "tbody": []
        }
        if (auditlogs) {
            for (var i = 0; i < auditlogs.length; i++) {
                let _d = auditlogs[i]
                let _index = pageInfo.auditlogsPager ? pageInfo.auditlogsPager.index : 1
                let _size = pageInfo.auditlogsPager ? pageInfo.auditlogsPager.size : 0
                tblContent.tbody.push({
                    "value1": (_index - 1) * _size + (i + 1),
                    "value2": _d.operName,
                    "value3": _d.bizType,
                    "value4": _d.logType,
                    "value5": _d.logInfo,
                    "value6": _d.logDate,
                    "value7": _d.recordType,
                    "value8": _d.ext1,
                    "value9": _d.ext2
                })
            }
        }

        let formControlsStyle = {
            float: "left",
            display: "inline-block",
            marginBottom: "0px"
        }

        let _filtersTxt = [],
            _txt = []
        if (filtersTxt) {
            for (let key in filtersTxt) {
                _txt.push(filtersTxt[key])
            }
            for (var i = 0; i < _txt.length; i++) {
                var $f = _txt[i];
                _filtersTxt.push(
                    <span key={"filter-view" + i}>
                        {$f}
                        <img src={cha} style={{ width: "12px", cursor: "pointer" }} onClick={this.removeFilter.bind(this)} />
                    </span>
                )
            }
        }

        return (
            <div>
                <div className="t-filter">
                    <h3>高级搜索</h3>
                    <div className="t-filter-time">
                        <label style={{ float: "left" }}>起止时间:</label>
                        <div style={{ display: "inline-block" }}>
                            <FormControls ctrl="datepicker" type="YYYY-MM-DD HH:mm:ss" value="auditlogsInfo.startTime" blurFn={this.startTime.bind(this)} />
                            <p>&nbsp;&nbsp;-&nbsp;&nbsp;</p>
                            <FormControls ctrl="datepicker" type="YYYY-MM-DD HH:mm:ss" value="auditlogsInfo.endTime" blurFn={this.endTime.bind(this)} />
                        </div>
                    </div>
                    <div className="t-filter-span" data-type="recordType">
                        <label>日志大类:</label>
                        <span data-type="01" className={filters ? (filters.recordType == "01" ? "active" : "") : ""}>操作日志</span>
                        <span data-type="03" className={filters ? (filters.recordType == "03" ? "active" : "") : ""}>异常日志</span>
                    </div>
                    <div className="t-filter-span" data-type="logType">
                        <label>动作类型:</label>
                        <span data-type="update" className={filters ? (filters.logType == "update" ? "active" : "") : ""}>修改</span>
                        <span data-type="insert" className={filters ? (filters.logType == "insert" ? "active" : "") : ""}>新增</span>
                        <span data-type="delete" className={filters ? (filters.logType == "delete" ? "active" : "") : ""}>删除</span>
                    </div>
                    <div className="t-filter-span" data-type="bizType">
                        <label>日志类型:</label>
                        <span data-type="sm_dm" className={filters ? (filters.bizType == "sm_dm" ? "active" : "") : ""}>用户职位</span>
                        <span data-type="sm_em" className={filters ? (filters.bizType == "sm_em" ? "active" : "") : ""}>用户</span>
                        <span data-type="sm_gm" className={filters ? (filters.bizType == "sm_gm" ? "active" : "") : ""}>用户组</span>
                        <span data-type="sm_om" className={filters ? (filters.bizType == "sm_om" ? "active" : "") : ""}>组织</span>
                        <span data-type="sm_pm" className={filters ? (filters.bizType == "sm_pm" ? "active" : "") : ""}>职位</span>
                        <span data-type="sm_em_bk" className={filters ? (filters.bizType == "sm_em_bk" ? "active" : "") : ""}>银行卡</span>
                        <span data-type="sm_gmm" className={filters ? (filters.bizType == "sm_gmm" ? "active" : "") : ""}>用户组人员</span>
                        <span data-type="sm_rm" className={filters ? (filters.bizType == "sm_rm" ? "active" : "") : ""}>角色</span>
                        <span data-type="sm_rjm" className={filters ? (filters.bizType == "sm_rjm" ? "active" : "") : ""}>角色与职责</span>
                        <span data-type="sm_psm" className={filters ? (filters.bizType == "sm_psm" ? "active" : "") : ""}>职位族</span>
                        <span data-type="sm_ptm" className={filters ? (filters.bizType == "sm_ptm" ? "active" : "") : ""}>职位序列</span>
                        <span data-type="sm_sm" className={filters ? (filters.bizType == "sm_sm" ? "active" : "") : ""}>工作标准</span>
                        <span data-type="sm_im" className={filters ? (filters.bizType == "sm_im" ? "active" : "") : ""}>职责</span>
                    </div>
                    <div className="t-filter-close" onClick={this.closeAdvanceSearch.bind(this)}>close</div>
                </div>

                <Content txt="日志查询" addHref={this.openAdvanceSearch.bind(this)} addTxt="高级搜索">
                    {_filtersTxt.length > 0 ? <div className="t-filter-view"><label>过滤条件:</label>{_filtersTxt}</div> : ""}
                    <Table bindPager="auditlogsPager" tblContent={tblContent} width="50,110,110,110,0,110,110,110,110" />
                    <Pager id="auditlogsPager" fn={this.pageFn.bind(this)} />
                </Content>
            </div >
        )
    }
    removeFilter(e) {
        const {filters, filtersTxt, updateEditInfo} = this.props
        var $currentFilter = e.currentTarget.parentNode

        for (var i = 0; i < filtersTxt.length; i++) {
            var $ftxt = filtersTxt[i];
            let newFilters = {}
            if ($ftxt == $currentFilter.innerText) {
                let j = 0
                for (let key in filters) {
                    if (i != j) {
                        newFilters[key] = filters[key]
                    }
                    else {
                        let _jsonParam = { infoName: "auditlogsInfo" }
                        _jsonParam[key] = ""
                        updateEditInfo(_jsonParam)
                    }
                    j++
                }
                filtersTxt.splice(i, 1)
                this._searchAuditLogs(newFilters, filtersTxt)
                break
            }
        }
    }
    startTime(val) {
        const {filters, filtersTxt} = this.props
        if (val) {
            filters["startTime"] = val
            filtersTxt["startTime"]=val
            this._searchAuditLogs(filters, filtersTxt)
        }
    }

    endTime(val) {
        const {filters, filtersTxt} = this.props
        if (val) {
            filters["endDate"] = val
            filtersTxt["endDate"]=val
            this._searchAuditLogs(filters, filtersTxt)
        }
    }

    openAdvanceSearch() {
        let $tFilter = document.getElementsByClassName("t-filter")[0]
        $tFilter.setAttribute("class", "t-filter t-filter_open")
    }

    closeAdvanceSearch() {
        const {clearOSData} = this.props
        let $tFilter = document.getElementsByClassName("t-filter")[0]
        $tFilter.setAttribute("class", "t-filter")
    }

    _searchAuditLogs(val, txt) {
        let {searchInfo, addAuditLogs, updatePageInfo, errorMsg, pageInfo, addAuditLogsFilter, addAuditLogsFilterTxt} = this.props
        let _filterParam = ""

        for (let key in val) {
            _filterParam += key + "=" + val[key].toString() + "&"
        }

        addAuditLogsFilter(val)
        addAuditLogsFilterTxt(txt)
        let _pageSize = pageInfo["auditlogsPager"] ? pageInfo["auditlogsPager"].size : 10
        val = val ? "/auditlogs/?" + _filterParam + "from={0}&limit=" + _pageSize : "/auditlogs/?from={0}&limit=" + _pageSize
        openContentLoading()
        TUI.platform.get(val.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addAuditLogs(result.data)

            }
            else if (result.code == 404) {
                addAuditLogs([])
            }
            else {
                errorMsg(result.message)
            }
            closeContentLoading()
            updatePageInfo({
                id: "auditlogsPager",
                index: 1,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: val
            })
        })
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addAuditLogs, updatePageInfo} = this.props
        let _pageSize = pageInfo["auditlogsPager"] ? pageInfo["auditlogsPager"].size : 10,
            _url = pageInfo.auditlogsPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize

        TUI.platform.get(rUrl.replace("{0}", _pageSize * (index - 1)), function (result) {
            if (result.code == 0) {
                addAuditLogs(result.data)
                updatePageInfo({
                    index: index
                })
                loadComplete()
            }
            else {
                addAuditLogs([])
            }
            updatePageInfo({
                id: "auditlogsPager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
        })
    }

    componentDidMount() {
        const {
            addAuditLogs,
            updatePageInfo,
            errorMsg,
            addAuditLogsFilter
        } = this.props

        this.props.addBreadNav({ name: "日志查询" })
        //获取数据权限列表
        openLoading()
        let url = "/auditlogs/?from={0}&limit=10"
        TUI.platform.get(url.replace("{0}", "0"), function (result) {
            if (result.code == 0) {
                addAuditLogs(result.data)
            }
            else if (result.code == 404) {
                addAuditLogs([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "auditlogsPager",
                index: 1,
                size: 10,
                sum: result._page ? result._page.total : 0,
                url: url
            })
            closeLoading()
        }, this)

        let filterParam = {},
            filterParamTxt = [],
            $tFilter = document.getElementsByClassName("t-filter")[0].getElementsByTagName("span"),
            _this = this
        for (let i = 0; i < $tFilter.length; i++) {
            let $f = $tFilter[i];

            $f.addEventListener("click", function () {
                let $_f = $f.parentNode.getElementsByTagName("span")
                for (let j = 0; j < $_f.length; j++) {
                    let $_f_ = $_f[j];
                    // $_f_.setAttribute("class", "t-filter-span")
                }
                filterParam[this.parentNode.getAttribute("data-type")] = this.getAttribute("data-type")
                filterParamTxt[this.parentNode.getAttribute("data-type")] = this.innerText

                //this.setAttribute("class", "t-filter-span active")

                _this._searchAuditLogs(filterParam, filterParamTxt)
            })
        }
    }
}


export default TUI._connect({
    auditlogs: "auditlogs.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    filters: "auditlogs.filters",
    filtersTxt: "auditlogs.filtersTxt",
    pageInfo: "publicInfo.pageInfo"
}, AuditLogs)