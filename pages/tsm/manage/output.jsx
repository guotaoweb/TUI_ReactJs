//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"
import Remark from "Remark"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import { browserHistory } from 'react-router'

class ReportList extends React.Component {
    render() {
        const {
            voteList,
            gradeList,
            outputStatistic
        } = this.props

        let _gradeList = [{ id: 0, name: "全部年级" }]
        for (let i = 0; i < gradeList.length; i++) {
            let $g = gradeList[i]
            if ($g.Name) {
                _gradeList.push({ id: $g.Id, name: $g.Name })
            }
        }

        let _outputStatistic = []
        if (outputStatistic.length > 0) {
            let _outputStatisticDatas = []
            if(outputStatistic[0].Datas.length>0){
                for (var i = 0; i < outputStatistic[0].Datas.length; i++) {
                    var $d = outputStatistic[0].Datas[i];
                    _outputStatisticDatas.push(
                        <p>{$d.Course}:{$d.Classes}</p>
                    )
                }
            }
            _outputStatistic.push(
                <p id="output_statistic_gradeInfo" key="output_statistic_gradeInfo" style={{ marginTop: "50px", marginLeft: "15px" }}>
                导出统计:科目数量-<span>{outputStatistic[0].CourseNum}</span>,班级数量-<span>{outputStatistic[0].ClassesNum}</span><br/>
                详细内容:<br/>
                {_outputStatisticDatas.length==0?"空":_outputStatisticDatas}
                </p>
            )
        }

        return (
            <div>
                <Content txt="批量导出">
                    <div style={{ width: "98%", margin: "auto", marginTop: "10px" }}>
                        <Remark>
                            【批量导出】为批量导出报表,只允许一次性批量导出指定年级或所有年级内已投过票的班级,如果希望导出指定班级,
                            可以使用【班级统计】中的导出报表功能。<br/>
                            <p style={{color:"red"}}>
                            注:在同时选择了"投票表格"和"投票年级"后,会列出导出内容的统计信息
                            </p>
                        </Remark>
                        <br style={{ clear: "both" }} />
                        <div style={{ width: "45%", float: "left" }}>
                            <FormControls label="投票表格" ctrl="select" options={voteList} style={{ width: "80%" }} value="outputInfo.voteId" onChangeFn={this._onChangeByVote.bind(this)} />
                        </div>
                        <div style={{ width: "45%", float: "left" }}>
                            <FormControls label="投票年级" ctrl="select" options={_gradeList} style={{ width: "80%" }} value="outputInfo.gradeId" onChangeFn={this._onChangeByClasses.bind(this)} />
                        </div>
                        <Btn type="export" txt="导出" href={this.exportReport.bind(this)} style={{ float: "left", marginTop: "6px" }} />
                        {_outputStatistic}
                    </div>
                </Content>
            </div>
        )
    }

    _onChangeByVote() {
        const {editInfo} = this.props
        let voteId = editInfo.outputInfo.voteId,
            gradeId = editInfo.outputInfo.gradeId,
            $statistic = document.getElementById("output_statistic_gradeInfo")
        if ($statistic) {
            $statistic.style.display = "none"
        }
        if (voteId != "-1" && gradeId != "-1") {
            this.loadStatisticByGradeInfo(voteId, gradeId)
            if ($statistic) {
                $statistic.style.display = "block"
            }
        }
    }

    _onChangeByClasses() {
        const {editInfo} = this.props
        let voteId = editInfo.outputInfo.voteId,
            gradeId = editInfo.outputInfo.gradeId,
            $statistic = document.getElementById("output_statistic_gradeInfo")
        if ($statistic) {
            $statistic.style.display = "none"
        }
        if (voteId != "-1" && gradeId != "-1") {
            this.loadStatisticByGradeInfo(voteId, gradeId)
            if ($statistic) {
                $statistic.style.display = "block"
            }
        }
    }

    loadStatisticByGradeInfo(voteId, gradeId) {
        const {errorMsg, addOutputStatistic} = this.props
        TUI.platform.get("/OutPutStatsticByGradeInfo?voteId="+voteId+"&gradeId="+gradeId, function (result) {
            if (result.code == 0) {
                addOutputStatistic(result.datas)
            }
            else if (result.code == 1) {
                addOutputStatistic([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    componentDidMount() {
        const {addVoteList, addEditInfo, voteList, gradeList, addGradeList} = this.props
        openLoading()
        if (voteList.length == 0) {
            TUI.platform.get("/Vote?pageIndex=1&pageSize=10", function (result) {
                if (result.code == 0) {
                    let _d = []
                    for (var i = 0; i < result.datas.length; i++) {
                        var $d = result.datas[i];
                        _d.push({ id: $d.Id, name: $d.Name })
                    }
                    addVoteList(_d)
                }
                else if (result.code == 1) {
                    addVoteList([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }

        if (gradeList.length == 0) {
            TUI.platform.get("/Grade?pageIndex=1&pageSize=100", function (result) {
                if (result.code == 0) {
                    addGradeList(result.datas)
                }
                else if (result.code == 1) {
                    addGradeList([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
                closeLoading()
            })
        }
        else {
            closeLoading()
        }
        addEditInfo({
            infoName: "outputInfo",
            voteId: "-1",
            gradeId: "-1"
        })
    }

    exportReport() {
        const {editInfo, errorMsg} = this.props
        let voteId = editInfo.outputInfo.voteId,
            gradeId = editInfo.outputInfo.gradeId,
            _this = this
        if (voteId == "-1" || gradeId == "-1") {
            openDialog(this, "投票表格和投票年级为必选项")
        }
        else {
            openContentLoading()
            TUI.platform.get("/OutPutStatsticByGrade?gradeId=" + gradeId + "&voteId=" + voteId, function (result) {
                if (result.code == 0) {
                    openDialog(_this, "导出成功,是否调转到报表列表?", function () {
                        browserHistory.push("reports")
                    })
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
                closeContentLoading()
            })
        }
    }
}


export default TUI._connect({
    gradeList: "gradeList.list",
    voteList: "voteList.list",
    editInfo: "formControlInfo.data",
    outputStatistic: "print.outputStatistic"
}, ReportList)