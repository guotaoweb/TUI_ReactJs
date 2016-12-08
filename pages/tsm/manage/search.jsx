import Header from 'Header'
import {openDialog} from 'Dialog'
import {openModalDialog} from 'ModalDialog'
import * as config from 'config'

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
          openDialog(_this, config.VERSION)
        }
      }]

    return (
      <Header list={list}></Header>
    );
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userInfo: "publicInfo.userInfo"
}, _Header)