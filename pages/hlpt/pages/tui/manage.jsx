import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

//图片
import minus from "!url!../../components/MultyMenu/img/minus.png"

//组件
import Content2 from "../../components/Layout/content2"
import Content3 from "../../components/Layout/content3"
import Btn from "../../components/Btn/index"
import Table from "../../components/Table/index"
import MultyMenu, { editFn } from "../../components/MultyMenu/index"
import SidePage, { openSidePage, closeSidePage } from "../../components/SidePage/index"
import Pager from "../../components/Pager/index"
import { openDialog, closeDialog } from "../../components/Dialog/index"
import ManageEditVTeam from "./manage.editVTeam"
import ManageEditUser from "./manage.editUser"
import ManageUserMenu from "./manage.userMenu"
import { openLoading, closeLoading } from "../../components/Loading/index"

let TEAM_ID = null
let DEFAULT_TEAM_ID = null


class Manage extends Component {
  render() {
    const { errorMsg, msg, users, updateSidePageInfo, sidePageInfo, data, pageInfo, updateUserInVTeam, updateSubVTeamUser, updateDialog, delSubVTeamUserToList, updatePageInfo, userId, teamId} = this.props

    let _this = this
    let tblContent = {
      "thead": { "name1": "序号", "name2": "用户", "name3": "姓名", "name4": "是否管理员", "name5": "成员角色", "name6": "操作" },
      "tbody": []
    }
    for (var i = 0; i < users.length; i++) {
      let _d = users[i]
      tblContent.tbody.push({
        "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
        "value2": _d.user_id,
        "value3": _d.user_name,
        "value4": _d.user_type == "1" ? "是" : "否",
        "value5": _d.user_note,
        "fns": [{
          "name": "编辑",
          "fn": function () {
            openSidePage(_this, {
              status: "eidtUser",
              width: ""
            })

            TUI.platform.get("/projectteam/persons/" + _d.id, function (result) {
              if (result.code == 0) {
                let _d = result.datas[0]
                updateSubVTeamUser({
                  id: _d.id,
                  user: _d.user_id,
                  name: _d.user_name,
                  role: _d.user_note,
                  admin: _d.user_type,
                  sort: _d.sort
                })
              }
            })

          }
        }, {
          "name": "删除",
          "fn": function () {
            var fn = function () {
              delSubVTeamUserToList(_d.id)
              updatePageInfo({
                sum: pageInfo.sum - 1
              })

              TUI.platform.post("/projectteam/persons", {
                "team_id": teamId,
                "last_modid": userId,
                "last_modtime": TUI.fn.currentTime(),
                "usersadd": [],
                "usersdelete": [{
                  "user_id": _d.user_id,
                  "user_note": "",
                  "user_type": _d.user_type,
                  "sort": ""
                }]
              }, function (result) {
                if (result.code == 0) {
                  _this.loadSubVTeamList(teamId)
                }
                else {
                  errorMsg(TUI.ERROR_INFO[result.code]);
                }
              })
            }

            openDialog(_this, "是否确定删除【" + _d.user_name + "】", fn)
          }
        }]
      })
    }


    let sidePageContent = []
    if (sidePageInfo.status == "userList") {
      sidePageContent.push(<ManageUserMenu key="manage_usermenu" />)
    }
    else if (sidePageInfo.status == "addMenu" || sidePageInfo.status == "editMenu") {
      sidePageContent.push(<ManageEditVTeam key="manage_editvteam" />)
    }
    else if (sidePageInfo.status == "eidtUser") {
      sidePageContent.push(<ManageEditUser key="manage_edituser" />)
    }

    //如果module不为空,则表示是单独打开的页面
    let backBtn
    if (!TUI.fn.requestParam("module")) {
      backBtn = <Btn txt="返回" href={this.props.router.goBack} width="95" style={{ marginLeft: "10px", marginTop: "25px" }} />
    }

    return (
      <div>
        <Content3>
          <div>
            {backBtn}
            <MultyMenu data={data} type="edit" lastdeep="3" color="white" addMenu={this.addMenu.bind(this)} editMenu={this.editMenu.bind(this)} delMenu={this.delMenu.bind(this)} clickMenu={this.clickSubVTeam.bind(this)} openSubMenu={this.openSubMenuLeft.bind(this)} style={{ marginTop: "20px" }} />
          </div>
          <div className="tblTip">
            <ul>
              <li>
                <h1>名称</h1>
                <p>-</p>
              </li>
              <li>
                <h1>编号</h1>
                <p>-</p>
              </li>
            </ul>
          </div>
          <div className="t-content_t">
            <span>虚拟组织人员列表</span>
            <Btn type="add" txt="新增" style={{ float: "right" }} href={this.addUserList.bind(this)} />
          </div>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} />
          <Pager fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
        </Content3>
        <SidePage>
          <div>
            {sidePageContent}
          </div>
        </SidePage>
      </div>
    )
  }

  pageFn(index, loadComplete) {
    // let obj1 = { "pagertotal": "12", "code": "0", "msg": "", "datas": [{ "id": "CE7993D326454A52859BEE9D308CFBFA", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "wugf1202", "user_name": "吴高峰", "user_note": "领导", "del_flag": "n", "user_type": "1", "sort": "1", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:42" }, { "id": "692A224422E44716A8B1B98E76463E29", "team_id": "DD103F29F4484B7C855844492AC368F2", "user_id": "dingjh0625", "user_name": "丁君辉", "user_note": "领导", "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_guiyue", "last_modtime": "2016-05-28 16:41:49" }, { "id": "C271D82C7BA14687A6BC92426C45F88F", "team_id": "1FD8F6E054B04D79AC30ADC81C8A5138", "user_id": "p_luob", "user_name": "罗柏", "user_note": null, "del_flag": "n", "user_type": "0", "sort": "999", "last_modid": "p_wenren", "last_modtime": "2016-07-04 18:18:21" }] }
    // this.props.addXNUserData(obj1.datas)

    const {pageInfo, addUserInVTeam, updatePageInfo} = this.props

    TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
      if (result.code == 0) {
        addUserInVTeam(result.datas)
        updatePageInfo({
          index: index,
          size: 5,
          sum: parseInt(result.pagertotal),
          url: pageInfo.url
        })
        loadComplete()
      }
      else {
        addUserInVTeam([])
      }
    })
  }

  addUserList() {
    const {teamId, addOSData, updateSidePageInfo} = this.props

    openSidePage(this, {
      status: "userList",
      width: "400"
    })


    TUI.platform.get("/projectteam/persons/" + teamId + "/1/100", function (result) {
      if (result.code == 0) {
        let selectedArry = []
        for (let index = 0; index < result.datas.length; index++) {
          let d = result.datas[index];
          selectedArry.push(d.user_id)
        }
        addOSData(selectedArry)
      }
    })
  }

  componentDidMount() {
    const {addSubVTeamData, params, errorMsg, updateSearchInfo} = this.props
    const _this = this
    //获取虚拟子组织
    let currentTeamId
    if (!TUI.fn.requestParam("module")) {
      currentTeamId = params.id
    }
    else {
      currentTeamId = TUI.fn.requestParam("teamId")
    }

    openLoading()
    TUI.platform.get("/projectteam/teams/" + currentTeamId + "/p", function (result) {
      let main = [],
        children = []
      if (result.code == 0) {
        for (var i = 0; i < result.datas.length; i++) {
          var $obj = result.datas[i];
          if ($obj.upper_team_id == "-1") {
            main.push({
              id: $obj.team_id,
              name: $obj.team_name,
              type: $obj.team_code,
              num: $obj.team_users,
              isHadSub: "0",
              deep: "1",
              btns: "A",
              chilren: ""
            })
          }
          else {
            children.push({
              id: $obj.team_id,
              name: $obj.team_name,
              type: $obj.team_code,
              num: $obj.team_users,
              isHadSub: "0",
              deep: "2"
            })
          }
        }
        main[0].children = children
        addSubVTeamData(main)

        //更新搜索信息
        updateSearchInfo({
          key: currentTeamId,
          name: "manage",
          info: "请输入关键字(用户)"
        })

        closeLoading()
      }
      else {
        errorMsg(TUI.ERROR_INFO[obj.code]);
      }
    })


    let _didMount = function () {
      //默认展开一个sub
      document.querySelector(".t-multyMenu_list_li").querySelector(".sub").style.display = "block"
      let $img = document.querySelector(".t-multyMenu_list_main").getElementsByTagName("img")[1]
      $img.setAttribute("src", minus)
      $img.setAttribute("data-status", "show")

      let $sub = $img.parentNode.parentNode.parentNode
      $sub.style.backgroundColor = "rgba(250,250,250,0.5)"
      $sub.style.borderRadius = "3px"
      //默认显示第一子菜单的名称和编码

      let $p = document.querySelector(".tblTip").getElementsByTagName("p")
      $p[0].innerText = $sub.getAttribute("data-name")
      $p[1].innerText = $sub.getAttribute("data-type")

      let id = $sub.getAttribute("data-id")
      let num = $sub.getAttribute("data-num")
      let relateId = $img.getAttribute("data-id")
      _this.loadSubVTeamList(id, num, relateId)

      if (TUI.fn.requestParam("module")) {
        //获取组织机构
        TUI.platform.post("/treenode/unittree", { "unitCode": "0", "isLoadUser": "false" }, function (result) {
          if (result.code == 0) {
            _this.props.addOData(result.datas)

          }
          else {
            _this.props.errorMsg(TUI.ERROR_INFO[result.code]);
          }
        })
      }
    }
    setTimeout(_didMount, 150)
  }

  clickSubVTeam($m) {
    //单击子此单显示其名称和编码
    let _this = this
    let $menuLi = document.getElementsByClassName("clickmenu")
    for (let j = 0; j < $menuLi.length; j++) {
      let $m1 = $menuLi[j];
      $m1.style.backgroundColor = ""
    }
    $m.style.backgroundColor = "rgba(250,250,250,0.5)"
    $m.style.borderRadius = "3px"

    let $p = document.querySelector(".tblTip").getElementsByTagName("p")
    $p[0].innerText = $m.getAttribute("data-name")
    $p[1].innerText = $m.getAttribute("data-type")

    let id = $m.getAttribute("data-id")
    let num = $m.getAttribute("data-num")
    let relateId = $m.getElementsByTagName("img")[0].getAttribute("data-id")
    _this.loadSubVTeamList(id, num, relateId)
  }

  loadSubVTeamList(id, num, relateId) {
    const {updateSubVTeamId, addUserInVTeam, updatePageInfo, updateSearchInfo} = this.props

    updateSubVTeamId({
      id: id,
      num: num,
      relateId: relateId
    })

    TUI.platform.get("/projectteam/persons/" + id + "/1/6", function (result) {
      if (result.code == 0) {
        addUserInVTeam(result.datas)
        updatePageInfo({
          index: 1,
          size: 6,
          sum: parseInt(result.pagertotal),
          url: "/projectteam/persons/" + id + "/{0}/6"
        })
        //更新搜索信息
        updateSearchInfo({
          key: id,
          name: "manage"
        })
      }
      else {
        addUserInVTeam([])
        updatePageInfo({
          sum: 1
        })
      }
    })
  }

  delMenu(params) {
    const {data, deldata, userId} = this.props
    let _this = this
    let id = params.id
    let upperId = id.split("-")[0]
    let teamId = id.split("-")[1]

    var delFn = function () {
      TUI.platform.post("/projectteam/team", {
        "uid": userId,
        "team_id": teamId,
        "upper_team_id": upperId,
        "del_flag": "y",
        "opertype": "U"
      }, function (result) {
        if (result.code == 0) {
          closeSidePage()
          _this.delData(data, id.split("-"), deldata, 0)
          _this.props.successMsg("虚拟项目组删除成功")
        }
        else {
          _this.props.errorMsg(TUI.ERROR_INFO[result.code]);
        }
      })
    }
    openDialog(this, "确认删除此项吗？", delFn)
  }

  addMenu(params) {
    const {updateSidePageInfo, clearSubVTeamInfo} = this.props
    let _this = this
    closeSidePage()

    setTimeout(function () {
      openSidePage(_this, {
        status: "addMenu",
        width: ""
      })
    }, 100);

    clearSubVTeamInfo()
  }

  editMenu(params) {
    const {updateSidePageInfo, updateSubVTeamInfo, errorMsg} = this.props
    let _this = this

    closeSidePage()
    setTimeout(function () {
      openSidePage(_this, {
        status: "editMenu",
        width: ""
      })
    }, 100);

    let editIds = params.id.split("-")
    TUI.platform.get("/projectteam/team/" + editIds[editIds.length - 1], function (result) {
      if (result.code == 0) {
        let _d = result.datas[0]
        updateSubVTeamInfo({
          relateId: params.id,
          code: _d.team_code,
          name: _d.team_name,
          note: _d.team_note
        })
      }
      else {
        errorMsg(TUI.ERROR_INFO[result.code]);
      }
    })

  }

  delData(data, deep, fn, _deep) {
    //deep的格式是1-2-3,拆成数组
    //如果deep的length==1的话,就说明已经钻到底层了
    if (deep.length == 1) {
      for (let index = 0; index < data.length; index++) {
        let d = data[index]
        if (d.id == deep[0]) {
          data.splice(index, 1)
          fn(this.props.data)
        }
      }
      return false
    }

    //钻到最底层
    for (var index = 0; index < data.length; index++) {
      let d = data[index]
      if (d.id == deep[0] && deep.length > 1) {
        deep.splice(0, 1)
        this.delData(d.children, deep, fn, _deep + 1)
      }
    }
  }

  openSubMenuLeft(_data, id, deep, loadComplete) {
    const {addSubVTeamData, data} = this.props
    for (let index = 0; index < _data.length; index++) {
      let d = _data[index]

      if (d.id == id) {
        TUI.platform.get("/projectteam/teams/" + id + "/c", function (result) {
          if (result.code == 0) {
            let children = []
            for (var j = 0; j < result.datas.length; j++) {
              var $s = result.datas[j];
              children.push({
                id: $s.team_id,
                name: $s.team_name,
                type: $s.team_code,
                num: $s.team_users,
                deep: parseInt(deep) + 1
              })
            }

            d.children = children
            addSubVTeamData(data)

          }
          loadComplete()
        })
        break
      }
    }
  }
}

export default TUI._connect({
  users: "manages.users",
  userId: "publicInfo.userInfo.id",
  pageInfo: "publicInfo.pageInfo",
  msg: "publicInfo.msgInfo.txt",
  teamId: "manages.detail.id",
  sidePageInfo: "publicInfo.sidePageInfo",
  data: "manages.data"
}, Manage)