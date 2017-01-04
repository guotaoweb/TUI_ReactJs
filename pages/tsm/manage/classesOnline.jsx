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
import ClassesStatistic from "./classesOnline.statistic"



class ClassesOnline extends React.Component {
    render() {
        const {
            addCourseStatistic,
            errorMsg,
            classesList,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "人数", "name4": "所属年级", "name5": "状态"},
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < classesList.length; i++) {
            let _d = classesList[i],
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.Name,
                    "value3": _d.Number,
                    "value4": _d.Grade,
                    "value5": _isStart,
                    "fns":[{
                        "name":"查看",
                        "fn":function(){
                            openContentLoading()
                            TUI.platform.get("/ClassesOnline/"+"这个地方是投票ID", function (result) {
                                if (result.code == 0) {
                                    addCourseStatistic(result.datas)
                                    openSidePage(_this, {
                                        status: "classesStatistic"
                                    })
                                }
                                else if (result.code == 1) {
                                    addCourseStatistic([])
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

        let _editClasses = []
        if (sidePageInfo.status == "classesStatistic") {
            _editClasses.push(<ClassesStatistic key="classesStatistic" />)
        }

        return (
            <div>
                <Content txt="班级列表">
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="50,0,150,150,100" />
                        <Pager fn={this.pageFn.bind(this)} />
                    </div>
                </Content>
                <SidePage id="classesStatistic">
                    <div>
                        {_editClasses}
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
        const {addCourseStatistic, updatePageInfo, errorMsg, courseList,addBreadNav} = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "班级统计" })

        if (classesList.length==0) {
            TUI.platform.get("/Classes", function (result) {
                if (result.code == 0) {
                    addCourseStatistic(result.datas)
                }
                else if (result.code == 1) {
                    addCourseStatistic([])
                }
                else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }

    }
}


export default TUI._connect({
    classesList: "classesList.list",
    classesStatistic: "classesList.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesOnline)