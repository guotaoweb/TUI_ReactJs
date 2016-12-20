import Side from 'Side'
//图片
import admin from "!url!./img/admin.png"
import admins from "!url!./img/admin-s.png"
import classes from "!url!./img/classes.png"
import classess from "!url!./img/classes-s.png"
import survy from "!url!./img/survy.png"
import survys from "!url!./img/survy-s.png"
import vote from "!url!./img/vote.png"
import votes from "!url!./img/vote-s.png"
import report from "!url!./img/report.png"
import reports from "!url!./img/report-s.png"



class _Side extends React.Component {
  render() {
    const {sideList} = this.props
    return (
      <Side list={sideList} title="TSM" to="statistic" />
    )
  }

  componentDidMount() {
    let list = [{
      id:"1",
      name: "用户管理",
      url: "#",
      icon: admin,
      sicon: admins,
      sub: [{
        id:"1-1",
        name: "管理员列表", 
        url: Config.ROOTPATH + "admins"
      }, {
        id:"1-2", 
        name: "教师列表",
        url: Config.ROOTPATH + "teachers"
      }]
    }, {
      id:"2",
      name: "班级管理",
      url: "#",
      icon: classes,
      sicon: classess,
      sub: [{
        id:"2-1",
        name: "科目列表",
        url: Config.ROOTPATH + "courses"
      }, {
        id:"2-2",
        name: "班级列表",
        url: Config.ROOTPATH + "classes"
      }]
    }, {
      id:"3",
      name: "问卷管理",
      url: Config.ROOTPATH + "survys",
      icon: survy,
      sicon: survys
    }, {
      id:"4",
      name: "投票管理",
      url: Config.ROOTPATH + "votes",
      icon: vote,
      sicon: votes
    }, {
      id:"5",
      name: "报表系统",
      url: Config.ROOTPATH + "survys",
      icon: report,
      sicon: reports,
      sub: [{
        id:"5-1",
        name: "在线分析",
        url: Config.ROOTPATH + "TeacherList"
      }, {
        id:"5-2",
        name: "导出报表",
        url: Config.ROOTPATH + "TeacherList"
      }, {
        id:"5-3",
        name: "报表列表",
        url: Config.ROOTPATH + "reports"
      }]
    }]
    this.props.addSide(list)
  }

  getImg(src) {
    switch (src) {
      case "admin":
        return admin
      case "admins":
        return admins
      case "classes":
        return classes
      case "classess":
        return classess
      case "survy":
        return survy
      case "survys":
        return survys
      case "vote":
        return vote
      case "votes":
        return votes
      case "report":
        return report
      case "reports":
        return reports
      default:
        return admin
    }
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userId: "publicInfo.userInfo.id",
  sideList:"publicInfo.side"
}, _Side)
