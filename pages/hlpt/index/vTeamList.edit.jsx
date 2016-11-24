import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import {closeSidePage} from "SidePage"


class EditVTeam extends React.Component {
  render() {
    const {sidePageInfo, userId, detail} = this.props
    let tabs = []

    if (sidePageInfo.status == "editVTeam") {
      tabs.push({ name: "编辑虚拟组织" })
    }
    else {
      tabs.push({ name: "新增虚拟组织" })
    }

    return (
      <div>
        <Content2 tabs={tabs}>
          <div>
            <FormControls label="组织编码" ctrl="input" value="VTeamInfo.code"/>
            <FormControls label="组织名称" ctrl="input" value="VTeamInfo.name"/>
            <FormControls label="组织简介" ctrl="textarea" value="VTeamInfo.note"/>
            <div className="formControl-btn">
              <Btn type="cancel" txt="取消" href={this.goPrevPage.bind(this) } style={{ float: "left", marginRight: "10px" }} />
              <Btn type="check" txt="确定" href={this.editVTeamInfo.bind(this) } style={{ float: "left" }}  />
            </div>
          </div>
        </Content2>
      </div>
    )
  }


  editVTeamInfo() {
    const {editInfo, sidePageInfo, userId, successMsg, errorMsg, updateVTeamListByID, updateVTeamData, preventSubmit,waiteMsg} = this.props

    let _this = this,
      operType,
      teamId

    if (sidePageInfo.status == "editVTeam") {
      operType = "U"
      teamId = editInfo.VTeamInfo.id
    }
    else {
      operType = "A"
    }

    TUI.platform.post("/projectteam/team", {
      "uid": userId,
      "team_id": teamId,
      "upper_team_id": "-1",
      "team_code": editInfo.VTeamInfo.code,
      "team_name": editInfo.VTeamInfo.name,
      "team_note": editInfo.VTeamInfo.note,
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
            team_code: editInfo.VTeamInfo.code,
            team_name: editInfo.VTeamInfo.name,
            team_note: editInfo.VTeamInfo.note,
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
    const {clearEditInfo} = this.props
    setTimeout(function () {
      clearEditInfo({ 
        infoName:"VTeamInfo"
      })
      closeSidePage()
    }, 0)
    this.props.backBreadNav()
  }

  // onChangeByCode(e) {
  //   const {editInfo, updateVTeamInfo} = this.props
  //   updateVTeamInfo({
  //     code: e.currentTarget.value,
  //     name: editInfo.VTeamInfo.name,
  //     note: editInfo.VTeamInfo.note
  //   })
  // }
  // onChangeByName(e) {
  //   const {editInfo, updateVTeamInfo} = this.props
  //   updateVTeamInfo({
  //     code: editInfo.VTeamInfo.code,
  //     name: e.currentTarget.value,
  //     note: editInfo.VTeamInfo.note
  //   })
  // }
  // onChangeByNote(e) {
  //   const {editInfo, updateVTeamInfo} = this.props
  //   updateVTeamInfo({
  //     code: editInfo.VTeamInfo.code,
  //     name: editInfo.VTeamInfo.name,
  //     note: e.currentTarget.value
  //   })
  // }
};


export default TUI._connect({
  userId: "publicInfo.userInfo.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data",
  preventSubmit: "publicInfo.msgInfo.txt"

}, EditVTeam)