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
        name: "快捷键",
        fn: function () {
          openModalDialog({id:"quickKey"})
        }
      },{
        name: "帮助说明",
        fn: function () {
          openModalDialog({id:"help"})
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

    
    document.addEventListener("keypress",function(e){
        if(e.keyCode=="65"){
          browserHistory.push(Config.ROOTPATH+"userMaintain")
        }
        else if(e.keyCode=="83"){
          browserHistory.push(Config.ROOTPATH+"orgnization")
        }
        else if(e.keyCode=="68"){
          browserHistory.push(Config.ROOTPATH+"positionMaintain")
        }
        else if(e.keyCode=="81"){
          browserHistory.push(Config.ROOTPATH+"personMatchPost")
        }
        else if(e.keyCode=="72"){
          openModalDialog({id:"help"})
        }
        else if(e.keyCode=="86"){
          openDialog(_this, Config.VERSION)
        }
    })
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userInfo: "publicInfo.userInfo"
}, _Header)