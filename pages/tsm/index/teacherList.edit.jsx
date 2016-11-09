import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import {closeSidePage} from "SidePage"


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
          <FormControls label="教师姓名" ctrl="input" txt={detail.name} onChange={this.onChangeByName.bind(this) }/>
          <FormControls label="所属科目" ctrl="select" options={course} txt={detail.courseId} onChange={this.onChangeByCourse.bind(this) }/>
          <FormControls label="所属班级" ctrl="select" options={classes} txt={detail.classesId} onChange={this.onChangeByClasses.bind(this) }/>
          <div style={{ marginLeft: "70px", paddingTop: "5px" }}>
            <Btn type="cancel" txt="取消" href={this.goPrevPage.bind(this) } style={{ float: "left", marginRight: "10px" }} />
            <Btn type="check" txt="确定" href={this.editVTeamInfo.bind(this) } style={{ float: "left" }}  />
          </div>
        </Content2>
      </div>
    )
  }


  editVTeamInfo() {
    const {detail, sidePageInfo, userId, successMsg, errorMsg, updateVTeamListByID, updateVTeamData, preventSubmit, waiteMsg} = this.props

    if (preventSubmit) {
      return false
    }

    waiteMsg("数据提交中,请稍后...")

    let _this = this,
      teamId

    if (sidePageInfo.status == "editTeacher") {
      teamId = detail.id
      console.info(detail.courseId)
      TUI.platform.put("/Teacher", {
        "Id": detail.id,
        "Name": detail.name,
        "CourseId": detail.courseId,
        "ClassesId": detail.classesId,
      }, function (result) {
        if (result.code == 0) {
          setTimeout(function () { successMsg("教师信息编辑成功") }, 800)
          updateTeacherListByID()
          _this.goPrevPage()
        }
        else {
          errorMsg(TUI.config.ERROR_INFO[result.code]);
        }
      })
    }
    else {
      TUI.platform.post("/Teacher", {
        "Name": detail.name,
        "CourseId": detail.courseId,
        "ClassesId": detail.classesId,
      }, function (result) {
        if (result.code == 0) {
          setTimeout(function () { successMsg("教师信息新增成功") }, 800)
          updateTeacherData({
            Id: detail.id,
            CourseId: detail.courseId,
            ClassesId: detail.classesId,
          })
          _this.goPrevPage()
        }
        else {
          errorMsg(TUI.config.ERROR_INFO[result.code]);
        }
      })
    }
  }

  goPrevPage() {
    const {clearVTeamInfo} = this.props
    setTimeout(function () {
      clearVTeamInfo()
      closeSidePage()
    }, 0)
  }

  onChangeByName(e) {
    const {detail, updateVTeamInfo} = this.props
    updateTeacherInfo({
      name: e.currentTarget.value
    })
  }
  onChangeByCourse(e) {
    const {detail, updateVTeamInfo} = this.props
    updateTeacherInfo({
      courseId: e.currentTarget.value
    })
  }
  onChangeByClasses(e) {
    const {detail, updateVTeamInfo} = this.props
    updateTeacherInfo({
      classesId: e.currentTarget.value
    })
  }
};


export default TUI._connect({
  userId: "publicInfo.userInfo.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  detail: "teacherList.detail",
  preventSubmit: "publicInfo.msgInfo.txt",
  courseData: "teacherList.courseData",
  classesData: "teacherList.classesData"
}, EditTeacher)