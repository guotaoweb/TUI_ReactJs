import Content2 from "Content2"
import Btn from "Btn"
import Table from "Table"
import { closeSidePage } from "SidePage"


class TeacherInClasses extends React.Component {
  render() {
    const {sidePageInfo,teacherInClasses} = this.props
    let tblContent = {
      "thead": {"name2": "班级", "name3": "科目"},
      "tbody": []
    }

    for (var i = 0; i < teacherInClasses.length; i++) {
      let _d = teacherInClasses[i]
      tblContent.tbody.push({
        "value2": _d.Classes,
        "value3": _d.Course
      })
    }

    return (
      <div>
         <h2 style={{
           width:"100%",
           height:"50px",
           lineHeight:"40px",
           paddingLeft:"5px",
           borderBottom: "1px solid #ebebeb"
          }}>
           {sidePageInfo.gateWay?sidePageInfo.gateWay.Name:"空"}
           </h2>
         <Table tblContent={tblContent} width="250,250" />
      </div>
    )
  }

  goBack() {
    closeSidePage({id:"teacherInClasses"})
  }
}


export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  courseList: "courseList.list",
  teacherInClasses:"teacherList.teacherInClasses"
}, TeacherInClasses)