//图片
import singleLeft from "!url!./img/singleLeft.png"
import minus from "!url!../../../components/MultyMenu/img/minus.png"

//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import { openLoading, closeLoading } from "Loading"
import CourseStatistic from "./courseOnline.statistic"
import Filter, { openFilter, closeFilter } from "Filter"
import FormControls from "FormControls"

class CourseOnline extends React.Component {
    render() {
        const {
            addCourseStatisticDetail,
            errorMsg,
            courseList,
            pageInfo,
            sidePageInfo,
            successMsg,
            voteList,
            classesList,
            editInfo
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "科目", "name3": "已投教师数", "name4": "教师总数", "name6": "操作" },
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < courseList.length; i++) {
            let _d = courseList[i],
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.CourseName,
                    "value3": _d.Count,
                    "value4": _d.TeacherNumber,
                    "fns": [{
                        "name": "查看",
                        "fn": function () {
                            openContentLoading()
                            let classesId = editInfo.courseOnlineInfo.classesId
                            classesId = (classesId=="0" || classesId=="-1")?"0":classesId
                            TUI.platform.get("/CourseOnlineDetail?courseId=" + _d.CourseId + "&voteId="+_d.VoteId+"&classesId="+classesId, function (result) {
                                if (result.code == 0) {
                                    addCourseStatisticDetail(result.datas)
                                    openSidePage(_this, {
                                        status: "courseStatistic"
                                    })
                                }
                                else if (result.code == 1) {
                                    addCourseStatisticDetail([])
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                                closeContentLoading()
                            })
                        }
                    }]
                }
            tblContent.tbody.push(_tr)

            if (i > 0) {
                _tbContent.push(<div key={"d-sub" + i}></div>)
            }
        }

        let _courseStatistic = []
        if (sidePageInfo.status == "courseStatistic") {
            _courseStatistic.push(<CourseStatistic key="courseStatistic" />)
        }

        let _classesList = []
        for (var i = 0; i < classesList.length; i++) {
            var $c = classesList[i];
            _classesList.push({ id: $c.Id, name: $c.Name })
        }

        let _voteList = []
        for (var i = 0; i < voteList.length; i++) {
            var $v = voteList[i];
            _voteList.push({ id: $v.Id, name: $v.Name })
        }

        return (
            <div>
                <Content txt="科目统计" editHref={this.openAdvanceSearch.bind(this)} editTxt="高级搜索" editType="search">
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="70,0,200,200,100" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage id="courseStatistic">
                    <div>
                        {_courseStatistic}
                    </div>
                </SidePage>
                <Filter fn={this.advanceSearch.bind(this)}>
                    <div>
                        <div style={{ marginTop: "5px" }}>
                            <FormControls ctrl="select" label="投票表格" options={_voteList} value="courseOnlineInfo.voteId" style={{ width: "60%" }} />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <FormControls ctrl="select" label="班级" options={_classesList} value="courseOnlineInfo.classesId" style={{ width: "60%" }} />
                        </div>
                    </div>
                </Filter>
            </div>
        )
    }

    openAdvanceSearch() {
        openFilter()
    }

    advanceSearch() {
        const {editInfo} = this.props
        let voteId = editInfo.courseOnlineInfo.voteId,
            classesId = editInfo.courseOnlineInfo.classesId
        this.loadCourseOnline(voteId, classesId)
    }

    pageFn(index) {
        const {pageInfo, updateVTeamData, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateVTeamData(result.datas)
                updatePageInfo({
                    index: index,
                    size: 10,
                    sum: result.total,
                    url: pageInfo.index.url
                })
            }
            else {
                updateVTeamData([])
            }
        })
    }

    loadCourseOnline(voteId, classesId) {
        const {addCourseStatisticList,errorMsg} = this.props
        //if (courseList.length == 0 && !voteId) {
        voteId = (voteId == "-1" || !voteId) ? "0" : voteId
        classesId = (classesId == "-1" || !classesId) ? "0" : classesId
        TUI.platform.get("/CourseOnline?voteId=" + voteId + "&classesId=" + classesId, function (result) {
            if (result.code == 0) {
                addCourseStatisticList(result.datas)
            }
            else if (result.code == 1) {
                addCourseStatisticList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
            closeLoading()
        })
        //}
    }

    componentDidMount() {
        const {
            updatePageInfo,
            errorMsg,
            courseList,
            addBreadNav,
            addVoteList,
            voteList,
            classesList,
            addClassesList,
            addEditInfo
        } = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "科目统计" })

        if (courseList.length == 0) {
            _this.loadCourseOnline()
            addEditInfo({
                infoName: "courseOnlineInfo",
                voteId: "0",
                classesId: "0"
            })
        }

        if (voteList.length == 0) {
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
                closeLoading()
            })
        }
        if (classesList.length == 0) {
            TUI.platform.get("/Classes?pageIndex=1&pageSize=50", function (result) {
                if (result.code == 0) {
                    addClassesList(result.datas)
                }
                else if (result.code == 1) {
                    addClassesList([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
                closeLoading()
            })
        }
    }
}


export default TUI._connect({
    courseList: "courseList.courseList",
    courseDetail: "courseList.courseDetail",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    voteList: "voteList.list",
    classesList: "classesList.list",
    editInfo: "formControlInfo.data"
}, CourseOnline)