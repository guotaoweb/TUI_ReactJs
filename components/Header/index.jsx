import '!style!css!postcss!sass!./style.scss'

import BreadNav from 'BreadNav'

//图片
import defaultTx from "!url!./img/default_tx.png"
import help from "!url!./img/help.png"
import searchIcon from "!url!./img/search.png"
import closeSide from "!url!./img/closeside.png"
import openSide from "!url!./img/openside.png"

class Header extends React.Component {
  render() {
    const {userInfo, sideStatus, searchInfo, list} = this.props
    let myPhoto, _list = []

    if (userInfo.photo) {
      if (userInfo.photo.indexOf("1_") == 0 || userInfo.photo.indexOf("default") == 0 || userInfo.photo.indexOf("man_big") == 0) {
        myPhoto = require("./img/HeadImage/" + userInfo.photo)
      }
      else {
        myPhoto = Config.IMGPATH + userInfo.photo;
      }
    }
    else {
      myPhoto = defaultTx
    }

    for (var i = 0; i < list.length; i++) {
      var $m = list[i];

      _list.push(<li key={"header_" + i} onClick={$m.fn}>{$m.name}</li>)
      if (i == list.length-1 && Config.THEMESWITCH==0) {
        _list.push(<li key={"header_" + i+"_0"}>
          <span className="_theme_default" data-color="default" onClick={this.switchColorFn.bind(this)}>1</span> 
          <span className="_theme_blue" data-color="blue" onClick={this.switchColorFn.bind(this)}>1</span>
          <span className="_theme_green" data-color="green" onClick={this.switchColorFn.bind(this)}>1</span>
          <span className="_theme_red" data-color="red" onClick={this.switchColorFn.bind(this)}>1</span>
        </li>)
      }
    }

    // <div className="t-header-search">
    //   <input id="t-header-search-i" type="text" ref="search" placeholder={searchInfo.info ? searchInfo.info : "请输入关键词"} />
    // </div>

    return (
      <div className="t-header" ref="tHeader">
        <a href="javascript:void(0);" className="t-header_sideControl" onClick={this.updateSideStatus.bind(this)}>
          <img src={sideStatus == 0 ? closeSide : openSide} />
        </a>
        <BreadNav style={{ height: "50px", lineHeight: "50px", position: "absolute", marginLeft: "10px" }} />
        <div className="t-header_myphoto">
          <div onClick={this.showMore.bind(this)}><img src={myPhoto} /></div><span>{userInfo.name}</span>
          <ul className="more" ref="more">
            {_list}
          </ul>
        </div>
      </div>
    );
  }

  //   aboutUs() {
  //     openDialog(this, config.VERSION)
  //   }

  updateSideStatus() {
    const {updateSideStatus} = this.props
    updateSideStatus()
    var tSideSub = document.getElementsByClassName("t-side_sub")
    for (var index = 0; index < tSideSub.length; index++) {
      var s = tSideSub[index];
      s.style.display = "none"
    }

  }

  componentDidMount() {
    const {updateUserInfo, alertMsg, history, searchInfo} = this.props
    let USER_ID = TUI.fn.requestParam("uId")
    let _this = this
    //获取当前用户信息
    // TUI.platform.get("/workgroup/userinfo/" + USER_ID, function (result) {
    //   if (result.code == 0) {
    //     let _d = result.datas[0]
    //     updateUserInfo({ id: _d.uid, name: _d.username, photo: _d.photocrc })
    //   }
    //   else {
    //     alertMsg(config.ERROR_INFO[result.code]);
    //   }
    // })

    // let $search = ReactDOM.findDOMNode(this.refs.search)
    // let keypressFn = function (e) {
    //   if (e.keyCode == 13) {

    //     if (_this.props.searchInfo.name == "orgnization") {
    //       _this.searchOrgnization($search.value)
    //     }
    //     else if (_this.props.searchInfo.name == "vteam") {
    //       _this.searchVTeam($search.value)
    //     }
    //     else if (_this.props.searchInfo.name == "manage") {
    //       _this.searchManage($search.value)
    //     }
    //     else if (_this.props.searchInfo.name == "positionMaintain") {
    //       _this.searchPositionMaintain($search.value)
    //     }
    //   }
    // }
    // //搜索
    // $search.addEventListener("focus", function () {
    //   document.addEventListener("keypress", keypressFn)
    // })

    // $search.addEventListener("blur", function () {
    //   document.removeEventListener("keypress", keypressFn)
    // })
  }

  switchColorFn(e){
    var $this = e.currentTarget;
    var _color = $this.getAttribute("data-color");
    //this.props.programInit(0)
    this.props.setTheme(_color)
    localStorage["theme"]=_color
    //console.info(_color)
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
}, Header)