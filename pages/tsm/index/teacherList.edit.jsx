import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditTeacher extends React.Component {
  render() {
    const {sidePageInfo, userId, detail, classesData, courseData} = this.props
    let tabs = []

    if (sidePageInfo.status == "editTeacher") {
      tabs.push({ name: "编辑教师信息" })
    }
    else {
      tabs.push({ name: "新增教师信息" })
    }

    let course = new Array();
    course.push({ id: "0", name: "请选择" })
    for (let i = 0; i < courseData.length; i++) {
      course.push({ id: courseData[i].Id, name: courseData[i].Name })
    }
    let classes = new Array();
    classes.push({ id: "0", name: "请选择" })
    for (let i = 0; i < classesData.length; i++) {
      classes.push({ id: classesData[i].Id, name: classesData[i].Name })
    }

    return (
      <div>
        <Content2 tabs={tabs}>
          <div>
            <FormControls label="教师姓名" ctrl="input" value="teacherInfo.Name" />
            <FormControls label="所属科目" ctrl="select" options={course} value="teacherInfo.CourseId" />
            <FormControls label="所属班级" ctrl="select" options={classes} value="teacherInfo.ClassesId" />
            <div className="formControl-btn">
              <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
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
    } = this.props


    let _this = this

    let jsonParam = {
      "Name": editInfo.teacherInfo.Name,
      "CourseId": editInfo.teacherInfo.CourseId,
      "ClassesId": editInfo.teacherInfo.ClassesId,
    }

    if (sidePageInfo.status == "editTeacher") {
      jsonParam["Id"] = editInfo.teacherInfo.Id
      console.info(jsonParam)
      TUI.platform.put("/Teacher",jsonParam, function (result) {
        if (result.code == 0) {
          setTimeout(function () { successMsg("教师信息编辑成功") }, 800)
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
          setTimeout(function () { successMsg("教师信息新增成功") }, 800)
          _this.goBack()
        }
        else {
          errorMsg(TUI.config.ERROR_INFO[result.code]);
        }
      })
    }
  }

  goBack() {
    const {clearEditInfo} = this.props
    clearEditInfo({
      infoName: "editTeacher"
    })

    closeSidePage()
  }
}


export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  courseData: "teacherList.courseData",
  classesData: "teacherList.classesData"
}, EditTeacher)