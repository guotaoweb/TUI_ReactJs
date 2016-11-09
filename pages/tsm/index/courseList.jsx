//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { clearCheckBox, updateCheckBoxStatus } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import EditCourse from "./courseList.edit"
import Pager from "Pager"

class CourseList extends React.Component {
  render() {
    const {
      courseList,
      errorMsg,
      userId,
      history,
      updateDialog,
      sidePageInfo,
      pageInfo,
      addOSData
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
            openSidePage(_this, {
              status: "editCourse",
              width: ""
            })
            // TUI.platform.get("/projectteam/team/" + _d.team_id, function (result) {
            //   if (result.code == 0) {
            //     var _d = result.datas[0]
            //     updateVTeamInfo({
            //       id: _d.team_id,
            //       code: _d.team_code,
            //       name: _d.team_name,
            //       note: _d.team_note
            //     })

            //     openSidePage()
            //   }
            //   else {
            //     errorMsg(config.ERROR_INFO[result.code]);
            //   }
            // })
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
            {SidePageContent}
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
    const {addCourseData, alertMsg, addOData, vteamList, orgnization, updatePageInfo} = this.props

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
        errorMsg(TUI.ERROR_INFO[result.code]);
      }
    })
  }

  addCourseList() {
    openSidePage(this, {
      status: "addCourse",
      width: ""
    })
  }
}


export default TUI._connect({
  courseList: "courseList.data",
  userId: "publicInfo.userInfo.userId",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, CourseList) 