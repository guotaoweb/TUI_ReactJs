//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import EditCourse from "./courseList.edit"
import Pager from "Pager"
import { openLoading, closeLoading } from "Loading"

class CourseList extends React.Component {
  render() {
    const {
      courseList,
      errorMsg,
      sidePageInfo,
      pageInfo,
      delCourse,
      addEditInfo,
      pushBreadNav
    } = this.props

    let SidePageContent,
      _this = this
    if (sidePageInfo.status == "editCourse" || sidePageInfo.status == "addCourse") {
      SidePageContent = <EditCourse key="vteamlistedit" />
    }


    let tblContent = {
      "thead": { "name1": "序号", "name2": "名称", "name3": "问卷", "name4": "更新时间", "name5": "操作" },
      "tbody": []
    }

    for (var i = 0; i < courseList.length; i++) {
      let _d = courseList[i]

      tblContent.tbody.push({
        "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
        "value2": _d.Name,
        "value3": _d.Survy,
        "value4": _d.UpdateTime,
        "fns": [{
          "name": "编辑",
          "fn": function () {
            openContentLoading()
            TUI.platform.get("/Course/" + _d.Id, function (result) {
              if (result.code == 0) {
                let _r = result.datas[0]
                addEditInfo({
                  infoName: "courseInfo",
                  Id: _r.Id,
                  Name: _r.Name,
                  SurvyId: _r.SurvyId,
                  SurvyIdName: _d.Survy
                })
                pushBreadNav({name:_d.Name})
              }
              else {
                errorMsg(config.ERROR_INFO[result.code]);
              }
              closeContentLoading()
              openSidePage(_this, {
                status: "editCourse",
                width: ""
              })
            })
          }
        }, {
          "name": "删除",
          "fn": function () {
            var delFetch = function () {
              TUI.platform.delete("/Course/" + _d.Id, function (result) {
                if (result.code == 0) {
                  delCourse(_d.Id)
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
        <Content txt="科目列表" addHref={this.addCourseList.bind(this)}>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,200,0,200,140" />
          <Pager fn={this.pageFn.bind(this)} />
        </Content>
        <SidePage>
          <div>
            {SidePageContent}
          </div>
        </SidePage>
      </div>
    )
  }

  pageFn(index) {
    const {pageInfo, updateCourseData, updatePageInfo} = this.props
    TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
      if (result.code == 0) {
        updateCourseData(result.datas)
        updatePageInfo({
          index: index,
          size: 7,
          sum: result.total,
          url: pageInfo.index.url
        })
      }
      else {
        updateCourseData([])
      }
    })
  }

  componentDidMount() {
    const {addCourseList, updatePageInfo, addSurvyList,addBreadNav,survyList} = this.props
    addBreadNav({name:"科目列表"})
    openLoading()

    //获取科目列表
    let _url = "/Course?pageIndex={0}&pageSize=10"
    TUI.platform.get(_url.replace("{0}", 1), function (result) {
      if (result.code == 0) {
        addCourseList(result.datas)
      }
      else if (result.code == 1) {
        addCourseList([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
      updatePageInfo({
        index: 1,
        size: 10,
        sum: result.total,
        url: _url
      })
      closeLoading()
    })

    if (survyList.length == 0) {
      //获取问卷列表
      TUI.platform.get("/Survy", function (result) {
        if (result.code == 0) {
          addSurvyList(result.datas)
        }
        else if (result.code == 1) {
          addSurvyList([])
        }
        else {
          errorMsg(Config.ERROR_INFO[result.code]);
        }
      })
    }
  }

  addCourseList() {
    const {pushBreadNav} = this.props
    openSidePage(this, {
      status: "addCourse"
    })

    pushBreadNav({name:"新增科目"})
  }
}


export default TUI._connect({
  courseList: "courseList.list",
  survyList: "survyList.list",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, CourseList) 