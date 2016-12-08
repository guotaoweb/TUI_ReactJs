//图片
import singleLeft from "!url!./img/singleLeft.png"
import minus from "!url!../../../components/MultyMenu/img/minus.png"

//组件
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import MultyMenu from "MultyMenu"
import { openLoading, closeLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openContentLoading, closeContentLoading } from 'Content'


class ClassesGrade extends React.Component {
    render() {
        const {
            errorMsg,
            gradeList,
            pageInfo,
            updateEditInfo,
            addVoteList
        } = this.props

        let tabs = [{
            id: 0,
            name: "年级列表",
            isHadSub: 0,
            deep: 1,
            children: [],
            btns: "A/E"
        }]

        if (gradeList.length > 0) {
            for (let i = 0; i < gradeList.length; i++) {
                let $g = gradeList[i]
                tabs[0].children.push({
                    id: $g.Id,
                    name: $g.Name,
                    isHadSub: 1,
                    deep: 0,
                    btns: "E/D"
                })
            }
        }

        return (

            <div style={{ paddingTop: "10px" }}>
                <MultyMenu
                    data={tabs}
                    type="edit"
                    lastdeep="2"
                    addMenu={this._addMenu.bind(this)}
                    editMenu={this._editMenu.bind(this)}
                    delMenu={this._delMenu.bind(this)}
                    clickMenu={this._clickMenu.bind(this)}
                    />
            </div>

        )
    }

    _clickMenu($m) {
        const {loadClassesList, updatePageInfo, errorMsg} = this.props
        let gradeId = $m.getAttribute("data-id")

        let _url = gradeId != 0 ? "/ClassesInGrade/" + gradeId + "?pageIndex={0}&pageSize=10" : "/Classes?pageIndex={0}&pageSize=10"
        openContentLoading()
        TUI.platform.get(_url.replace("{0}", 1), function (result) {
            if (result.code == 0) {
                loadClassesList(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result.total,
                    url: _url
                })
            }
            else if (result.code == 1) {
                loadClassesList([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
            closeContentLoading()
            closeLoading()
        })

        this._goBack()
    }

    _goBack() {
        this.props.clearEditInfo({
            infoName: "gradeInfo"
        })

        closeSidePage({
            id: "gradeEdit"
        })
    }

    _addMenu($m) {
        openSidePage(this, {
            id: "gradeEdit",
            status: "addGrade",
            gateWay: {
                Id: $m.id
            }
        })
    }

    _editMenu($m) {
        const {addEditInfo} = this.props
        let _this = this
        TUI.platform.get("/Grade/" + $m.id, function (result) {
            if (result.code == 0) {
                let _d = result.datas[0]
                addEditInfo({
                    infoName: "gradeInfo",
                    Id: _d.Id,
                    Name: _d.Name,
                    ShortName: _d.ShortName,
                    Level: _d.Level
                })
                openSidePage(_this, {
                    id: "gradeEdit",
                    status: "editGrade",
                    gateWay: {
                        Id: $m.id
                    }
                })
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
    }

    _delMenu($m) {
        const {deleteGradeList, errorMsg} = this.props
        let _this = this
        let delFetch = function () {
            TUI.platform.delete("/Grade/" + $m.id, function (result) {
                if (result.code == 0) {
                    deleteGradeList($m.id)
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
        }
        openDialog(_this, "是否确定删除", delFetch)
    }

    componentDidMount() {
        const {addGradeList, updatePageInfo, errorMsg, courseList, addCourseList} = this.props
        let _this = this
        openLoading()
        TUI.platform.get("/Grade", function (result) {
            if (result.code == 0) {
                addGradeList(result.datas)
            }
            else if (result.code == 1) {
                addGradeList([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })

        setTimeout(function () {
            let $clickMenu = document.getElementsByClassName("clickmenu")[0]
            $clickMenu.style.backgroundColor = "rgba(250,250,250,0.5)"
            $clickMenu.style.borderRadius = "3px"
            let $img = $clickMenu.getElementsByTagName("img")[1]
            $img.setAttribute("data-status", "show")
            $img.setAttribute("src", minus)
            $clickMenu.nextSibling.style.display = "block"
        }, 300)
    }

}


export default TUI._connect({
    gradeList: "gradeList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesGrade)