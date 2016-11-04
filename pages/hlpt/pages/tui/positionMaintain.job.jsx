import React, { Component } from 'react'

import TUI from '../../utils'
import Actions from "../../actions/index"


import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"
import Table from "../../components/Table/index"
import { closeSidePage } from "../../components/SidePage/index"
import { openDialog } from "../../components/Dialog/index"
import Pager from "../../components/Pager/index"
import Content from "../../components/Layout/content"

import back from "!url!./img/singleLeft.png"

class PositionMaintainJob extends Component {
    render() {
        const {jobsData, pageInfo, updatePositionMaintainJobsInfo} = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "职责名称", "name3": "操作" },
            "tbody": []
        }
        if (jobsData) {
            for (var i = 0; i < jobsData.length; i++) {
                let _d = jobsData[i]
                tblContent.tbody.push({
                    "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                    "value2": _d.jobName,
                    "fns": [{
                        "name": "编辑",
                        "fn": function () {
                            _this.props.updatePositionMaintainJobsInfo({
                                id: _d.jobId,
                                status: "edit"
                            })
                            TUI.platform.get("/job/" + _d.jobId, function (result) {
                                if (result.code == 0) {
                                    let _data = result.data
                                    _this.props.updatePositionMaintainJobsInfo({
                                        name: _data.jobName,
                                        remark: _data.remark,
                                        standard: _data.standard
                                    })
                                }
                                else{
                                    _this.props.updatePositionMaintainJobsInfo([])
                                }
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
                <div style={{ borderBottom: "1px solid #ebebeb", height: "60px", lineHeight: "60px", marginTop: "-20px" }}>
                    <span style={{ float: "left", fontSize: "20px" }}>
                        <img src={back} onClick={this.goBack.bind(this)} style={{width: "25px",height: "25px",verticalAlign: "middle",marginTop: "-3px",cursor: "pointer"}} />
                        职位职责列表
                    </span>
                    <Btn style={{ float: "right" }} txt="新增" type="add" href={this.addPositionMaintainJob.bind(this)} />
                </div>
                <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,100" />
            </div>
        )
    }

    addPositionMaintainJob() {
        this.props.updatePositionMaintainJobsInfo({
            status: "add"
        })
    }


    goBack() {
        this.props.clearPositionMaintainJobsInfo()
        closeSidePage()
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo.gateWay",
    pageInfo: "publicInfo.pageInfo",
    jobsData: "positionMaintain.jobsData"
}, PositionMaintainJob)
