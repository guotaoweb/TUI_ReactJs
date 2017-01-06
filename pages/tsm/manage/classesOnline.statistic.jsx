//组件
import Content2, { openContentLoading, closeContentLoading } from "Content2"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openLoading, closeLoading } from "Loading"
import back from "!url!./img/singleLeft.png"

class ClassesOnlineStatistic extends React.Component {
    render() {
        const {
            classesStatisticDetail,
            classesStatisticDetailList,
            errorMsg,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tabs = [],
        _this = this,
        goBackStyle={
            width:"25px",
            verticalAlign: "middle",
            marginLeft: "5px",
            marginTop: "-2px",
            cursor:"pointer"
        }
        for (let i = 0; i < classesStatisticDetail.length; i++) {
            let $c = classesStatisticDetail[i]
            tabs.push({ name: $c.TeacherName + "(" + $c.CourseName + ")", id: "tabs" + i,fn:function(){
                _this.loadClassesDetailByIndex(i)
            } })
        }
        let _tableTHeader = [],
            _tableTBody = []

        if (classesStatisticDetailList.length > 0) {
            let _detail = classesStatisticDetailList[0],
                _survy = classesStatisticDetailList[0].Survy
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
        let goBackBtn = <span style={{cursor:"pointer"}}  onClick={this.goBack.bind(this)}><img src={back} style={goBackStyle} />返回班级统计列表</span>
        return (
            <div>
                <Content2 txt="班级统计详情" tabs={tabs}>
                    <div>
                        {goBackBtn}
                        <table className="tabledetail">{_tableTHeader}{_tableTBody}</table>
                    </div>
                    <div>
                        {goBackBtn}
                        <table className="tabledetail">{_tableTHeader}{_tableTBody}</table>
                    </div>
                    <div>
                        {goBackBtn}
                        <table className="tabledetail">{_tableTHeader}{_tableTBody}</table>
                    </div>
                </Content2>
            </div>
        )
    }

    componentDidMount() {
        this.loadClassesDetailByIndex(0)
    }

    loadClassesDetailByIndex(index) {
        const {classesStatisticDetail, addClassesStatisticDetailList} = this.props
        for (let i = 0; i < classesStatisticDetail.length; i++) {
            if (index == i) {
                let $c = classesStatisticDetail[i]
                let $d = []
                $d.push($c)
                addClassesStatisticDetailList($d)
            }
        }
    }
    goBack(){
        closeSidePage()
    }
}


export default TUI._connect({
    classesStatisticDetail: "classesList.classesStatisticDetail",
    classesStatisticDetailList: "classesList.classesStatisticDetailList",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesOnlineStatistic)