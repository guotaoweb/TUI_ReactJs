//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { clearCheckBox, updateCheckBoxStatus } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import EditTeacher from "./teacherList.edit"


class TeacherList extends React.Component {
  render() {
    const {
      teacherList,
      errorMsg,
      updateSidePageInfo,
      userId, 
      history,
      sidePageInfo,
      addEditInfo,
      pageInfo
    } = this.props

    let _this = this

    let SidePageContent
    if (sidePageInfo.status == "editTeacher" || sidePageInfo.status == "addTeacher") {
      SidePageContent = <EditTeacher key="teacherListedit" />
    }

    let tblContent = {
      "thead": { "name1": "序号", "name2": "名称", "name3": "科目", "name4": "班级", "name5": "操作" },
      "tbody": []
    }

    for (var i = 0; i < teacherList.length; i++) {
      let _d = teacherList[i]

      tblContent.tbody.push({
        "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
        "value2": _d.Name,
        "value3": _d.Course,
        "value4": _d.Classes,
        "fns": [{
          "name": "编辑",
          "fn": function () {
            TUI.platform.get("/Teacher/" + _d.Id, function (result) {
              if (result.code == 0) {
                var _r = result.datas[0]

                addEditInfo({
                  infoName:"teacherInfo",
                  Id: _r.Id,
                  Name: _r.Name,
                  CourseId: _r.CourseId,
                  ClassesId: _r.ClassesId
                })
                openSidePage(_this,{
                  status:"editTeacher"
                })
              }
              else {
                errorMsg(Config.ERROR_INFO[result.code]);
              }
            })
          }
        }, {
          "name": "管理",
          "fn": function () {
            history.push(Config.ROOTPATH + "manage/" + _d.team_id)
          }
        }, {
          "name": "删除",
          "fn": function () {
            var delFetch = function () {
              TUI.platform.delete("/Teacher/" + _d.Id, function (result) {
                if (result.code == 0) {
                  delTeacher(_d.team_id)
                }
                else {
                  errorMsg(Config.ERROR_INFO[result.code]);
                }
              })
            }
            openDialog(_this,"是否确定删除【" + _d.team_name + "】",delFetch)
          }
        }]
      })
    }

    return (
      <div>
        <Content txt="教师列表" addHref={this.addTeacherList.bind(this)}>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,120,120,120" />
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
    const {pageInfo, updateVTeamData, updatePageInfo} = this.props
    TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
      if (result.code == 0) {
        updateVTeamData(result.datas)
        updatePageInfo({
          index: index,
          size: 7,
          sum: parseInt(result.pagertotal),
          url: pageInfo.url
        })
      }
      else {
        updateVTeamData([])
      }
    })
  }

  componentDidMount() {
    const {addTeacherData, alertMsg, teacherList, updatePageInfo, addClassesData, addCourseData} = this.props

    //获取教师列表
    TUI.platform.get("/Teacher", function (result) {
      if (result.code == 0) {
        addTeacherData(result.datas)
        updatePageInfo({
          index: 1,
          size: 7,
          sum: result.pagertotal,
          url: "/projectteam/teams/all/{0}/7"
        })
      }
      else if (result.code == 1) {
        addTeacherData([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })

    //获取班级列表
    TUI.platform.get("/Classes", function (result) {
      if (result.code == 0) {
        var _d = result.datas
        addClassesData(_d)
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })

    //获取科目列表
    TUI.platform.get("/Course", function (result) {
      if (result.code == 0) {
        var _d = result.datas
        addCourseData(_d)
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }

  addTeacherList() {
    const {clearEditInfo} = this.props

    clearEditInfo({
      infoName:"teacherInfo"
    })

    openSidePage(this,{
      status: "addTeacher",
      width: ""
    })
  }
}


export default TUI._connect({
  teacherList: "teacherList.data",
  userId: "publicInfo.userInfo.userId",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, TeacherList)