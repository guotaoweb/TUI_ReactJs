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
import imorexport from "!url!./img/imorexport.png"
import imorexports from "!url!./img/imorexport-s.png"


class _Side extends React.Component {
  render() {
    const {sideList} = this.props

    let list = []

    for (let i = 0; i < sideList.length; i++) {
      let $d = sideList[i]
      let $s = []

      if ($d.Children) {
        for (var j = 0; j < $d.Children.length; j++) {
          var $c = $d.Children[j];
          $s.push({
            id: $c.Id,
            name: $c.Name,
            url: Config.ROOTPATH + $c.Url
          })
        }
      }
      list.push({
        id: $d.Id,
        name: $d.Name,
        url: Config.ROOTPATH + $d.Url,
        icon: this.getImg($d.Name),
        sicon: this.getImg($d.Name + "s"),
        sub: $s
      })
    }

    return (
      <Side list={list} title="TSM" to="statistic" />
    )
  }

  componentDidUpdate(nextProps) {

    // if (this.props.userInfo.role != nextProps.userInfo.role) {
    //   this.loadColumn()
    // }
  }

  componentDidMount() {

    const {userInfo, errorMsg, addSide} = this.props

    TUI.platform.get("/Column/691d6a95-32fa-43f0-b8cf-6f09e41d1f81", function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addSide(_d)
      }
      else {
        errorMsg(result.message)
      }
    })
  }

  loadColumn() {
    const {userInfo, errorMsg, addSide} = this.props

    TUI.platform.get("/Column/" + userInfo.role, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addSide(_d)
      }
      else {
        errorMsg(result.message)
      }
    })

    // let list = [{
    //   id: "1",
    //   name: "用户管理",
    //   url: "#",
    //   icon: admin,
    //   sicon: admins,
    //   sub: [{
    //     id: "1-1",
    //     name: "管理员列表",
    //     url: Config.ROOTPATH + "admins"
    //   }, {
    //     id: "1-2",
    //     name: "教师列表",
    //     url: Config.ROOTPATH + "teachers"
    //   }]
    // }, {
    //   id: "2",
    //   name: "班级管理",
    //   url: "#",
    //   icon: classes,
    //   sicon: classess,
    //   sub: [{
    //     id: "2-1",
    //     name: "科目列表",
    //     url: Config.ROOTPATH + "courses"
    //   }, {
    //     id: "2-2",
    //     name: "班级列表",
    //     url: Config.ROOTPATH + "classes"
    //   }]
    // }, {
    //   id: "3",
    //   name: "问卷管理",
    //   url: Config.ROOTPATH + "survys",
    //   icon: survy,
    //   sicon: survys
    // }, {
    //   id: "4",
    //   name: "投票管理",
    //   url: Config.ROOTPATH + "votes",
    //   icon: vote,
    //   sicon: votes
    // }, {
    //   id: "5",
    //   name: "报表系统",
    //   url: Config.ROOTPATH + "survys",
    //   icon: report,
    //   sicon: reports,
    //   sub: [{
    //     id: "5-1",
    //     name: "教师统计",
    //     url: Config.ROOTPATH + "TeacherList"
    //   }, {
    //     id: "5-2",
    //     name: "班级统计",
    //     url: Config.ROOTPATH + "TeacherList"
    //   }, {
    //     id: "5-3",
    //     name: "导出报表",
    //     url: Config.ROOTPATH + "TeacherList"
    //   }, {
    //     id: "5-4",
    //     name: "报表列表",
    //     url: Config.ROOTPATH + "reports"
    //   }]
    // }]
    // this.props.addSide(list)
  }

  getImg(src) {
    switch (src) {
      case "用户管理":
        return admin
      case "用户管理s":
        return admins
      case "班级管理":
        return classes
      case "班级管理s":
        return classess
      case "问卷管理":
        return survy
      case "问卷管理s":
        return survys
      case "投票管理":
        return vote
      case "投票管理s":
        return votes
      case "报表系统":
        return report
      case "报表系统s":
        return reports
      case "导入导出":
        return imorexport
      case "导入导出s":
        return imorexports
      default:
        return admin
    }
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userInfo: "publicInfo.userInfo",
  sideList: "publicInfo.side"
}, _Side)
