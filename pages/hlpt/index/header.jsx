import Header from 'Header'
import { openDialog } from 'Dialog'
import { openModalDialog } from 'ModalDialog'

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
    TUI.platform.get("/userInfo/" + USER_ID, function (result) {
      if (result.code == 0) {
        let _d = result.data
        updateUserInfo({ id: _d.userId, name: _d.userName, photo: _d.photocrc })
      }
      else if (result.code == 404) {
        updateUserInfo({})
      }
      else {
        errorMsg(result.message)
      }
    })

    // let $search = document.getElementById("t-header-search-i")
    // let keypressFn = function (e) {
    //   if (e.keyCode == 13) {
    //     console.info("刷新table")
    //     _this.props.refreshTable()
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
    //     else if (_this.props.searchInfo.name == "userMaintain") {
    //       _this.searchUserMaintain($search.value)
    //     }
    //     else if (_this.props.searchInfo.name == "dataPrivileges") {
    //       _this.searchDataPrivileges($search.value)
    //     }
    //     else if (_this.props.searchInfo.name == "personMatchPost") {
    //       _this.searchPersonMatchPost($search.value)
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
  //   let {searchInfo, addSubList, updatePageInfo, errorMsg} = this.props
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
  //     else if (result.code == 404) {
  //       addSubList([])
  //     }
  //     else {
  //       errorMsg(result.message)
  //     }
  //     updatePageInfo({
  //       size: 1,
  //       sum: 1
  //     })
  //   })
  // }

  // searchManage(val) {
  //   let {searchInfo, addUserInVTeam, updatePageInfo, errorMsg} = this.props
  //   val = val ? "/projectteam/persons/" + val + "/" + searchInfo.key : "/projectteam/persons/" + searchInfo.key + "/1/6"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addUserInVTeam(result.datas)
  //     }
  //     else if (result.code == 404) {
  //       addUserInVTeam([])
  //     }
  //     else {
  //       errorMsg(result.message)
  //     }
  //     updatePageInfo({
  //       sum: 1
  //     })
  //   })
  // }

  // searchVTeam(val) {
  //   const {errorMsg} = this.props
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
  //       else if (result.code == 404) {
  //         addVTeamData([])
  //       }
  //       else {
  //         errorMsg(result.message)
  //       }
  //     }
  //   })
  // }

  // searchPositionMaintain(val) {
  //   let {searchInfo, addPositionMaintain, updatePageInfo, errorMsg} = this.props
  //   val = "/positions?positionName=" + val + "&from=0&limit=10"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addPositionMaintain(result.data)
  //     }
  //     else if (result.code == 404) {
  //       addPositionMaintain([])
  //     }
  //     else {
  //       errorMsg(result.message)
  //     }
  //     updatePageInfo({
  //       index: 1,
  //       size: 10,
  //       sum: result._page.total,
  //       url: "/positions?positionName=" + val + "&from={0}&limit=10"
  //     })
  //   })
  // }

  // searchUserMaintain(val) {
  //   let {searchInfo, addUserMaintain, updatePageInfo, errorMsg} = this.props
  //   val = "/staffs?loginName=" + val + "&from=0&limit=10"
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addUserMaintain(result.data)
  //     }
  //     else if (result.code == 404) {
  //       addUserMaintain([])
  //     }
  //     else {
  //       errorMsg(result.message)
  //     }
  //     updatePageInfo({
  //       index: 1,
  //       size: 10,
  //       sum: result._page.total,
  //       url: "/staffs?loginName=" + val + "&from={0}&limit=10"
  //     })
  //   })
  // }

  // searchDataPrivileges(val) {
  //   let {searchInfo, addDataPrivileges, updatePageInfo, errorMsg} = this.props
  //   if (val) {
  //     val = "/staffs?loginName=" + val + "&from=0&limit=10"
  //   }
  //   else {
  //     val = "/staffs?isData=1&from=0&limit=10"
  //   }
  //   TUI.platform.get(val, function (result) {
  //     if (result.code == 0) {
  //       addDataPrivileges(result.data)
  //     }
  //     else if (result.code == 404) {
  //       addDataPrivileges([])
  //     }
  //     else {
  //       errorMsg(result.message)
  //     }
  //     updatePageInfo({
  //       index: 1,
  //       size: 10,
  //       sum: result._page.total,
  //       url: val.replace("from=0", "from={0}")
  //     })
  //   })
  // }

  // searchPersonMatchPost(val) {
  //   let {errormsg, searchInfo, addDataPrivileges, updatePageInfo, addPersonMatchPostSelectUserData, addPersonMatchPostRole, addPersonMatchPostSetRoleData, addPersonMatchPost} = this.props
  //   if (searchInfo.key.type == "addPersonMatchPostRole") {
  //     TUI.platform.get("/dutys/?positionId=" + searchInfo.key.positionId + "&loginUid=" + val, function (result) {
  //       if (result.code == 0) {
  //         let _data = result.data
  //         addPersonMatchPostRole(_data)
  //       }
  //     })
  //   }
  //   else if (searchInfo.key.type == "personMatchPostEdit_parttime" || searchInfo.key.type == "personMatchPostEdit_callin") {
  //     if (val) {
  //       val = "/staffs?loginName=" + val + "&from=0&limit=10"
  //       TUI.platform.get(val, function (result) {
  //         if (result.code == 0) {
  //           addPersonMatchPostSelectUserData(result.data)
  //           updatePageInfo({
  //             index: 1,
  //             size: 10,
  //             sum: result._page.total,
  //             url: val.replace("from=0", "from={0}")
  //           })
  //         }
  //         else if (result.code == 404) {
  //           addPersonMatchPostSelectUserData([])
  //         }
  //         else {
  //           errorMsg(result.message)
  //         }
  //       })
  //     }
  //     else {
  //       //val = "/staffs?from=0&limit=10"
  //       addPersonMatchPostSelectUserData([])
  //     }

  //   }
  //   else if (searchInfo.key.type == "addPersonMatchPostSetRoleData") {
  //     TUI.platform.get("/roles?positionId=" + searchInfo.key.positionId + "&roleName=" + val, function (result) {
  //       if (result.code == 0) {
  //         let _data = result.data
  //         addPersonMatchPostSetRoleData(_data)
  //       }
  //       else if (result.code == 404) {
  //         addPersonMatchPostSetRoleData([])
  //       }
  //       else {
  //         errorMsg(result.message)
  //       }
  //     })
  //   }
  //   else {
  //     let url = searchInfo.key.unitId ? "/positions?unitId=" + searchInfo.key.unitId + "&positionName=" + val + "&from={0}&limit=10" : "/positions?positionName=" + val + "&unitCode=0&from={0}&limit=10"
  //     TUI.platform.get(url.replace("{0}", "0"), function (result) {
  //       if (result.code == 0) {
  //         addPersonMatchPost(result.data)
  //       }
  //       else if (result.code == 404) {
  //         addPersonMatchPost([])
  //       }
  //       else {
  //         errorMsg(result.message)
  //       }
  //     })
  //   }

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
}, _Header)