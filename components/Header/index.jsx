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
    }

    // <div className="t-header-search">
    //   <input id="t-header-search-i" type="text" ref="search" placeholder={searchInfo.info ? searchInfo.info : "请输入关键词"} />
    // </div>

    return (
      <div className="t-header" ref="tHeader">
        <a href="javascript:void(0);" className="t-header_sideControl" onClick={this.updateSideStatus.bind(this)}>
          <img src={sideStatus == 0 ? closeSide : openSide} />
        </a>
        <BreadNav style={{height:"50px",lineHeight:"50px",position:"absolute",marginLeft:"10px"}} />
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

  // searchOrgnization(val) {
  //   let {searchInfo, addSubList, updatePageInfo} = this.props
  //   //uid=" + searchInfo.key + "&
  //   let params = ["", ""]
  //   var _val = val.split(",")
  //   for (var i = 0; i < _val.length; i++) {
  //     if (i > 1) { break }
  //     var $v = _val[i]
  //     if (isNaN(parseInt($v))) {
  //       params[0] = $v
  //     }
  //     else {
  //       params[1] = $v
  //     }
  //   }

  //   val = val ? "/units?from=0&limit=10&unitName=" + params[0] + "&unitCode=" + params[1] : "/units?from=0&limit=10"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addSubList(result.data)
  //     }
  //     else {
  //       addSubList([])
  //     }
  //     updatePageInfo({
  //       size: 1,
  //       sum: 1
  //     })
  //   })
  // }

  // searchManage(val) {
  //   let {searchInfo, addUserInVTeam, updatePageInfo} = this.props
  //   val = val ? "/projectteam/persons/" + val + "/" + searchInfo.key : "/projectteam/persons/" + searchInfo.key + "/1/6"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addUserInVTeam(result.datas)
  //     }
  //     else {
  //       addUserInVTeam([])
  //     }
  //     updatePageInfo({
  //       sum: 1
  //     })
  //   })
  // }

  // searchVTeam(val) {
  //   let _this = this
  //   val = val ? "/projectteam/team/name/" + val + "/p" : "/projectteam/teams/all/1/7"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       if (result.code == 0) {
  //         _this.props.addVTeamData(result.datas)

  //         //搜索结果不分页
  //         if (val.indexOf("all") > -1) {
  //           _this.props.updatePageInfo({
  //             index: 1,
  //             size: 7,
  //             sum: result.pagertotal,
  //             url: "/projectteam/teams/all/{0}/7"
  //           })
  //         }
  //       }
  //       else if (result.code == 9) {
  //         addVTeamData([])
  //       }
  //       else {
  //         errorMsg(TUI.ERROR_INFO[result.code]);
  //       }
  //     }
  //   })
  // }

  // searchPositionMaintain(val) {
  //   let {searchInfo, addPositionMaintain, updatePageInfo} = this.props
  //   val = "/positions?positionName=" + val + "&from=0&limit=10"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addPositionMaintain(result.data)
  //     }
  //     else {
  //       addPositionMaintain([])
  //     }
  //     updatePageInfo({
  //       sum: 1
  //     })
  //   })
  // }

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