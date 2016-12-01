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
import BindVote from "./classesList.bindVote"

class ClassesList extends React.Component {
    render() {
        const {
            errorMsg,
            classesList,
            gradeList,
            voteList,
            pageInfo,
            updateEditInfo,
            addVoteList
        } = this.props



        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "人数", "name4": "所属年级", "name5": "绑定投票", "name6": "操作" },
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < classesList.length; i++) {
            let _d = classesList[i]

            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.Name,
                "value3": _d.Number,
                "value4": _d.Grade,
                "value5": _d.Vote,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openContentLoading()
                        TUI.platform.get("/Classes/" + _d.Id, function (result) {
                            if (result.code == 0) {
                                var _d_ = result.datas[0]
                                updateEditInfo({
                                    infoName: "classesInfo",
                                    Id: _d_.Id,
                                    Name: _d_.Name,
                                    Number: _d_.Number,
                                    GradeId: _d_.GradeId,
                                    GradeIdName: _d.Grade
                                })
                                _this._openSidePage("editClass")
                                closeContentLoading()
                            }
                            else {
                                errorMsg(config.ERROR_INFO[result.code]);
                            }
                        })
                    }
                }, {
                    "name": "绑定",
                    "fn": function () {
                        if (voteList.length > 0) {
                            _this._openSidePage("bindVote",_d.Id)
                        }
                        else {
                            openContentLoading()
                            TUI.platform.get("/Vote", function (result) {
                                if (result.code == 0) {
                                    var _v = result.datas
                                    addVoteList(_v)
                                    _this._openSidePage("bindVote",_d.Id)
                                    closeContentLoading()
                                }
                                else {
                                    errorMsg(config.ERROR_INFO[result.code]);
                                }
                            })
                        }
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.delete("/Grade/" + _d.Id, function (result) {
                                if (result.code == 0) {
                                    deleteClassesList(_d.Id)
                                }
                                else {
                                    errorMsg(TUI.ERROR_INFO[result.code]);
                                }
                            })
                        }

                        updateDialog("是否确定删除【" + _d.Name + "】")
                        openDialog(delFetch)
                    }
                }]
            })

            if (i > 0) {
                _tbContent.push(<div key={"d-sub" + i}></div>)
            }
        }

        let tabs = [{
            id: 0,
            name: "年级列表",
            isHadSub: 0,
            deep: 1,
            children: []
        }]

        if (gradeList.length > 0) {
            for (var i = 0; i < gradeList.length; i++) {
                var $g = gradeList[i];
                tabs[0].children.push({
                    id: $g.Id,
                    name: $g.Name,
                    isHadSub: 1,
                    deep: 0
                })
            }
            setTimeout(function () {
                let $clickMenu = document.getElementsByClassName("clickmenu")[0]
                $clickMenu.style.backgroundColor = "rgba(250,250,250,0.5)"
                $clickMenu.style.borderRadius = "3px"
                let $img = $clickMenu.getElementsByTagName("img")[1]
                $img.setAttribute("data-status", "show")
                $img.setAttribute("src", minus)
                $clickMenu.nextSibling.style.display = "block"
            }, 300)
        }



        return (
            <div>
                <Content3>
                    <div style={{ paddingTop: "10px" }}>
                        <MultyMenu data={tabs} type="nocheck" lastdeep="2" clickMenu={this._clickMenu.bind(this)} />
                    </div>
                    <div></div>
                    <div>
                        <div className="t-content_t">
                            <span>班级列表</span>
                            <Btn type="add" txt="新增" href={this.addClasses.bind(this)} style={{ float: "right" }} />
                        </div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="50,200,100,100,0,80" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content3>
                <SidePage id="editClass">
                    <div>
                        <EditClasses key="editClass" />
                    </div>
                </SidePage>
                <SidePage id="bindVote" title="绑定投票" addHref={this.bindVote.bind(this)}>
                    <div>
                        <BindVote key="bindVote" />
                    </div>
                </SidePage>
                <SidePage id="selecteTeacher">
                    <div>
                        <EditClasses key="editClass" />
                    </div>
                </SidePage>
            </div>
        )
    }

    _openSidePage(sidePageid,_id) {
        if (sidePageid == "bindVote") {
            openSidePage(this, { 
                id: "bindVote",
                status: "editClasses",
                width: "400",
                gateWay:{
                    classesId:_id
                }
            })
        }
        else {
            openSidePage(this, {
                id: "editClass",
                status: "editClasses",
                width: ""
            })
        }
    }

    _clickMenu($m) {
        let id = $m.getAttribute("data-id")
        openContentLoading()
        this.getClassesInGrade(id)
    }

    bindVote(){
        const {sidePageInfo,bindVote} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let voteId = "",
        voteName = ""
        for (var i = 0;  i< $radio.length; i++) {
            var $r = $radio[i];
            if($r.getAttribute("data-status")=="selected"){
                voteId = $r.getAttribute("data-value")
                voteName = $r.innerText
            }
        }
        closeSidePage({
            id:"bindVote"
        })

        //bindVote()
        console.info({
            classesId:sidePageInfo.gateWay.classesId,
            voteId:voteId,
            voteName:voteName
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
        const {addGradeList, updatePageInfo, errorMsg, courseList, addCourseList} = this.props
        let _this = this
        openLoading()
        TUI.platform.get("/Grade", function (result) {
            if (result.code == 0) {
                addGradeList(result.datas)
            }
            else if (result.code == 9) {
                addGradeList([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })

        _this.getClassesInGrade(0)


        if (courseList.length == 0) {
            TUI.platform.get("/Course", function (result) {
                if (result.code == 0) {
                    addCourseList(result.datas)
                }
                else if (result.code == 1) {
                    addCourseList([])
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
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
            else if (result.code == 9) {
                loadClassesList([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
            closeContentLoading()
            closeLoading()
        })
    }

    addClasses() {
        openSidePage(this, {
            status: "addClasses",
            width: ""
        })
    }
}


export default TUI._connect({
    classesList: "classesList.list",
    gradeList: "gradeList.list",
    courseList: "courseList.list",
    voteList: "voteList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesList)