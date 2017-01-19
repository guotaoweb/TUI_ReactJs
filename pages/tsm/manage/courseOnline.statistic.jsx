//组件
import Content2, { openContentLoading, closeContentLoading } from "Content2"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import { openLoading, closeLoading } from "Loading"
import CourseStatistic from "./courseOnline.statistic"



class CourseOnlineStatistic extends React.Component {
    render() {
        const {
            courseDetail,
            courseDetailList,
            errorMsg,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tabs = [],
        _this = this
        for (let i = 0; i < courseDetail.length; i++) {
            let $c = courseDetail[i]
            tabs.push({ name: $c.ClassesName, id: "courseonline_" + i ,fn:function(){
                _this.loadCourseDetailByTeacher(i)
            }})
        }
        let _tableTHeader = [],
            _tableTBody = []

        if (courseDetailList.length > 0) {
            let _detail = courseDetailList[0],
                _survy = courseDetailList[0].Survy
            _tableTHeader =
                <thead>
                    <tr>
                        <td colSpan="4">
                            <h3>{_detail.VoteName}</h3>
                            <p>
                                班级:{_detail.ClassesName}&nbsp;&nbsp;
                                科目:{_detail.CourseName}&nbsp;&nbsp;
                                教师:{_detail.TeacherName}
                            </p>
                        </td>
                    </tr>
                </thead> ,
                _tableTBody = []

            for (let i = 0; i < _survy.length; i++) {
                let $s = _survy[i]
                _tableTBody.push(
                    <tr key={"tabledetail_tbody_main" + i}>
                        <td>{i + 1 + "、" + $s.Name}</td>
                        <td>{i == 0 ? "投票人数" : ""}</td>
                        <td>{i == 0 ? "百分比" : ""}</td>
                        <td>{i == 0 ? "最大/最小占比" : ""}</td>
                    </tr>
                )
                for (let j = 0; j < $s.Datas.length; j++) {
                    let $d = $s.Datas[j]
                    _tableTBody.push(
                        <tr key={"tabledetail_tbody_sub" + i + j}>
                            <td style={{ paddingLeft: "34px" }}>{$d.Name}</td>
                            <td>{$d.Number + "/" + $d.Count}</td>
                            <td>{$d.Percent}</td>
                            <td>{$d.MaxPercent + "/" + $d.MinPercent}</td>
                        </tr>
                    )
                }
            }
        }
        let _tables = []
        for (let i = 0; i < courseDetail.length; i++) {
            _tables.push(
                <div key={"_tables"+i}>
                    <table className="tabledetail">{_tableTHeader}{_tableTBody}</table>
                </div>
            )
        }
        return (
            <div>
                <Content2 txt="科目统计详情" tabs={tabs} goBackHref={this.goback.bind(this)}>
                    {_tables}
                </Content2>
            </div>
        )
    }

    componentDidMount() {
        this.loadCourseDetailByTeacher(0)
    }

    loadCourseDetailByTeacher(index) {
        const {courseDetail, addCourseStatisticDetailList} = this.props
        for (let i = 0; i < courseDetail.length; i++) {
            if (index == i) {
                let $c = courseDetail[i]
                let $d = []
                $d.push($c)
                addCourseStatisticDetailList($d)
            }
        }
    }

    goback() {
        closeSidePage({ id: "courseStatistic" })
    }
}


export default TUI._connect({
    courseDetail: "courseList.courseDetail",
    courseDetailList: "courseList.courseDetailList",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, CourseOnlineStatistic)