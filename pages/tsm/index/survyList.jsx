//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import EditSurvy from "./survyList.edit"
import SurvyBindCourse from "./survyList.bindCourse"
import { openLoading, closeLoading } from "Loading"

class SurvyList extends React.Component {
    render() {
        const {
            survyList,
            courseList,
            errorMsg,
            sidePageInfo,
            pageInfo,
            addCourseList
        } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "描述", "name4": "创建时间", "name5": "操作" },
            "tbody": []
        }
        for (var i = 0; i < survyList.length; i++) {
            let _d = survyList[i]

            tblContent.tbody.push({
                "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                "value2": _d.Name,
                "value3": _d.Desp,
                "value4": _d.UpdateTime,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openContentLoading()
                        TUI.platform.get("/Vote/" + _d.Id, function (result) {
                            if (result.code == 0) {
                                var _d = result.datas[0]
                                updateEditInfo({
                                    infoName: "editSurvy",
                                    Name: _d.Name,
                                    Desp: _d.Desp
                                })
                            }
                            else {
                                errorMsg(Config.ERROR_INFO[result.code]);
                            }
                            openSidePage(_this, {
                                id: "survyEdit",
                                status: "editSurvy"
                            })
                            closeContentLoading()
                        })
                    }
                }, {
                    "name": "绑定",
                    "fn": function () {
                        openContentLoading()
                        if (courseList.length == 0) {
                            TUI.platform.get("/Course", function (result) {
                                if (result.code == 0) {
                                    addCourseList(result.datas)
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                                openSidePage(_this, {
                                    id: "bindCourse",
                                    status: "survyBindCourse",
                                    width: "400"
                                })
                                closeContentLoading()
                            })
                        }

                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.post("/projectteam/team", {
                                "uid": userId,
                                "team_id": _d.team_id,
                                "upper_team_id": "-1",
                                "del_flag": "y",
                                "opertype": "U"
                            }, function (result) {
                                if (result.code == 0) {
                                    delTeamList(_d.team_id)
                                }
                                else {
                                    errorMsg(TUI.ERROR_INFO[result.code]);
                                }
                            })
                        }

                        openDialog(_this, "是否确定删除【" + _d.Name + "】", delFetch)
                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="问卷列表" addHref={this.addSurvy.bind(this)}>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,300,0,220,180" />
                    <Pager fn={this.pageFn.bind(this)} />
                </Content>
                <SidePage id="survyEdit">
                    <div></div>
                </SidePage>
                <SidePage id="bindCourse" title="绑定科目" addHref={this.bindCourse.bind(this)}>
                    <div><SurvyBindCourse key="survyBindCourse" /></div>
                </SidePage>
            </div>
        )
    }
    //<EditSurvy key="survyedit" />

    bindCourse() {
        let selected = [],
            courseList = document.getElementsByClassName("t-c_checkbox")
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            if ($c.getAttribute("data-status") == "selected") {
                selected.push($c.getAttribute("data-id"))
            }
        }
        closeSidePage({
            id: "bindCourse"
        })
        console.info(selected)
    }

    pageFn(index) {
        openDialog()
        const {pageInfo, updateSurvyList, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateSurvyList(result.datas)
                updatePageInfo({
                    index: index,
                    size: 7,
                    sum: 10,
                    url: pageInfo.url
                })
            }
            else {
                updateSurvyList([])
            }
        })
    }

    componentDidMount() {
        const {addSurvyList, errorMsg, updatePageInfo} = this.props
        let _this = this
        // setTimeout(function () {
        //     openSidePage(_this, {
        //         status: "editAdmin"
        //     })

        //     // openDialog(_this, { placeholder: "请输入数字", value: "这是内容" }, function () {
        //     //     alert("a")
        //     // })
        //     // let _test = function(){
        //     //     _this.test()
        //     // }
        //     // openDialog(_this,{title:"创建问题",data:[{name:"第一个",fn:_test},{name:"第二个",url:"2"},{name:"第三个",url:"3"},{name:"第三个",url:"3"},{name:"第三个",url:"3"}]})
        // }, 500)
        //获取虚拟组织列表
        //if (!vteamList) {
        openLoading()
        TUI.platform.get("/Survy", function (result) {
            if (result.code == 0) {
                addSurvyList(result.datas)
            }
            else if (result.code == 9) {
                addSurvyList([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
            closeLoading()
            updatePageInfo({
                index: 1,
                size: 7,
                sum: 10,
                url: ""
            })
        })
    }

    addSurvy() {
        openSidePage(this, {
            status: "addSurvy",
            width: ""
        })
    }
}


export default TUI._connect({
    survyList: "survyList.list",
    courseList: "courseList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, SurvyList)