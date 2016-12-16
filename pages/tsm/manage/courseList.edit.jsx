import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditCourse extends React.Component {
  render() {
    const {sidePageInfo, survyList} = this.props
    let tabs = []

    if (sidePageInfo.status == "editCourse") {
      tabs.push({ name: "编辑科目信息" })
    }
    else {
      tabs.push({ name: "新增科目信息" })
    }
    let _survyList = []
    for (var i = 0; i < survyList.length; i++) {
      var $s = survyList[i];
      _survyList.push({
        name: $s.Name,
        id: $s.Id
      })
    }
    return (
      <div>
        <Content2 tabs={tabs}>
          <div>
            <FormControls label="科目名称" ctrl="input" value="courseInfo.Name" required="required" />
            <FormControls label="科目名称" ctrl="input" type="number" value="courseInfo.Sort" required="required" />
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
      errorMsg,
      updateCourseList,
      addCourseList
    } = this.props

    let _this = this,
      jsonParam = {
        Name: editInfo.courseInfo.Name,
        Sort: editInfo.courseInfo.Sort
      }


    if (sidePageInfo.status == "addCourse") {
      TUI.platform.post("/Course", jsonParam, function (result) {
        if (result.code == 0) {
          jsonParam["Id"] = result.datas
          jsonParam["UpdateTime"] = TUI.fn.currentTime()
          addCourseList(jsonParam)
          setTimeout(function(){successMsg("新增成功")},300)
          _this.goBack()
        }
        else {
          errorMsg(Config.ERROR_INFO[result.code]);
        }
      })
    }
    else {
      let _id = editInfo.courseInfo.Id
      TUI.platform.put("/Course/" + _id, jsonParam, function (result) {
        if (result.code == 0) {
          jsonParam["Id"] = _id
          setTimeout(function(){successMsg("编辑成功")},300)
          updateCourseList(jsonParam)
          _this.goBack()
        }
        else {
          errorMsg(Config.ERROR_INFO[result.code]);
        }
      })
    }


  }

  goBack() {
    const {clearEditInfo, backBreadNav} = this.props

    clearEditInfo({
      infoName: "courseInfo"
    })
    closeSidePage()
    backBreadNav()
  }
}


export default TUI._connect({
  userId: "publicInfo.userInfo.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  survyList: "survyList.list"
}, EditCourse)