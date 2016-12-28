import Header from 'Header'
import { openDialog } from 'Dialog'
import { openModalDialog } from 'ModalDialog'
import { browserHistory } from 'react-router'
import {openLoading} from "Loading"

class _Header extends React.Component {
  render() {
    const {userInfo, sideStatus, searchInfo} = this.props
    let _this = this,
      list = [{
        name: "帮助说明",
        fn: function () {
          openModalDialog()
        }
      }, {
        name: "关于我们",
        fn: function () {
          openDialog(_this, Config.VERSION)
        }
      }]

    return (
      <Header list={list}></Header>
    );
  }

  componentDidMount() {
    const {updateUserInfo, errorMsg, history, searchInfo, userInfo} = this.props
    let _this = this
    //openLoading(1)
    TUI.platform.get("/User/" + userInfo.id, function (result) {
      if (result.code == 0) {
        let _d = result.datas[0]
        updateUserInfo({ id: userInfo.id, name: _d.UserName,role:_d.UserRole})
      }
      else {
        errorMsg(result.message)
      }
    })
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userInfo: "publicInfo.userInfo"
}, _Header)