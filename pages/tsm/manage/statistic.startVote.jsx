import '!style!css!postcss!sass!./style.scss'

import Btn from "Btn"
import Table from "Table"
import { OpenLoading, CloseLoading } from "Loading"
import { openDialog, closeDialog } from "Dialog"
import { openSidePage,closeSidePage } from "SidePage"
import StartVote from "./statistic.startVote"

class Statistic extends React.Component {
    render() {
        const {
            voting, 
            statistic,
             sidePageInfo,
             voteList,
             classesList,
             updateVoteList,
             successMsg,
             errorMsg,
             updateClassesList,
             updateSidePageInfo
            } = this.props
        let _this = this
        let tblContent1 = {
            "thead": {
                "name1": "序号",
                "name2": "名称",
                "name3": "已投班级数",
                "name4": "类型",
                "name5": "状态",
                "name6": "创建时间",
                "name7": "操作"
            },
            "tbody": []
        }
        for (var i = 0; i < voteList.length; i++) {
            let _d = voteList[i],
                _isStartBtn = _d.IsStart == 0 ? "关闭" : "开启",
                _type = _d.Type == 1 ? "科目类型" : "普通类型",
                _isStart = _d.IsStart == 0 ? "开启" : "关闭"
            tblContent1
                .tbody
                .push({
                    "value1":  (i + 1),
                    "value2": _d.Name,
                    "value3": _d.VotedNumber,
                    "value4": _type,
                    "value5": _isStart,
                    "value6": _d.UpdateTime,
                    "fns": [
                        {
                            "name": _isStartBtn,
                            fn: function () {
                                openDialog(_this, "是否确定" + _isStartBtn + "此投票", function () {
                                    let _action = _d.IsStart == 0 ? 1 : 0
                                    TUI.platform.put("/IsStartVote/" + _d.Id + "?action=" + _action, {}, function (result) {
                                        if (result.code == 0) {
                                            let jsonParam = {
                                                Id: _d.Id,
                                                IsStart: _action
                                            }
                                            updateVoteList(jsonParam)
                                            successMsg("投票" + _isStartBtn + "成功")
                                        } else {
                                            errorMsg(Config.ERROR_INFO[result.code]);
                                        }
                                    })
                                })
                            }
                        }
                    ]
                })
        }
        let tblContent2 = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "人数", "name4": "所属年级", "name5": "状态", "name6": "操作" },
            "tbody": []
        }

        for (var i = 0; i < classesList.length; i++) {
            let _d = classesList[i],
                _isStartBtn = _d.IsStart == 0 ? "关闭" : "开启",
                _isStart = _d.IsStart == 0 ? "开启" : "关闭",
                _tr = {
                    "value1":  (i + 1),
                    "value2": _d.Name,
                    "value3": _d.Number,
                    "value4": _d.Grade,
                    "value5": _isStart,
                    "fns": [{
                        "name": _isStartBtn,
                        "fn": function () {
                            openDialog(_this, "是否确定" + _isStartBtn + "此班级投票", function () {
                                let _action = _d.IsStart == 0 ? 1 : 0
                                TUI.platform.put("/IsStartClasses/" + _d.Id + "?action=" + _action, {}, function (result) {
                                    if (result.code == 0) {
                                        let jsonParam = {
                                            Id: _d.Id,
                                            IsStart: _action
                                        }
                                        updateClassesList(jsonParam)
                                        updateSidePageInfo({
                                            status:"endVote"
                                        })
                                        closeSidePage()
                                        successMsg("班级投票" + _isStartBtn + "成功")
                                    } else {
                                        errorMsg(Config.ERROR_INFO[result.code]);
                                    }
                                })
                            })
                        }
                    }]
                }
            tblContent2.tbody.push(_tr)
        }

        return (
            <div className="t-statistic">
                <div className="t-s-teacherlist">
                    <div>投票列表</div>
                    <Table tblContent={tblContent1} />
                </div>
                <div className="t-s-classeslist">
                    <div>班级列表</div>
                    <Table tblContent={tblContent2} />
                </div>
            </div>
        )
    }


    componentDidMount() {
        const {addVoteList, loadClassesList, errorMsg} = this.props

        TUI.platform.get("/Vote?pageIndex=1&pageSize=10", function (result) {
            if (result.code == 0) {
                addVoteList(result.datas)
            }
            else if (result.code == 1) {
                addVoteList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
        TUI.platform.get("/Classes?pageIndex=1&pageSize=10", function (result) {
            if (result.code == 0) {
                loadClassesList(result.datas)
            }
            else if (result.code == 1) {
                loadClassesList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}

export default TUI._connect({
    classesList: "classesList.list",
    voteList: "voteList.list",
    sidePageInfo: "publicInfo.sidePageInfo"
}, Statistic)
