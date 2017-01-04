//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage, openSidePageLoading, closeSidePageLoading } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import { openLoading, closeLoading } from "Loading"
import EditVote from "./voteList.edit"
import SelectSurvy from "./voteList.survyList"

class VoteList extends React.Component {
    render() {
        const {
            voteList,
            errorMsg,
            sidePageInfo,
            pageInfo,
            addEditInfo,
            deleteVoteList,
            successMsg,
            pushBreadNav,
            updateVoteList
        } = this.props
        let _this = this
        let tblContent = {
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
                _type = _d.Type == 1 ? "科目" : "常规",
                _isStart = _d.IsStart == 0 ? "开启" : "关闭"
            tblContent
                .tbody
                .push({
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
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
                        },
                        {
                            "name": "编辑",
                            "fn": function () {
                                openContentLoading()
                                TUI.platform.get("/Vote/" + _d.Id, function (result) {
                                    if (result.code == 0) {
                                        var _d = result.datas
                                        addEditInfo({
                                            infoName: "voteInfo",
                                            Name: _d.Name,
                                            IsStart: _d.IsStart,
                                            Type: _d.Type,
                                            Id: _d.Id,
                                            voteRelated: _d.VoteRelated
                                        })
                                        openSidePage(_this, {
                                            id: "survyEdit",
                                            status: "editVote",
                                            gateWay: {
                                                Id: _d.Id
                                            }
                                        })
                                        _this.addCourseList()
                                        pushBreadNav({ name: _d.Name })

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
                                    TUI.platform.delete("/Vote/" + _d.Id, function (result) {
                                        if (result.code == 0) {
                                            deleteVoteList(_d.Id)
                                            successMsg("删除成功")
                                            updatePageInfo({
                                                sum:parseInt(pageInfo.index.sum)-1
                                            })
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

        let _editPage = [],
            _selectPage = []
        if (sidePageInfo.status == "addVote" || sidePageInfo.status == "editVote" || sidePageInfo.status == "selectSurvy") {
            _editPage.push(<EditVote key="survyedit" />)
            _selectPage.push(<SelectSurvy key="selectSurvy" />)
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
                    <div>
                        {_editPage}
                    </div>
                </SidePage>
                <SidePage id="selectSurvy" title="问卷列表" addHref={this.bindSurvy.bind(this)}>
                    <div>
                        {_selectPage}
                    </div>
                </SidePage>
            </div>
        )
    }

    addCourseList() {
        const {courseList, loadCourseList, errorMsg} = this.props
        let _this = this
        if (courseList) {
            TUI.platform.get("/Course", function (result) {
                if (result.code == 0) {
                    loadCourseList(result.datas)
                }
                else if (result.code == 1) {
                    loadCourseList([])
                } else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
                _this.updateEditVoteCourseInfo()
            })
        }
    }

    updateEditVoteCourseInfo() {
        const {editInfo, updateEditInfo, courseList} = this.props
        if (editInfo.voteInfo) {
            let _param = { infoName: "voteInfo" },
                isNew = false

            for (let i = 0; i < courseList.length; i++) {
                let $r = courseList[i]
                if (editInfo.voteInfo.voteRelated) {
                    isNew = true
                    for (let j = 0; j < editInfo.voteInfo.voteRelated.length; j++) {
                        let $e = editInfo.voteInfo.voteRelated[j];
                        if ($r.Id == $e.CourseId) {
                            _param["Survy" + $r.Id] = $e.Survy
                            _param["VoteRelated" + $r.Id] = {
                                VoteId: $e.VoteId,
                                CourseId: $e.CourseId,
                                SurvyId: $e.SurvyId
                            }
                        }
                    }
                }
            }
            if (isNew) {
                //console.info(_param)
                updateEditInfo(_param)
            }
        }
    }

    bindSurvy() {
        const {sidePageInfo, updateEditInfo, editInfo} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let teacherId = []

        for (var i = 0; i < $radio.length; i++) {
            var $r = $radio[i];
            if ($r.getAttribute("data-status") == "selected") {
                let _info = {
                    infoName: "voteInfo"
                },
                    _survyIndex = editInfo.voteInfo.SurvyIndex

                _info["VoteRelated" + _survyIndex] = {
                    CourseId: editInfo.voteInfo.CourseId,
                    VoteId: editInfo.voteInfo.VoteId,
                    SurvyId: $r.getAttribute("data-value")
                }
                _info["Survy" + _survyIndex] = $r.innerText
                updateEditInfo(_info)
            }
        }

        //console.info(this.props.editInfo)
        closeSidePage({
            id: "selectSurvy"
        })
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
            } else if (result.code == 1) {
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
        addEditInfo({
            infoName: "voteInfo",
            Type: 1,
            IsStart: 1,
        })
        this.addCourseList()
        pushBreadNav({ name: "新增投票" })
    }

    _goback() {
        closeSidePage({ id: "unBindClasses" })
    }
}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    courseList: "courseList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    editInfo: "formControlInfo.data"
}, VoteList)