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
            classesStatisticList,
            addClassesStatisticDetail,
            errorMsg,
            pageInfo,
            sidePageInfo,
            successMsg
        } = this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "年级", "name3": "班级", "name4": "人数", "name5": "状态", "name6": "操作" },
            "tbody": []
        },
            _tbContent = [],
            _this = this

        for (var i = 0; i < classesStatisticList.length; i++) {
            let _d = classesStatisticList[i],
      
                _tr = {
                    "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                    "value2": _d.Grade,
                    "value3": _d.Name,
                    "value4": _d.Number,
                    "value5": "已投",
                    "fns": [{
                        "name": "查看",
                        "fn": function () {
                            openContentLoading()
                            TUI.platform.get("/ClassesOnline?classesId="+_d.Id+"&voteId=e324217b-6d7f-4b72-ad4a-087b25f4b746", function (result) {
                                if (result.code == 0) {
                                    addClassesStatisticDetail(result.datas)
                                    openSidePage(_this, {
                                        status: "classesStatistic"
                                    })
                                }
                                else if (result.code == 1) {
                                    addClassesStatisticDetail([])
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

        let exportBtn = ""
        if(userInfo.id=="691d6a95-32fa-43f0-b8cf-6f09e41d1f81" || userInfo.id=="1583ce74-94da-4f46-9478-b4fa3109f78e")
        {
            exportBtn = []  
        }

        return (
            <div>
                <Content txt="班级统计" addHref={""}>
                    <div>
                        <Table num="10" pageSize="2" tblContent={tblContent} width="70,0,200,200,200,100" />
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
        const {addClassesStatisticList, updatePageInfo, errorMsg, classesStatisticList, addBreadNav} = this.props
        let _this = this
        openLoading()
        addBreadNav({ name: "班级统计" })

        if (classesStatisticList.length == 0) {
            let url = "/Classes?pageIndex={0}&pageSize=10&isStart=2"
            TUI.platform.get(url.replace("{0}",0), function (result) {
                if (result.code == 0) {
                    addClassesStatisticList(result.datas)
                    updatePageInfo({
                        index: 1,
                        size: 10,
                        sum: result.total,
                        url: url
                    })
                }
                else if (result.code == 1) {
                    addClassesStatisticList([])
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
    classesStatisticList: "classesList.classesStatisticList",
    classesStatisticDetail: "classesList.classesStatisticDetail",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    userInfo:"publicInfo.userInfo"
}, ClassesOnline)