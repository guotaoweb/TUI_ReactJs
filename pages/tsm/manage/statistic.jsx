import '!style!css!postcss!sass!./style.scss'

import Btn from "Btn"
import Table from "Table"
import { OpenLoading, CloseLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

import { openDialog } from "Dialog"

import StartVote from "./statistic.startVote"

class Statistic extends React.Component {
    render() {
        const {voting, statistic, sidePageInfo} = this.props
        let coursetblContent = {
            "thead": { "name1": "序号", "name2": "科目", "name3": "进度(已投人数/班级人数)" },
            "tbody": []
        }
        //异常投票列表
        let votedExceptionTblContent = {
            "thead": { "name1": "序号", "name2": "IP", "name3": "进度(已投科目数/可投科目数)" },
            "tbody": []
        }

        let _voting = []

        if (!voting) {
            _voting.push(
                <div className="t-s-noclassvote" key="noclassvote">
                    <p>目前没有班级进行投票,单击<a href="javascript:void(0);" onClick={this.startVote.bind(this)}>启动</a>进行投票设置</p>
                </div>
            )
        }
        else {
            for (var i = 0; i < voting.ExpcetionList.length; i++) {
                let _d = voting.ExpcetionList[i]

                votedExceptionTblContent.tbody.push({
                    "value1": (i + 1),
                    "value2": _d.Ip,
                    "value3": _d.Number
                })
            }
            for (var i = 0; i < voting.CourseList.length; i++) {
                let _d = voting.CourseList[i]

                coursetblContent.tbody.push({
                    "value1": (i + 1),
                    "value2": _d.Course,
                    "value3": _d.Number
                })
            }
            _voting.push(
                <ul key="classvote">
                    <li style={{ width: "30%" }}>
                        <h3>投票名称</h3>
                        <p>{voting.Vote}</p>
                    </li>
                    <li>
                        <h3>班级名称</h3>
                        <p>{voting.Name}</p>
                    </li>
                    <li>
                        <h3>投票人数</h3>
                        <p>{voting.VotedNumber}/{voting.Number}</p>
                    </li>
                    <li style={{ width: "15%" }}>
                        <h3>状态</h3>
                        <p>{voting.IsStart == 0 ? "投票中" : "投票结束"}</p>
                    </li>
                    <li style={{ width: "15%" }}>
                        <Btn txt={voting.IsStart == 0 ? "投票结束" : "开启投票"} style={{ marginTop: "15px" }} href={this.isStartClasses.bind(this, voting.Id)} />
                    </li>
                </ul>
            )
        }






        let _startVote = []
        if (sidePageInfo.status == "startVote") {
            _startVote.push(<StartVote key="startVote" />)
        }

        return (
            <div className="t-statistic">
                <div className="t-s">
                    <ul key="statistic">
                        <li>
                            <div>
                                <h3>投票数量</h3>
                                <p>{statistic.VoteNumber ? statistic.VoteNumber : 0}</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>班级数量</h3>
                                <p>{statistic.ClassesNumber ? statistic.ClassesNumber : 0}</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>科目数量</h3>
                                <p>{statistic.CourseNumber ? statistic.CourseNumber : 0}</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>教师数量</h3>
                                <p>{statistic.TeacherNumber ? statistic.TeacherNumber : 0}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="t-s-votestatus">
                    {_voting}
                    <br style={{ clear: "both" }} />
                </div>

                <div className="t-s-teacherlist">
                    <div>投票科目列表<a href="#" style={{ float: "right", marginRight: "10px" }} onClick={this.RefreshVotingClasses.bind(this)}>刷新</a></div>
                    <Table tblContent={coursetblContent} width="50,0,200" />
                    <br />
                </div>
                <div className="t-s-classeslist">
                    <div>投票进度列表<a href="#" style={{ float: "right", marginRight: "10px" }} onClick={this.RefreshVotingClasses.bind(this)}>刷新</a></div>
                    <Table tblContent={votedExceptionTblContent} width="50,0,250" />
                    <br />
                </div>
                <SidePage title="投票设置">
                    <div>
                        {_startVote}
                    </div>
                </SidePage>
            </div>
        )
    }

    startVote() {
        openSidePage(this, {
            status: "startVote",
            white: ""
        })
    }

    isStartClasses(classesId) {
        const {updateVotingClasses, errorMsg} = this.props

        //分析投票人数以及是否有没有投完票的情况


        var delFetch = function () {
            TUI.platform.put("/IsStartClasses/" + classesId + "?action=1", {}, function (result) {
                if (result.code == 0) {
                    let jsonParams = {
                        Id: classesId,
                        IsStart: 1
                    }
                    updateVotingClasses(jsonParams)
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
        openDialog(this, "是否确定关闭投票", delFetch)
    }

    componentDidUpdate(nextProps) {
        const {addVotingClasses, errorMsg} = this.props
        if (this.props.sidePageInfo.status != nextProps.sidePageInfo.status) {
            this.loadVotingClasses()
            return true
        }
        else {
            return false
        }
    }

    loadVotingClasses() {
        const {addVotingClasses, errorMsg} = this.props
        TUI.platform.get("/VotingClasses", function (result) {
            if (result.code == 0) {
                addVotingClasses(result.datas)
            }
            else if (result.code == 1) {
                addVotingClasses({})
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    RefreshVotingClasses() {
        this.loadVotingClasses()
    }
    
    componentDidMount() {
        const {addStatistic, errorMsg, addBreadNav} = this.props
        addBreadNav({ name: "首页" })

        this.loadVotingClasses()

        TUI.platform.get("/Statistic", function (result) {
            if (result.code == 0) {
                addStatistic(result.datas[0])
            }
            else if (result.code == 1) {
                addStatistic([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}

export default TUI._connect({
    classesList: "classesList.list",
    voting: "classesList.voting",
    statistic: "classesList.statistic",
    sidePageInfo: "publicInfo.sidePageInfo"
}, Statistic)
