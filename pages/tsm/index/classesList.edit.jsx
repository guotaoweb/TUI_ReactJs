import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import {closeSidePage} from "SidePage"


class EditClasses extends React.Component {
  render() {
    const {sidePageInfo, userId, detail} = this.props
    let tabs = []

    if (sidePageInfo.status == "editVTeam") {
      tabs.push({ name: "编辑班级信息" })
    }
    else {
      tabs.push({ name: "新增班级信息" })
    }

    return (
      <div>
        <Content2 tabs={tabs}>
          <FormControls label="班级名称" ctrl="input" txt={detail.code} onChange={this.onChangeByCode.bind(this) }/>
          <FormControls label="班级人数" ctrl="input" txt={detail.name} onChange={this.onChangeByName.bind(this) }/>
          <div style={{ marginLeft: "70px", paddingTop: "5px" }}>
            <Btn type="cancel" txt="取消" href={this.goPrevPage.bind(this) } style={{ float: "left", marginRight: "10px" }} />
            <Btn type="check" txt="确定" href={this.editVTeamInfo.bind(this) } style={{ float: "left" }}  />
          </div>
        </Content2>
      </div>
    )
  }


  editVTeamInfo() {
    const {detail, sidePageInfo, userId, successMsg, errorMsg, updateVTeamListByID, updateVTeamData, preventSubmit,waiteMsg} = this.props

    if (preventSubmit) {
      return false
    }

    waiteMsg("数据提交中,请稍后...")

    let _this = this,
      operType,
      teamId

    if (sidePageInfo.status == "editVTeam") {
      operType = "U"
      teamId = detail.id
    }
    else {
      operType = "A"
    }

    TUI.platform.post("/projectteam/team", {
      "uid": userId,
      "team_id": teamId,
      "upper_team_id": "-1",
      "team_code": detail.code,
      "team_name": detail.name,
      "team_note": detail.note,
      "team_icon": "",
      "sort": "99",
      "state": "1",
      "del_flag": "n",
      "opertype": operType
    }, function (result) {
      if (result.code == 0) {
        if (operType == "U") {
          setTimeout(function(){successMsg("虚拟组编辑成功")},800)
        }
        else {
          setTimeout(function(){successMsg("虚拟组新增成功")},800)
          let _addData = {
            team_id: result.datas[0],
            team_code: detail.code,
            team_name: detail.name,
            team_note: detail.note,
            admins: {} 
          }
 
          updateVTeamData(_addData)
        }
        updateVTeamListByID(teamId)
        _this.goPrevPage()
      }
      else {
        errorMsg(config.ERROR_INFO[result.code]);
      }
    })
  }

  goPrevPage() {
    const {clearVTeamInfo} = this.props
    setTimeout(function () {
      clearVTeamInfo()
      closeSidePage()
    }, 0)
  }

  onChangeByCode(e) {
    const {detail, updateVTeamInfo} = this.props
    updateVTeamInfo({
      code: e.currentTarget.value,
      name: detail.name,
      note: detail.note
    })
  }
  onChangeByName(e) {
    const {detail, updateVTeamInfo} = this.props
    updateVTeamInfo({
      code: detail.code,
      name: e.currentTarget.value,
      note: detail.note
    })
  }
  onChangeByNote(e) {
    const {detail, updateVTeamInfo} = this.props
    updateVTeamInfo({
      code: detail.code,
      name: detail.name,
      note: e.currentTarget.value
    })
  }
};


export default TUI._connect({
  userId: "publicInfo.userInfo.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  detail: "vteamList.detail",
  preventSubmit: "publicInfo.msgInfo.txt"
}, EditClasses)