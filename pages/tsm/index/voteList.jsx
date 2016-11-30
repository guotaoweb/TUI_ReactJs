//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
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
            classesList
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
                    "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
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
                                TUI
                                    .platform
                                    .get("/Vote/" + _d.Id, function (result) {
                                        if (result.code == 0) {
                                            var _d = result.datas[0]
                                            updateEditInfo({
                                                infoName: "voteInfo",
                                                Name: _d.Name,
                                                IsStart: _d.IsStart == "0"
                                                    ? "是"
                                                    : "否",
                                                IsStartindex: _d.IsStart,
                                                Id: _d.Id
                                            })
                                        } else {
                                            errorMsg(Config.ERROR_INFO[result.code]);
                                        }
                                        openSidePage(_this, {
                                            id: "survyEdit",
                                            status: "editVote"
                                        })
                                        closeContentLoading()
                                    })
                            }
                        }, {
                            "name": "绑定班级",
                            "fn": function () {
                                if (classesList.length == 0) {
                                    openContentLoading()
                                    TUI.platform.get("/Classes", function (result) {
                                        if (result.code == 0) {
                                            addClassesList(result.datas)
                                        } else {
                                            errorMsg(Config.ERROR_INFO[result.code]);
                                        }
                                        closeContentLoading()
                                    })
                                }
                                openSidePage(_this, {
                                    id: "bindClasses",
                                    status: "bindClasses",
                                    width: "400"
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
                    txt="问卷列表"
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
                    <VoteBindClasses key="bindClasses" />
                </SidePage>
            </div>
        )
    }

    bindAllClasses() {
        let selected = [],
            courseList = document.getElementsByClassName("t-c_checkbox")
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            selected.push($c.getAttribute("data-id"))
        }
        closeSidePage({ id: "bindCourse" })
        console.info(selected)
    }

    bindClasses() {
        let selected = [],
            courseList = document.getElementsByClassName("t-c_checkbox")
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            if ($c.getAttribute("data-status") == "selected") {
                selected.push($c.getAttribute("data-id"))
            }
        }
        closeSidePage({ id: "bindCourse" })
        console.info(selected)
    }

    pageFn(index) {
        openDialog()
        const {pageInfo, updateVoteList, updatePageInfo} = this.props
        TUI
            .platform
            .get(pageInfo.url.replace("{0}", index), function (result) {
                if (result.code == 0) {
                    updateVoteList(result.datas)
                    updatePageInfo({ index: index, size: 7, sum: 10, url: pageInfo.url })
                } else {
                    updateVoteList([])
                }
            })
    }

    componentDidMount() {
        const {addVoteList, errorMsg, updatePageInfo} = this.props
        let _this = this

        TUI.platform.get("/Vote", function (result) {
            if (result.code == 0) {
                addVoteList(result.datas)
                updatePageInfo({ index: 1, size: 7, sum: 10, url: "" })
            } else if (result.code == 9) {
                addVoteList([])
            } else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
    }

    addVote() {
        openSidePage(this, {
            status: "addVote",
            width: ""
        })

        //更新slide组件后,可以删除
        this.props
            .addEditInfo({ infoName: "voteInfo", IsStart: "是", IsStartindex: "0" })
    }
}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteList)