import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditAdmin extends React.Component {
  render() {
    const {sidePageInfo} = this.props
    let tabs = []

    if (sidePageInfo.status == "editAdmin") {
      tabs.push({ name: "编辑管理员" })
    }
    else {
      tabs.push({ name: "新增管理员" })
    }
    let _slideOptions = [{ id: 0, name: "否" }, { id: 1, name: "是" }]
    return (
      <div>
        <Content2 tabs={tabs}>
          <div>
            <FormControls label="用户名" ctrl="input" value="userInfo.UserName" required="required" />
            <FormControls label="账号密码" ctrl="input" type="Password" placeholder="密码至少6位" value="userInfo.Password" />
            <FormControls label="重复密码" ctrl="input" type="Password" placeholder="密码至少6位" value="userInfo.ConfirmPassword" />
            <FormControls label="是否锁定" ctrl="slide" options={_slideOptions} value="userInfo.LockoutEnabled" />
            <div className="formControl-btn">
              <Btn type="cancel" txt="取消" href={this._goBack.bind(this)} />
              <Btn type="submit" txt="确定" href={this.editAdminInfo.bind(this)} />
            </div>
          </div>
        </Content2>
      </div>
    )
  }

  _goBack() {
    const {clearEditInfo} = this.props
    closeSidePage()
    clearEditInfo({
      infoName: "userInfo"
    })
  }

  editAdminInfo() {
    const {
      editInfo,
      sidePageInfo,
      successMsg,
      errorMsg,
      updateAdminList,
      addAdminList
    } = this.props
    let _this = this


    let jsonParam = {
      UserName: editInfo.userInfo.UserName,
      Password: editInfo.userInfo.Password,
      LockoutEnabled: editInfo.userInfo.LockoutEnabled
    }



    if (sidePageInfo.status == "addAdmin") {
      if (jsonParam.Password.length < 6 || editInfo.userInfo.ConfirmPassword.length < 6) {
        setTimeout(function () { errorMsg("密码至少6位") }, 1000)
        return false
      }
      jsonParam["ConfirmPassword"] = editInfo.userInfo.ConfirmPassword
      TUI.platform.post("/Register", jsonParam, function (result) {
        if (result.code == 0) {
          jsonParam["Id"] = result.datas
          successMsg("新增成功")
          addAdminList(jsonParam)
        }
        else {
          setTimeout(function () { errorMsg(Config.ERROR_INFO[result.code]); }, 1000)
        }
        _this._goBack()
      })
    }
    else {
      let _id = sidePageInfo.gateWay.id
      jsonParam["Id"] = _id
      TUI.platform.put("/User/" + _id, jsonParam, function (result) {
        if (result.code == 0) {
          successMsg("更新成功")
          updateAdminList(jsonParam)
        }
        else {
          setTimeout(function () { errorMsg(Config.ERROR_INFO[result.code]); }, 1000)
        }
        _this._goBack()
      })
    }
  }

};


export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  editInfo: "formControlInfo.data"
}, EditAdmin)