//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import { openLoading, closeLoading } from "Loading"
import EditVote from "./voteList.edit"
import VoteBindClasses from "./voteList.bindClasses"

class VoteList extends React.Component {
    render() {
        const {
            voteList,
            errorMsg,
            sidePageInfo,
            pageInfo,
            addClassesList,
            updateEditInfo,
            deleteVoteList,
            successMsg,
            classesList,
            pushBreadNav
        } = this.props
        let _this = this
        let tblContent = {
            "thead": {
                "name1": "序号",
                "name2": "名称",
                "name3": "班级数",
                "name4": "状态",
                "name5": "创建时间",
                "name6": "操作"
            },
            "tbody": []
        }
        for (var i = 0; i < voteList.length; i++) {
            let _d = voteList[i]

            tblContent
                .tbody
                .push({
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.Name,
                    "value3": _d.VotedNumber,
                    "value4": _d.IsStart == 0
                        ? "开启"
                        : "关闭",
                    "value5": _d.UpdateTime,
                    "fns": [
                        {
                            "name": "编辑",
                            "fn": function () {
                                openContentLoading()
                                TUI.platform.get("/Vote/" + _d.Id, function (result) {
                                    if (result.code == 0) {
                                        var _d = result.datas[0]
                                        updateEditInfo({
                                            infoName: "voteInfo",
                                            Name: _d.Name,
                                            IsStart: _d.IsStart,
                                            Id: _d.Id
                                        })
                                        openSidePage(_this, {
                                            id: "survyEdit",
                                            status: "editVote"
                                        })
                                        pushBreadNav({ name: _d.Name })
                                    } else {
                                        errorMsg(Config.ERROR_INFO[result.code]);
                                    }

                                    closeContentLoading()

                                })
                            }
                        }, {
                            "name": "绑定班级",
                            "fn": function () {
                                openContentLoading()
                                TUI.platform.get("/ClassesInVote/" + _d.Id + "?status=unbind", function (result) {
                                    if (result.code == 0) {
                                        addClassesList(result.datas)
                                        openSidePage(_this, {
                                            id: "bindClasses",
                                            status: "bindClasses",
                                            width: "400",
                                            gateWay: {
                                                Id: _d.Id
                                            }
                                        })
                                    } else {
                                        errorMsg(Config.ERROR_INFO[result.code]);
                                    }
                                    closeContentLoading()
                                })
                            }
                        }, {
                            "name": "删除",
                            "fn": function () {
                                var delFetch = function () {
                                    TUI
                                        .platform
                                        .delete("/Vote/" + _d.Id, function (result) {
                                            if (result.code == 0) {
                                                deleteVoteList(_d.Id)
                                                successMsg("删除成功")
                                            } else {
                                                errorMsg(TUI.ERROR_INFO[result.code]);
                                            }
                                        })
                                }

                                openDialog(_this, "是否确定删除【" + _d.Name + "】", delFetch)
                            }
                        }
                    ]
                })
        }

        return (
            <div>
                <Content
                    txt="投票列表"
                    addHref={this
                        .addVote
                        .bind(this)}>
                    <Table num="10" tblContent={tblContent} width="50,0,150,150,200,180" />
                    <Pager
                        fn={this
                            .pageFn
                            .bind(this)} />
                </Content>
                <SidePage id="survyEdit">
                    <EditVote key="survyedit" />
                </SidePage>
                <SidePage
                    id="bindClasses"
                    title="绑定班级"
                    addHref={this.bindAllClasses.bind(this)}
                    addHrefTxt="一键绑定"
                    editHref={this.bindClasses.bind(this)}
                    editHrefTxt="绑定">
                    <div><VoteBindClasses key="bindClasses" /></div>
                </SidePage>
            </div>
        )
    }

    bindAllClasses() {
        const {sidePageInfo, updateCourseBindSurvy, errorMsg, waiteMsg, successMsg} = this.props
        let selected = [],
            courseList = document.getElementsByClassName("t-c_checkbox")
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            selected.push({
                VoteId: sidePageInfo.gateWay.Id,
                ClassesId: $c.getAttribute("data-id")
            })
        }
        closeSidePage({ id: "bindCourse" })
        if (selected.length > 0) {
            waiteMsg("数据提交中,请稍等...")
            TUI.platform.post("/VoteBindClasses", selected, function (result) {
                if (result.code == 0) {
                    updateCourseBindSurvy(selected)
                    successMsg("保存成功")
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
    }

    bindClasses() {
        const {sidePageInfo, updateCourseBindSurvy, errorMsg, waiteMsg, successMsg} = this.props
        let selected = [],
            courseList = document.getElementsByClassName("t-c_checkbox")
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            if ($c.getAttribute("data-status") == "selected") {
                selected.push({
                    VoteId: sidePageInfo.gateWay.Id,
                    ClassesId: $c.getAttribute("data-id")
                })
            }
        }
        closeSidePage({ id: "bindCourse" })
        if (selected.length > 0) {
            waiteMsg("数据提交中,请稍等...")
            TUI.platform.post("/SurvyeBindCours", selected, function (result) {
                if (result.code == 0) {
                    updateCourseBindSurvy(selected)
                    successMsg("保存成功")
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
    }

    pageFn(index) {
        const {pageInfo, updateVoteList, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateVoteList(result.datas)
                updatePageInfo({ index: index, size: 10, sum: result.total, url: pageInfo.index.url })
            }
            else if (result.code == 1) { }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
    }

    componentDidMount() {
        const {addVoteList, errorMsg, updatePageInfo, addBreadNav} = this.props

        addBreadNav({ name: "投票列表" })
        openLoading()

        let _this = this
        let _url = "/Vote?pageIndex={0}&pageSize=10"
        TUI.platform.get(_url.replace("{0}", 1), function (result) {
            if (result.code == 0) {
                addVoteList(result.datas)
                updatePageInfo({ index: 1, size: 10, sum: result.total, url: _url })
            } else if (result.code == 9) {
                addVoteList([])
            } else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
            closeLoading()
        })
    }

    addVote() {
        const {addEditInfo, pushBreadNav} = this.props
        openSidePage(this, {
            status: "addVote",
            width: ""
        })

        //更新slide组件后,可以删除
        //addEditInfo({ infoName: "voteInfo", IsStart: "是", IsStartindex: "0" })

        pushBreadNav({ name: "新增投票" })
    }
}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteList)