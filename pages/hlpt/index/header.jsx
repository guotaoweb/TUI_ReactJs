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
    const {updateUserInfo, errorMsg, history, searchInfo} = this.props
    let USER_ID = TUI.fn.requestParam("uId")
    let _this = this
    //获取当前用户信息
    if (USER_ID) {
      openLoading(1)
      TUI.platform.get("/userInfo/" + USER_ID, function (result) {
        if (result.code == 0) {
          let _d = result.data
          updateUserInfo({ id: _d.userId, name: _d.userName, photo: _d.photocrc })
        }
        else if (result.code == 404) {
          browserHistory.push(Config.ROOTPATH+"ErrorPage") 
        }
        else {
          errorMsg(result.message)
        }
      })
    }
    else{
      browserHistory.push(Config.ROOTPATH+"ErrorPage") 
    }
  }


  showMore() {
    let $more = ReactDOM.findDOMNode(this.refs.more)
    let $li = $more.getElementsByTagName("li")

    let _fn = function () {
      let $m = this.parentNode
      $m.style.display = "none"
    }

    if ($more.style.display == "block") {
      $more.style.display = "none"
    }
    else {
      $more.style.display = "block"
      for (var i = 0; i < $li.length; i++) {
        var $e = $li[i];
        $e.removeEventListener("click", _fn)
        $e.addEventListener("click", _fn)
      }
    }
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userInfo: "publicInfo.userInfo",
  searchInfo: "publicInfo.searchInfo"
}, _Header)