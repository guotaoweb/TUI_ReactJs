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
      userId,
      sidePageInfo,
      pageInfo,
      delCourse,
      addEditInfo
    } = this.props

    let SidePageContent,
      _this = this
    if (sidePageInfo.status == "editCourse" || sidePageInfo.status == "addCourse") {
      SidePageContent = <EditCourse key="vteamlistedit" />
    }


    let tblContent = {
      "thead": { "name1": "序号", "name2": "名称", "name3": "问卷", "name4": "操作" },
      "tbody": []
    }

    for (var i = 0; i < courseList.length; i++) {
      let _d = courseList[i]

      tblContent.tbody.push({
        "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
        "value2": _d.Name,
        "value3": "",
        "fns": [{
          "name": "编辑",
          "fn": function () {
            openContentLoading()
            TUI.platform.get("/Course/" + _d.Id, function (result) {
              if (result.code == 0) {
                let _r = result.datas[0]
                addEditInfo({
                  infoName:"courseInfo",
                  Id: _r.Id,
                  Name: _r.Name
                })
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
              TUI.platform.delete("/Course/"+_d.Id,function (result) {
                if (result.code == 0) {
                  delCourse(_d.Id)
                }
                else {
                  errorMsg(Config.ERROR_INFO[result.code]);
                }
              })
            }

            openDialog(_this, "是否确定删除【" + _d.team_name + "】", delFetch)
          }
        }]
      })
    }

    return (
      <div>
        <Content txt="科目列表" addHref={this.addCourseList.bind(this)}>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,200,0,140" />
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
    TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
      if (result.code == 0) {
        updateCourseData(result.datas)
        updatePageInfo({
          index: index,
          size: 7,
          sum: parseInt(result.pagertotal),
          url: pageInfo.url
        })
      }
      else {
        updateCourseData([])
      }
    })
  }

  componentDidMount() {
    const {
      addCourseData,
      updatePageInfo,
      courseBindSurvy
    } = this.props
    //openLoading()
    //获取科目列表
    TUI.platform.get("/Course", function (result) {
      if (result.code == 0) {
        addCourseData(result.datas)
        updatePageInfo({
          index: 1,
          size: 7,
          sum: result.pagertotal,
          url: "/Course"
        })
      }
      else if (result.code == 9) {
        addCourseData([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
      //closeLoading()
    })

    //获取问卷列表
    TUI.platform.get("/Vote", function (result) {
      if (result.code == 0) {
        let _survy = [{
          id:"0",
          name:"请选择"
        }]
        for (var i = 0; i < result.datas.length; i++) {
          var $e = result.datas[i];
          _survy.push({
            id:$e.Id,
            name:$e.Name
          })
        }

        courseBindSurvy(_survy)
      }
      else if (result.code == 9) {
        courseBindSurvy([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }

  addCourseList() {
    openSidePage(this, {
      status: "addCourse"
    })
  }
}


export default TUI._connect({
  courseList: "courseList.data",
  userId: "publicInfo.userInfo.userId",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, CourseList) 