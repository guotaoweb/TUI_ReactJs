//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openDialog, closeDialog } from "Dialog"
import Pager, { pageLoadCompelte } from "Pager"
import EditTeacher from "./teacherList.edit"
import TeacherInClasses from "./teacherList.inClasses"
import { openLoading, closeLoading } from "Loading"

class TeacherList extends React.Component {
  render() {
    const {
      teacherList,
      courseList,
      errorMsg,
      sidePageInfo,
      addEditInfo,
      pageInfo,
      addCourseList,
      addTeacherInClasses,
      deleteTeacherList,
      pushBreadNav
    } = this.props

    let _this = this

    // let SidePageContent
    // if (sidePageInfo.status == "editTeacher" || sidePageInfo.status == "addTeacher") {
    //   SidePageContent = <EditTeacher key="teacherListedit" />
    // }

    let tblContent = {
      "thead": { "name1": "序号", "name2": "名称", "name3": "科目", "name4": "更新时间", "name5": "操作" },
      "tbody": []
    }

    for (var i = 0; i < teacherList.length; i++) {
      let _d = teacherList[i]

      tblContent.tbody.push({
        "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
        "value2": _d.Name,
        "value3": _d.Courses,
        "value4": _d.UpdateTime,
        "fns": [{
          "name": "编辑",
          "fn": function () {
            TUI.platform.get("/Teacher/" + _d.Id, function (result) {
              if (result.code == 0) {
                var _r = result.datas[0]
                pushBreadNav({name:_d.Name})
                addEditInfo({
                  infoName: "teacherInfo",
                  Id: _r.Id,
                  Name: _r.Name,
                  CourseId: _r.CourseId
                })
                openSidePage(_this, {
                  id: "editTeacher",
                  status: "editTeacher"
                })
              }
              else {
                errorMsg(Config.ERROR_INFO[result.code]);
              }
            })
          }
        }, {
          "name": "详细信息",
          "fn": function () {
            TUI.platform.get("/TeacherInClasses/" + _d.Id, function (result) {
              if (result.code == 0) {
                var _r = result.datas
                addTeacherInClasses(_r)
              }
              else if(result.code==1){
                addTeacherInClasses([])
              }
              else {
                errorMsg(Config.ERROR_INFO[result.code]);
              }
              openSidePage(_this, {
                id: "teacherInClasses",
                status: "teacherInClasses",
                width: "500",
                gateWay:{
                  Name:_d.Name
                }
              })
            })
          }
        }, {
          "name": "删除",
          "fn": function () {
            var delFetch = function () {
              TUI.platform.delete("/Teacher/" + _d.Id, function (result) {
                if (result.code == 0) {
                  deleteTeacherList(_d.Id)
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
        <Content txt="教师列表" addHref={this.addTeacherList.bind(this)}>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,250,250,180" />
          <Pager fn={this.pageFn.bind(this)} />
        </Content>
        <SidePage id="editTeacher">
          <div>
            <EditTeacher />
          </div>
        </SidePage>
        <SidePage id="teacherInClasses" title="教师任教列表">
          <div>
            <TeacherInClasses />
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
          size: 7,
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
    const {addTeacherList, errorMsg, teacherList, updatePageInfo, addCourseList, courseList,addBreadNav} = this.props
    openLoading()
    addBreadNav({name:"教师列表"})
    //获取教师列表
    let _url = "/Teacher?pageIndex={0}&pageSize=10"
    TUI.platform.get(_url.replace("{0}",1), function (result) {
      if (result.code == 0) {
        addTeacherList(result.datas)
        updatePageInfo({
          index: 1,
          size: 10,
          sum: result.ttotal,
          url: _url
        })
      }
      else if (result.code == 1) {
        addTeacherList([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
      closeLoading()
    })

    if (courseList.length == 0) {
      //获取科目列表
      TUI.platform.get("/Course", function (result) {
        if (result.code == 0) {
          var _d = result.datas
          addCourseList(_d)
        }
        else {
          errorMsg(Config.ERROR_INFO[result.code]);
        }
      })
    }


  }

  addTeacherList() {
    const {clearEditInfo,pushBreadNav} = this.props

    clearEditInfo({
      infoName: "teacherInfo"
    })

    openSidePage(this, {
      status: "addTeacher",
      width: ""
    })

    pushBreadNav({name:"新增教师"})
  }
}


export default TUI._connect({
  teacherList: "teacherList.list",
  courseList: "courseList.list",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, TeacherList)