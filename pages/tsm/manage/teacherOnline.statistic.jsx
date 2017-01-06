//组件
import Content from "Content"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openLoading, closeLoading } from "Loading"
import TeacherStatistic from "./teacherOnline.statistic"

class TeacherOnlineStatistic extends React.Component {
    render() {
        const {
            errorMsg,
            teacherRankDetail,
            sidePageInfo,
            successMsg
        } = this.props

        let _detail = teacherRankDetail.Detail,
            _survy = teacherRankDetail.Survy,
            _tableTHeader =
                <thead>
                    <tr>
                        <td colSpan="3">
                            <h3>{_detail.VoteName}</h3>
                            <p>
                                班级:{_detail.ClassesName}&nbsp;&nbsp;
                                科目:{_detail.CourseName}&nbsp;&nbsp;
                                教师:{_detail.TeacherName}
                            </p>
                        </td>
                    </tr>
                </thead>,
            _tableTBody = []

        for (let i = 0; i < _survy.length; i++) {
            let $s = _survy[i]
            _tableTBody.push(
                <tr key={"tabledetail_tbody_main"+i}>
                    <td>{i+1+"、"+$s.Name}</td>
                    <td>{i == 0 ? "投票人数" : ""}</td>
                    <td>{i == 0 ? "百分比" : ""}</td>
                </tr>
            )
            for (let j = 0; j < $s.Datas.length; j++) {
                let $d = $s.Datas[j]
                _tableTBody.push(
                    <tr key={"tabledetail_tbody_sub"+i+j}>
                        <td style={{paddingLeft:"34px"}}>{$d.Name}</td>
                        <td>{$d.Number+"/"+$d.Count}</td>
                        <td>{$d.Percent}</td>
                    </tr>
                )
            }
        }

        return (
            <div>
                <Content txt="教师统计详情" backHref={this.goBack.bind(this)}>
                    <div>
                        <table className="tabledetail">{_tableTHeader}{_tableTBody}</table>
                    </div>
                </Content>
            </div>
        )
    }

    goBack(){
        closeSidePage()
    }
}


export default TUI._connect({
    teacherRankDetail: "teacherList.teacherRankDetail",
    sidePageInfo: "publicInfo.sidePageInfo"
}, TeacherOnlineStatistic)