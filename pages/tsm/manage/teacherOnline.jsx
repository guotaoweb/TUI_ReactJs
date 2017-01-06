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
import TeacherStatistic from "./teacherOnline.statistic"



class TeacherOnline extends React.Component {
    render() {
        const {
            addTeacherRankDetail,
            errorMsg,
            teacherRankList,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "班级", "name3": "科目", "name4": "教师", "name5": "百分比","name6":"操作"},
            "tbody": []
        },
        _tbContent = [],
        _this = this

        for (var i = 0; i < teacherRankList.length; i++) {
            let _d = teacherRankList[i],
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.ClassesName,
                    "value3": _d.CourseName,
                    "value4": _d.TeacherName,
                    "value5": _d.Percent+"%",
                    "fns":[{
                        "name":"查看",
                        "fn":function(){
                            openContentLoading()
                            TUI.platform.get("/TeacherRankDetail?teacherId="+_d.TeacherId+"&classesId="+_d.ClassesId+"&voteId=e324217b-6d7f-4b72-ad4a-087b25f4b746", function (result) {
                                if (result.code == 0) {
                                    addTeacherRankDetail(result.datas)
                                    openSidePage(_this, {
                                        status: "teacherStatistic"
                                    })
                                }
                                else if (result.code == 1) {
                                    addTeacherRankDetail([])
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
                <Content txt="教师统计">
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="50,200,200,0,200,100" />
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
        const {updatePageInfo, errorMsg, teacherRankList,addTeacherRankList,addBreadNav} = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "班级统计" })

        if (teacherRankList.length==0) {
            TUI.platform.get("/TeacherRank", function (result) {
                if (result.code == 0) {
                    addTeacherRankList(result.datas)
                }
                else if (result.code == 1) {
                    addTeacherRankList([])
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
    teacherRankList: "teacherList.teacherRankList",
    teacherRankDetail: "teacherList.teacherRankDetail",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, TeacherOnline)