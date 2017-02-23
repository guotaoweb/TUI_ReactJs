import FormControls from "FormControls"
import Btn from "Btn"
import Table from "Table"
import { closeSidePage } from "SidePage"
import { openDialog } from "Dialog"
import Pager from "Pager"
import Content, { openContentLoading, closeContentLoading } from "Content"

import back from "!url!./img/singleLeft.png"

class PositionMaintainJob extends React.Component {
    render() {
        const {jobsData, pageInfo, errorMsg, updatePageInfo} = this.props

        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "职责名称", "name3": "操作" },
            "tbody": []
        }
        if (jobsData) {
            for (var i = 0; i < jobsData.length; i++) {
                let _d = jobsData[i]
                let _index = pageInfo.positionMaintainJobPager ? pageInfo.positionMaintainJobPager.index : 1
                let _size = pageInfo.positionMaintainJobPager ? pageInfo.positionMaintainJobPager.size : 0
                tblContent.tbody.push({
                    "value1": (_index - 1) * _size + (i + 1),
                    "value2": _d.jobName,
                    "fns": [{
                        "name": "编辑",
                        "fn": function () {
                            TUI.platform.get("/job/" + _d.jobId, function (result) {
                                let _data = result.data
                                if (result.code == 0) {
                                    let _editInfo = {
                                        infoName: "jobsInfo",
                                        id: _d.jobId,
                                        status: "edit",
                                        name: _data.jobName,
                                        remark: _data.remark,
                                        standard: _data.standard
                                    }
                                    _this.props.addEditInfo(_editInfo)
                                }
                                else if (result.code == 404) {
                                    _this.props.addEditInfo({})
                                }
                                else {
                                    errorMsg(result.message)
                                }
                                _this.props.pushBreadNav({ name: _data.jobName })
                            })

                        }
                    }, {
                        "name": "删除",
                        "fn": function () {
                            let delFetch = function () {
                                TUI.platform.patch("/job/" + _d.jobId, function (result) {
                                    if (result.code == 0) {
                                        _this.props.successMsg("职位职责删除成功")
                                        _this.props.deletePositionMaintainJobs(_d.jobId)
                                        updatePageInfo({
                                            id: "positionMaintainJobPager",
                                            sum: parseInt(pageInfo.positionMaintainJobPager.sum) - 1
                                        })
                                    }
                                    else {
                                        errorMsg(result.errors)
                                    }
                                })
                            }

                            openDialog(_this, "是否确定删除【" + _d.jobName + "】", delFetch)
                        }
                    }]
                })
            }
        }
        return (
            <div>
                <div style={{ borderBottom: "1px solid #ebebeb", height: "50px", lineHeight: "50px", marginTop: "-10px" }}>
                    <span style={{ float: "left", fontSize: "20px" }}>
                        职位职责列表
                    </span>
                    <Btn style={{ float: "right" }} txt="新增" type="add" href={this.addPositionMaintainJob.bind(this)} />
                </div>
                <Table id="positionMaintainJob" bindPager="positionMaintainJobPager" tblContent={tblContent} width="50,1000,100" />
                <Pager id="positionMaintainJobPager" fn={this.pageFn1.bind(this)} />
            </div>
        )
    }

    pageFn1(index, loadComplete) {
        const {pageInfo, addPositionMaintainJobs, searchPositionMaintainJobs, updatePageInfo} = this.props

        let _pageSize = pageInfo["positionMaintainJobPager"] ? pageInfo["positionMaintainJobPager"].size : 10,
            _url = pageInfo.positionMaintainJobPager.url,
            rUrl = _url.substring(0, _url.lastIndexOf("=") + 1) + _pageSize
        TUI.platform.get(rUrl.replace("{0}", _pageSize * (index - 1)), function (result) {
            if (result.code == 0) {
                addPositionMaintainJobs(result.data)
                searchPositionMaintainJobs(eval(JSON.stringify(result.data)))
            }
            else if (result.code == 404) {
                addPositionMaintainJobs([])
            }
            else {
                errorMsg(result.message)
            }
            updatePageInfo({
                id: "positionMaintainJobPager",
                index: index,
                size: _pageSize,
                sum: result._page ? result._page.total : 0,
                url: rUrl
            })
        })

    }

    addPositionMaintainJob() {
        this.props.updateEditInfo({
            infoName: "jobsInfo",
            status: "add"
        })

        this.props.pushBreadNav({ name: "新增职位职责" })
    }


    goBack() {
        this.props.clearEditInfo({
            infoName: "jobsInfo"
        })
        closeSidePage()
        this.props.backBreadNav()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    pageInfo: "publicInfo.pageInfo",
    jobsData: "positionMaintain.jobsData",
    editInfo: "formControlInfo.data",
    refreshTable: "publicInfo.refreshTable"
}, PositionMaintainJob)
