//图片
import singleLeft from "!url!./img/singleLeft.png"
import minus from "!url!../../../components/MultyMenu/img/minus.png"

//组件
import Content3, { openContentLoading, closeContentLoading } from "Content3"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import MultyMenu from "MultyMenu"
import { openLoading, closeLoading } from "Loading"

import EditClasses from "./classesList.edit"
// import BindVote from "./classesList.bindVote"
import ClassesGrade from "./classesList.grade"
import GradeEdit from "./classesList.gradeEdit"
import SelectTeacher from "./classesList.selectTeacher"


class ClassesList extends React.Component {
    render() {
        const {
            errorMsg,
            classesList,
            gradeList,
            voteList,
            pageInfo,
            addEditInfo,
            updateEditInfo,
            addVoteList,
            deleteClassesList,
            deleteVoteBindClasses,
            upClassesLevel,
            sidePageInfo,
            editInfo,
            courseList,
            successMsg,
            updateClassesList
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "人数", "name4": "所属年级", "name5": "状态", "name6": "操作" },
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < classesList.length; i++) {
            let _d = classesList[i],
                _isStartBtn = _d.IsStart==2?"重启":(_d.IsStart == 0 ? "关闭" : "开启"),
                _isStart = _d.IsStart == 2 ?"已投":(_d.IsStart == 0 ? "开启" : "关闭"),
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.Name,
                    "value3": _d.Number,
                    "value4": _d.Grade,
                    "value5": _isStart,
                    "fns": [{
                        "name": _isStartBtn,
                        "fn": function () {
                            openDialog(_this, "是否确定" + _isStartBtn + "此班级投票?", function () {
                                let _action = _d.IsStart == 2 ?0:(_d.IsStart == 0 ? 1 : 0)
                                TUI.platform.put("/IsStartClasses/" + _d.Id + "?action=" + _action, {}, function (result) {
                                    if (result.code == 0) {
                                        let jsonParam = {
                                            Id: _d.Id,
                                            IsStart: result.msg.indexOf("班级投票结束")>-1?2:_action
                                        }
                                        updateClassesList(jsonParam)
                                        successMsg("班级投票" + _isStartBtn + "成功")
                                    } else {
                                        errorMsg(Config.ERROR_INFO[result.code]);
                                    }
                                })
                            })
                        }
                    }, {
                        "name": "升级",
                        "fn": function () {
                            var delFetch = function () {
                                openContentLoading()
                                TUI.platform.post("/UpClassesLevel/" + _d.Id, {}, function (result) {
                                    if (result.code == 0) {
                                        var _d_ = result.datas
                                        upClassesLevel({
                                            Id: _d.Id,
                                            Grade: _d_
                                        })
                                    }
                                    else {
                                        errorMsg(Config.ERROR_INFO[result.code]);
                                    }
                                    closeContentLoading()
                                })
                            }
                            openDialog(_this, "是否确定升级【" + _d.Name + "】?", delFetch)
                        }
                    }, {
                        "name": "编辑",
                        "fn": function () {
                            openContentLoading()
                            TUI.platform.get("/Classes/" + _d.Id, function (result) {
                                if (result.code == 0) {
                                    var _d_ = result.datas
                                    addEditInfo({
                                        infoName: "classesInfo",
                                        Id: _d_.Id,
                                        Name: _d_.Name,
                                        Number: _d_.Number,
                                        GradeId: _d_.GradeId,
                                        GradeIdName: _d.Grade,
                                        ClassesRelated: _d_.ClassesRelated
                                    })
                                    _this._openSidePage("editClass", _d_.Id)


                                    if (editInfo.classesInfo) {
                                        let _param = { infoName: "classesInfo" },
                                            isNew = false

                                        for (let i = 0; i < courseList.length; i++) {
                                            let $r = courseList[i]

                                            isNew = true
                                            for (let j = 0; j < editInfo.classesInfo.ClassesRelated.length; j++) {
                                                let $e = editInfo.classesInfo.ClassesRelated[j];
                                                if ($r.Id == $e.CourseId) {
                                                    _param["TeacherName" + $r.Id] = $e.Teacher
                                                    _param["ClassesRelated" + $r.Id] = {
                                                        ClassesId: $e.ClassesId,
                                                        CourseId: $e.CourseId,
                                                        TeacherId: $e.TeacherId
                                                    }
                                                }
                                            }

                                        }
                                        if (isNew) {
                                            console.info(_param)
                                            updateEditInfo(_param)
                                        }
                                    }

                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                                closeContentLoading()
                            })
                        }
                    }, {
                        "name": "删除",
                        "fn": function () {
                            var delFetch = function () {
                                TUI.platform.delete("/Classes/" + _d.Id, function (result) {
                                    if (result.code == 0) {
                                        deleteClassesList(_d.Id)
                                    }
                                    else {
                                        errorMsg(TUI.ERROR_INFO[result.code]);
                                    }
                                })
                            }

                            openDialog(_this, "是否确定删除【" + _d.Name + "】", delFetch)
                        }
                    }]
                }
            tblContent.tbody.push(_tr)

            if (i > 0) {
                _tbContent.push(<div key={"d-sub" + i}></div>)
            }
        }

        let _editClasses = []

        if (sidePageInfo.status == "editClasses" || sidePageInfo.status == "selectTeacher") {
            _editClasses.push(<EditClasses key="editClass" />)
        }

        return (
            <div>
                <Content3>
                    <ClassesGrade />
                    <div></div>
                    <div>
                        <div className="t-content_t">
                            <span>班级列表</span>
                            <Btn type="add" txt="新增" href={this.addClasses.bind(this)} style={{ float: "right" }} />
                        </div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="50,0,150,150,100,80" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content3>
                <SidePage id="editClass">
                    <div>
                        {_editClasses}
                    </div>
                </SidePage>
                <SidePage id="selectTeacher" title="教师列表" addHref={this.bindTeacher.bind(this)}>
                    <div>
                        <SelectTeacher key="selectTeacher" />
                    </div>
                </SidePage>
                <SidePage id="gradeEdit">
                    <div>
                        <GradeEdit />
                    </div>
                </SidePage>
            </div>
        )
    }

    bindTeacher() {
        const {sidePageInfo, updateEditInfo, editInfo} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let teacherId = []

        for (var i = 0; i < $radio.length; i++) {
            var $r = $radio[i];
            if ($r.getAttribute("data-status") == "selected") {
                let _info = {
                    infoName: "classesInfo"
                },
                    _courseIndex = editInfo.classesInfo.CourseIndex

                _info["ClassesRelated" + _courseIndex] = {
                    ClassesId: editInfo.classesInfo.ClassesId,
                    CourseId: editInfo.classesInfo.CourseId,
                    TeacherId: $r.getAttribute("data-value")
                }
                _info["TeacherName" + _courseIndex] = $r.innerText
                updateEditInfo(_info)
            }
        }

        closeSidePage({
            id: "selectTeacher"
        })
    }

    _openSidePage(sidePageid, _id) {
        if (sidePageid == "bindVote") {
            openSidePage(this, {
                id: "bindVote",
                status: "editClasses",
                width: "400",
                gateWay: {
                    classesId: _id
                }
            })
        }
        else {
            openSidePage(this, {
                id: "editClass",
                status: "editClasses",
                width: "",
                gateWay: {
                    classesId: _id
                }
            })
        }
    }


    bindVote() {
        const {sidePageInfo, updateClassesList, errorMsg} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let voteId = "",
            voteName = ""
        for (var i = 0; i < $radio.length; i++) {
            var $r = $radio[i];
            if ($r.getAttribute("data-status") == "selected") {
                voteId = $r.getAttribute("data-value")
                voteName = $r.innerText
            }
        }
        closeSidePage({
            id: "bindVote"
        })

        let _jsonParam = [{
            ClassesId: sidePageInfo.gateWay.classesId,
            VoteId: voteId
        }]
        TUI.platform.post("/VoteBindClasses", _jsonParam, function (result) {
            if (result.code == 0) {
                let updateData = {
                    Id: _jsonParam[0].ClassesId,
                    Vote: voteName
                }
                updateClassesList(updateData)

            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    pageFn(index) {
        const {pageInfo, updateVTeamData, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateVTeamData(result.datas)
                updatePageInfo({
                    index: index,
                    size: 7,
                    sum: result.total,
                    url: pageInfo.index.url
                })
            }
            else {
                updateVTeamData([])
            }
        })
    }

    componentDidMount() {
        const {addGradeList, updatePageInfo, errorMsg, courseList, addCourseList,addBreadNav} = this.props
        let _this = this
        openLoading()
        _this.getClassesInGrade(0)
        addBreadNav({ name: "班级列表" })

        if (courseList.length == 0) {
            TUI.platform.get("/Course", function (result) {
                if (result.code == 0) {
                    addCourseList(result.datas)
                }
                else if (result.code == 1) {
                    addCourseList([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }

    }

    getClassesInGrade(gradeId) {
        const {loadClassesList, updatePageInfo, errorMsg} = this.props

        let _url = gradeId != 0 ? "/ClassesInGrade/" + gradeId + "?pageIndex={0}&pageSize=10" : "/Classes?pageIndex={0}&pageSize=10"

        TUI.platform.get(_url.replace("{0}", 1), function (result) {
            if (result.code == 0) {
                loadClassesList(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result.total,
                    url: _url
                })

            }
            else if (result.code == 1) {
                loadClassesList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
            closeContentLoading()
            closeLoading()
        })
    }

    addClasses() {
        openSidePage(this, {
            status: "addClasses",
            width: "",
            gateWay: {}
        })
    }
}


export default TUI._connect({
    classesList: "classesList.list",
    gradeList: "gradeList.list",
    courseList: "courseList.list",
    voteList: "voteList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    editInfo: "formControlInfo.data"
}, ClassesList)