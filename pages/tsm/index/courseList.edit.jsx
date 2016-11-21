import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditCourse extends React.Component {
  render() {
    const {sidePageInfo,survyList} = this.props
    let tabs = []

    if (sidePageInfo.status == "editCourse") {
      tabs.push({ name: "编辑科目信息" })
    }
    else {
      tabs.push({ name: "新增科目信息" })
    }
    console.info(survyList)
    return (
      <div>
        <Content2 tabs={tabs}>
          <div>
            <FormControls label="科目名称" ctrl="input" value="courseInfo.Name" />
            <FormControls label="绑定问卷" ctrl="select" options={survyList} value="courseInfo.survyId" />
            <div className="formControl-btn">
              <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
              <Btn type="submit" txt="确定" href={this.editCourseInfo.bind(this)} />
            </div>
          </div>
        </Content2>
      </div>
    )
  }


  editCourseInfo() {
    const {
      editInfo,
      sidePageInfo,
      successMsg,
      errorMsg
    } = this.props

    let _this = this,
      jsonParam = {
        Name: editInfo.courseInfo.Name
      }


    if (sidePageInfo.status == "editCourse") {
      TUI.platform.put("/Course/" + _id, jsonParam, function (result) {
        if (result.code == 0) {
          setTimeout(function () { successMsg("虚拟组新增成功") }, 800)
          _this.goBack()
        }
        else {
          errorMsg(config.ERROR_INFO[result.code]);
        }
      })
    }
    else {
      let _id = editInfo.courseInfo.Id
      TUI.platform.post("/Course", jsonParam, function (result) {
        if (result.code == 0) {
          setTimeout(function () { successMsg("虚拟组编辑成功") }, 800)

          _this.goBack()
        }
        else {
          errorMsg(config.ERROR_INFO[result.code]);
        }
      })
    }


  }

  goBack() {
    const {clearEditInfo} = this.props

    clearEditInfo({
      infoName: "courseInfo"
    })
    closeSidePage()
  }
}


export default TUI._connect({
  userId: "publicInfo.userInfo.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  survyList:"courseList.survyList"
}, EditCourse)