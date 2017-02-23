import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditTeacher extends React.Component {
  render() {
    const {sidePageInfo,courseList} = this.props
    let tabs = []

    if (sidePageInfo.status == "editTeacher") {
      tabs.push({ name: "编辑教师信息" })
    }
    else {
      tabs.push({ name: "新增教师信息" })
    }

    let course = [];

    for (let i = 0; i < courseList.length; i++) {
      let $c = courseList[i]
      course.push({ id: $c.Id, name: $c.Name })
    }

    return (
      <div>
        <Content2 tabs={tabs} goBackHref={this.goBack.bind(this)}>
          <div>
            <FormControls label="教师姓名" ctrl="input" value="teacherInfo.Name" required="required" />
            <FormControls label="所属科目" ctrl="select" options={course} value="teacherInfo.CourseId" />
            <div className="formControl-btn">
              <Btn type="submit" txt="确定" href={this.editTeacherInfo.bind(this)} />
            </div>
          </div>
        </Content2>
      </div>
    )
  }


  editTeacherInfo() {
    const {
      editInfo,
      sidePageInfo,
      successMsg,
      errorMsg,
      updateTeacherList,
      addTeacherList
    } = this.props


    let _this = this

    let jsonParam = {
      "Name": editInfo.teacherInfo.Name,
      "CourseId": editInfo.teacherInfo.CourseId
    }

    if (sidePageInfo.status == "editTeacher") {
      
      let _id = editInfo.teacherInfo.Id
      TUI.platform.put("/Teacher/"+_id,jsonParam, function (result) {
        if (result.code == 0) {
          jsonParam["Id"] = _id
          jsonParam["Courses"] = editInfo.teacherInfo.CourseIdName
          updateTeacherList(jsonParam)
          successMsg("编辑成功")
          _this.goBack()
        }
        else {
          errorMsg(TUI.config.ERROR_INFO[result.code]);
        }
      })
    }
    else {
      TUI.platform.post("/Teacher",jsonParam, function (result) {
        if (result.code == 0) {
          jsonParam["Id"] = result.datas
          jsonParam["Courses"] = editInfo.teacherInfo.CourseIdName
          jsonParam["UpdateTime"] = TUI.fn.currentTime()
          addTeacherList(jsonParam)
          successMsg("新增成功")
          _this.goBack()
        }
        else {
          errorMsg(TUI.config.ERROR_INFO[result.code]);
        }
      })
    }
  }

  goBack() {
    const {clearEditInfo,backBreadNav} = this.props
    clearEditInfo({
      infoName: "editTeacher"
    })

    closeSidePage({
      id:"editTeacher"
    })

    backBreadNav()
  }
}


export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  courseList: "courseList.list"
}, EditTeacher)