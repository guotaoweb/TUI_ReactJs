//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, {clearCheckBox, updateCheckBoxStatus} from "MultyMenu"
import SidePage, {openSidePage, closeSidePage} from "SidePage"
import {openDialog, closeDialog} from "Dialog"
import Pager, {pageLoadCompelte} from "Pager"
import EditTeacher from "./teacherList.edit"


class TeacherList extends React.Component {
  render() {
    const {
      teacherList,
      errorMsg,
      updateSidePageInfo,
      userId, history,
      updateDialog,
      sidePageInfo,
      updateVTeamId,
      updateTeacherInfo,
      pageInfo,
      delTeamList
    } = this.props

    let SidePageContent
    if (sidePageInfo.status == "editTeacher" || sidePageInfo.status == "addTeacher") {
      SidePageContent = <EditTeacher key="teacherListedit"/>
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
            updateSidePageInfo({
              status: "editTeacher",
              width: ""
            })

            TUI.platform.get("/Teacher/" + _d.Id, function (result) {
              if (result.code == 0) {
                var _d = result.datas[0]

                updateTeacherInfo({
                  id: _d.Id,
                  name: _d.Name,
                  courseId: _d.CourseId,
                  classesId: _d.ClassesId
                })
                openSidePage()
              }
              else {
                errorMsg(TUI.ERROR_INFO[result.code]);
              }
            })
          }
        }, {
            "name": "管理",
            "fn": function () {
              history.push(TUI.ROOTPATH + "manage/" + _d.team_id)
            }
          }, {
            "name": "删除",
            "fn": function () {
              var delFetch = function () {
                TUI.platform.delete("/Teacher/" + _d.Id, function (result) {
                  if (result.code == 0) {
                    delTeamList(_d.team_id)
                  }
                  else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                  }
                })
              }
              updateDialog("是否确定删除【" + _d.team_name + "】")
              openDialog(delFetch)
            }
          }]
      })
    }

    return (
      <div>
        <Content txt="教师列表" addHref={this.addTeacherList.bind(this) }>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,120,120,120"/>
          <Pager fn={this.pageFn.bind(this) }/>
        </Content>
        <SidePage>
          {SidePageContent}
        </SidePage>
      </div>
    )
  }

  pageFn(index) {
    // let obj1 = { "pagertotal": "12", "code": "0", "msg": "", "datas": [{ "id": "CE7993D326454A52859BEE9D308CFBFA", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "wugf1202", "user_name": "吴高峰", "user_note": "领导", "del_flag": "n", "user_type": "1", "sort": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:42" }, { "id": "692A224422E44716A8B1B98E76463E29", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "dingjh0625", "user_name": "丁君辉", "user_note": "领导", "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:49" }, { "id": "C271D82C7BA14687A6BC92426C45F88F", "team_id": "1FD8F6E054B04D79AC30ADC81C8A5138", "user_id": "p_luob", "user_name": "罗柏", "user_note": null, "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_wenren", "last_modtime": "2016-07-04 18:18:21" }] }
    // this.props.addXNUserData(obj1.datas)
    openDialog()
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
    const {addTeacherData, alertMsg, teacherList, updatePageInfo,addClassesData,addCourseData} = this.props

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
        errorMsg(TUI.ERROR_INFO[result.code]);
      }
    })

    //获取班级列表
    TUI.platform.get("/Classes", function (result) {
      if (result.code == 0) {
        var _d = result.datas
        addClassesData(_d)
      }
      else {
        errorMsg(TUI.ERROR_INFO[result.code]);
      }
    })

    //获取科目列表
    TUI.platform.get("/Course", function (result) {
      if (result.code == 0) {
        var _d = result.datas
        addCourseData(_d)
      }
      else {
        errorMsg(TUI.ERROR_INFO[result.code]);
      }
    })
  }

  addTeacherList() {
    const {updateSidePageInfo, preventSubmit,clearTeacherInfo} = this.props

    updateSidePageInfo({
      status: "addTeacher",
      width: ""
    })

    clearTeacherInfo()

    openSidePage()
  }
}


export default TUI._connect({
  teacherList: "teacherList.data",
  userId: "publicInfo.userInfo.userId",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo"
}, TeacherList)