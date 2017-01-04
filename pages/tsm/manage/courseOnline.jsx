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
            addCourseStatistic,
            errorMsg,
            courseStatisticList,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "教师", "name3": "科目", "name4": "班级", "name5": "百分比","name6": "最高/最低","name7":"操作"},
            "tbody": []
        },
        _tbContent = [],
        _this = this

        for (var i = 0; i < teacherRankList.TeacherRank.length; i++) {
            let _d = teacherRankList.TeacherRank[i],
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.TeacherName,
                    "value3": _d.CourseName,
                    "value4": _d.ClassesName,
                    "value5": _d.Percent,
                    "value5": teacherRankList.Percent.MaxPercent+"/"+teacherRankList.Percent.MinPercent,
                    "fns":[{
                        "name":"查看",
                        "fn":function(){
                            openContentLoading()
                            TUI.platform.get("/TeacherRankDetail/"+_d.TeacherId, function (result) {
                                if (result.code == 0) {
                                    addTeacherStatistic(result.datas)
                                    openSidePage(_this, {
                                        status: "teacherStatistic"
                                    })
                                }
                                else if (result.code == 1) {
                                    addTeacherStatistic([])
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

        let _teacherStatistic = []
        if (sidePageInfo.status == "teacherStatistic") {
            _teacherStatistic.push(<TeacherStatistic key="teacherStatistic" />)
        }

        return (
            <div>
                <Content txt="班级列表">
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="50,0,150,150,100" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage id="teacherStatistic">
                    <div>
                        {_teacherStatistic}
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
        const {addTeacherStatistic, updatePageInfo, errorMsg, teacherRankList,addBreadNav} = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "班级统计" })

        if (teacherRankList.length==0) {
            TUI.platform.get("/TeacherRank", function (result) {
                if (result.code == 0) {
                    addTeacherStatistic(result.datas)
                }
                else if (result.code == 1) {
                    addTeacherStatistic([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }

    }
}


export default TUI._connect({
    teacherRankList: "teacherList.teacherRankList",
    teacherRankListDetail: "teacherList.teacherRankListDetail",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, CourseOnline)