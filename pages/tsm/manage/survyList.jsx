//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager from "Pager"
import EditSurvy from "./survyList.edit"
// import SurvyBindCourse from "./survyList.bindCourse"
// import SurvyUnBindCourse from "./survyList.unBindCourse"
import { openLoading, closeLoading } from "Loading"

class SurvyList extends React.Component {
    render() {
        const {
            survyList,
            courseList,
            errorMsg,
            sidePageInfo,
            pageInfo,
            loadCourseList,
            updateEditInfo,
            updateSurvyIsDefault
        } = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "描述", "name4": "是否默认","name5": "创建时间", "name6": "操作" },
            "tbody": []
        }

        let _editSurvy = []
        if(sidePageInfo.status=="survyEdit" || sidePageInfo.status=="addSurvy"){
            _editSurvy.push(<EditSurvy key="editSurvy" />)
        }


        for (var i = 0; i < survyList.length; i++) {
            let _d = survyList[i]
            tblContent.tbody.push({
                "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
                "value2": _d.Name,
                "value3": _d.Desp,
                "value4": _d.IsDefault==0?"默认":"",
                "value5": _d.UpdateTime,
                "fns": [{
                    "name":"设为默认",
                    "fn":function(){
                        var delFetch = function () {
                            TUI.platform.put("/IsDefault/" + _d.Id,{}, function (result) {
                                if (result.code == 0) {
                                    updateSurvyIsDefault(_d.Id)
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
                                }
                            })
                        }

                        openDialog(_this, "是否确定将【" + _d.Name + "】设置为默认?", delFetch)
                    }
                },{
                    "name": "编辑",
                    "fn": function () {
                        openContentLoading()
                        TUI.platform.get("/Survy/" + _d.Id, function (result) {
                            if (result.code == 0) {
                                var _d = result.datas[0]
                                updateEditInfo({
                                    infoName: "survyInfo",
                                    Id: _d.Id,
                                    Name: _d.Name,
                                    Desp: _d.Desp
                                })
                            }
                            else if(result.code==1){
                                
                            }
                            else {
                                errorMsg(Config.ERROR_INFO[result.code]);
                            }
                            openSidePage(_this, {
                                id: "survyEdit",
                                status: "survyEdit"
                            })
                            closeContentLoading()
                        })
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.delete("/Survy/" + _d.Id, function (result) {
                                if (result.code == 0) {
                                    deleteSurvyList(_d.Id)
                                }
                                else {
                                    errorMsg(Config.ERROR_INFO[result.code]);
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
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,300,0,100,220,180" />
                    <Pager fn={this.pageFn.bind(this)} />
                </Content>
                <SidePage id="survyEdit">
                    <div>
                        {_editSurvy}
                    </div>
                </SidePage>
            </div>
        )
    }

    pageFn(index) {
        const {pageInfo, updateSurvyList, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateSurvyList(result.datas)
                updatePageInfo({
                    index: index,
                    size: 10,
                    sum: result.total,
                    url: pageInfo.index.url
                })
            }
            else {
                updateSurvyList([])
            }
        })
    }

    componentDidMount() {
        const {addSurvyList, errorMsg, updatePageInfo, addBreadNav} = this.props
        let _this = this
        addBreadNav({ name: "问卷列表" })
        openLoading()
        let _url = "/Survy?pageIndex={0}&pageSize=10"
        TUI.platform.get(_url.replace("{0}", 1), function (result) {
            if (result.code == 0) {
                addSurvyList(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result.total,
                    url: _url
                })
            }
            else if (result.code == 1) {
                addSurvyList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
            closeLoading()

        })
    }

    addSurvy() {
        const {addBreadNav,pushBreadNav} = this.props
        openSidePage(this, {
            status: "addSurvy",
            width: ""
        })
        pushBreadNav({ name: "新增问卷" })
    }

    _goBack() {
        closeSidePage({
            id: "unBindCourse"
        })

        this.props.clearAllEditInfo()
    }
}


export default TUI._connect({
    survyList: "survyList.list",
    courseList: "courseList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, SurvyList)