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



class CourseOnline extends React.Component {
    render() {
        const {
            addCourseStatisticDetail,
            errorMsg,
            courseList,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "班级", "name3": "科目", "name4": "已投教师数", "name5": "教师总数", "name6": "操作" },
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < courseList.length; i++) {
            let _d = courseList[i],
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.ClassesName,
                    "value3": _d.CourseName,
                    "value4": _d.Count,
                    "value5": _d.TeacherNumber,
                    "fns": [{
                        "name": "查看",
                        "fn": function () {
                            openContentLoading()
                            TUI.platform.get("/CourseOnlineDetail?courseId="+_d.CourseId+"&voteId=e324217b-6d7f-4b72-ad4a-087b25f4b746", function (result) {
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

        return (
            <div>
                <Content txt="科目统计">
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="70,0,200,200,200,100" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage id="courseStatistic">
                    <div>
                        {_courseStatistic}
                    </div>
                </SidePage>
            </div>
        )
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

    componentDidMount() {
        const {addCourseStatisticList, updatePageInfo, errorMsg, courseList, addBreadNav} = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "科目统计" })

        if (courseList.length == 0) {
            TUI.platform.get("/CourseOnline?voteId=e324217b-6d7f-4b72-ad4a-087b25f4b746", function (result) {
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
        }

    }
}


export default TUI._connect({
    courseList: "courseList.courseList",
    courseDetail: "courseList.courseDetail",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, CourseOnline)