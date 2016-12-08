import '!style!css!postcss!sass!./style.scss'

import { Link } from 'react-router'


//图片
import add from "!url!./img/add.png"
import minus from "!url!./img/minus.png"
import addDark from "!url!./img/add-dark.png"
import minusDark from "!url!./img/minus-dark.png"
import sortdown from "!url!./img/sortdown.png"
import uncheck from "!url!./img/uncheck.png"
import check from "!url!./img/check.png"
import loading from "!url!./img/loading.png"
import loadingw from "!url!./img/loading-w.png"
//多级菜单的类型 
//allcheck(所有菜单都是可选的)
//lastcheck(最后一级菜单是可选的)
//nocheck(所有单选可选)
//edit 菜单可编辑

//初始化数据
let init = null
let selectedInit = null
let COLOR = null

class MultyMenu extends React.Component {
  render() {
    const {data, color, type, lastdeep, sdata, addMenu, editMenu, delMenu, clickMenu, openSubMenu} = this.props
    init = data
    COLOR = color
    let initData = []

    if (init) {
      for (let index = 0; index < init.length; index++) {
        let d = init[index];
        if (d.id == "9901" || d.id == "98" || d.id == "133B467977CB44352AE728CD9F22CC4C" || d.id == "6A34B21B10D8487D992594B571E4A1A7") {
          continue
        }

        let isHadSub
        if (d.isHadSub == "0") {
          isHadSub = <img key={"img1_" + d.id} src={color == "dark" ? addDark : add} data-id={d.id} onClick={openMenu.bind(this)} data-status="hide" />
        }

        //加号+复选框+加载
        let _more = []
        _more.push(
          <div key="menu-icons" style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "7px" }}>
            <div className="menu-loading"><img src={color == "dark" ? loading : loadingw} /></div>
            {isHadSub}
          </div>
        )
        if (type == "allcheck") {
          _more.push(<img className="menu_checkbox" key={"img2_" + d.id} src={uncheck} data-status="uncheck" data-id={d.id} data-mid={d.id} data-mtype={d.type} data-ext1={d.ext1} data-sid={d.sId} onClick={isCheck.bind(this)} />)
        }

        //更多
        let _moreBtn = []
        if (type == "edit") {
          let btns = d.btns
          if (!btns) {
            btns = ["A", "E", "D"]
          }
          else {
            btns = d.btns.split("/")
          }
          let btnList = []
          for (var i = 0; i < btns.length; i++) {
            var $btn = btns[i]
            if ($btn == "A") {
              btnList.push(
                <li key="multy_menu_add_btn" onClick={addFn.bind(this, {
                  deep: d.id,
                  id: d.id,
                  type: d.type,
                  ext1: d.ext1
                })}>新增</li>)
            }
            else if ($btn == "E") {
              btnList.push(
                <li key="multy_menu_edit_btn" onClick={editFn.bind(this, {
                  deep: d.id,
                  id: d.id,
                  type: d.type,
                  ext1: d.ext1
                })}>编辑</li>)
            }
            else if ($btn == "D") {
              btnList.push(
                <li key="multy_menu_del_btn" onClick={delFn.bind(this, {
                  deep: d.id,
                  id: d.id,
                  type: d.type,
                  ext1: d.ext1
                })}>删除</li>)
            }
          }

          _moreBtn.push(
            <div className="t-multyMenu_list_more" key={"morebtn_" + d.id}>
              <img src={sortdown} onClick={showMore.bind(this)} data-status="hide" />
              <ul className="t-multyMenu_list_more_list">
                {btnList}
              </ul>
            </div>
          )
        }

        let num = ""
        if (d.num) {
          num = "(" + d.num + ")"
        }

        initData.push(
          <li key={d.id} className="t-multyMenu_list_li">
            <div className="clickmenu t-multyMenu_list_main" data-num={d.num} data-name={d.name} data-id={d.id} data-type={d.type} data-role={d.role} ref="mains1" onClick={clickFn.bind(this)} style={{ color: color == "dark" ? "black" : "white" }}>
              <a href="javascript:void(0);" title={d.name + num} style={{ color: color == "dark" ? "black" : "white" }}>{_more}{d.name}{num}{_moreBtn}</a>
            </div>
            <ul className="sub">
              {
                d.children ? d.children.map(child => (
                  <TreeNode type={type} lastdeep={lastdeep} key={child.id} data={child} deep={d.deep} mid={child.id} mname={child.name} role={child.role} ext1={child.ext1} mtype={child.type} id={d.id + "-" + child.id} color={color} editMenu={editMenu} addMenu={addMenu} delMenu={delMenu} clickMenu={clickMenu} openSubMenu={openSubMenu} isHadSub={child.isHadSub} btns={child.btns} sId={child.sId} />
                )) : null
              }
            </ul>
          </li>
        )
        //如果sodata为空,则删除已选中的复选框
      }
    }
    
    let initHtml = []
    if (initData.length > 0) {
      initHtml.push(
        <ul key="menu_list" className="t-multyMenu_list">
          {initData}
        </ul>)
    }
    else {
      initHtml.push(<div key="menu_loadingstatus" style={{ textAlign: "center", width: "100%", height: "40px", marginTop: "30px", color: color == "dark" ? "black" : "white" }}>加载中...</div>)
    }
    return (
      <div className="t-multymenu" style={this.props.style}>
        <ul className="t-multyMenu_list">
          {initHtml}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.color == "dark") {
      for (let key in this.refs) {
        this.refs[key].style.color = "black"
      }
    }
  }
  componentDidUpdate() {
    updateCheckBoxStatus(this.props.sdata)
  }
}
export default MultyMenu

class TreeNode extends React.Component {
  render() {
    const {sId, btns, isHadSub, data, color, deep, id, type, lastdeep, mid, mname, mtype, ext1, addMenu, editMenu, delMenu, clickMenu, openSubMenu,role} = this.props
    let subTree = null
    if (data.children) {
      subTree = data.children.map(child =>
        <TreeNode key={child.id} data={child} type={type} lastdeep={lastdeep} deep={child.deep} mid={child.id} mname={child.name} mtype={child.type} id={id + "-" + child.id} color={color} addMenu={addMenu} editMenu={editMenu} delMenu={delMenu} openSubMenu={openSubMenu} clickMenu={clickMenu} isHadSub={child.isHadSub} btns={child.btns} sId={child.sId} role={role} />
      )
    }

    let _isHadSub
    if (isHadSub == "0") {
      _isHadSub = <img key={"img1_" + id} src={color == "dark" ? addDark : add} data-deep={deep} data-status="hide" data-id={id} onClick={openMenu.bind(this)} />
    }

    //if (subTree) {
    let more = []
    if (deep < lastdeep) {
      more.push(
        <div key="menu-subicons" style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "7px" }}>
          <div className="menu-loading"><img src={color == "dark" ? loading : loadingw} /></div>
          {_isHadSub}
        </div>
      )
      if (type == "allcheck") {
        more.push(<img className="menu_checkbox" key={"img2_" + id} src={uncheck} data-deep={deep} data-status="uncheck" data-mid={mid} data-id={id} data-mtype={mtype} data-ext1={ext1} data-sid={sId} data-role={role} onClick={isCheck.bind(this)} />)
      }
    }
    else {
      if (type == "allcheck" || type == "lastcheck") {
        more.push(<img className="menu_checkbox" key={"img2_" + id} src={uncheck} data-deep={deep} data-status="uncheck" data-mid={mid} data-mtype={mtype} data-id={id} data-role={role} data-ext1={ext1} data-sid={sId} onClick={isCheck.bind(this)} />)
      }
    }

    let _moreBtn = []
    if (type == "edit") {
      let _btns = btns
      if (!_btns) {
        _btns = ["A", "E", "D"]
      }
      else {
        _btns = btns.split("/")
      }
      let btnList = []
      for (var i = 0; i < _btns.length; i++) {
        var $btn = _btns[i]
        if ($btn == "A") {
          btnList.push(
            <li key="multy_menu_add_btn" onClick={addFn.bind(this, {
              deep: id,
              id: mid,
              type: mtype,
              ext1: ext1
            })}>新增</li>)
        }
        else if ($btn == "E") {
          btnList.push(
            <li key="multy_menu_edit_btn" onClick={editFn.bind(this, {
              deep: id,
              id: mid,
              type: mtype,
              ext1: ext1
            })}>编辑</li>)
        }
        else if ($btn == "D") {
          btnList.push(
            <li key="multy_menu_del_btn" onClick={delFn.bind(this, {
              deep: id,
              id: mid,
              type: mtype,
              ext1: ext1
            })}>删除</li>)
        }
      }


      _moreBtn.push(
        <div className="t-multyMenu_list_more" key={"morebtn_" + id}>
          <img src={sortdown} onClick={showMore.bind(this)} data-status="hide" />
          <ul className="t-multyMenu_list_more_list">
            {btnList}
          </ul>
        </div>
      )
    }

    let num = ""
    if (data.num) {
      num = "(" + data.num + ")"
    }

    return (
      <li key={data.id}>
        <div className={"clickmenu t-multyMenu_list_sub sub" + deep} data-num={data.num} data-id={data.id} data-name={data.name} data-type={data.type} data-deep={id} data-role={data.role} onClick={clickFn.bind(this)} style={{ color: color == "dark" ? "black" : "white" }}>
          <a href="javascript:void(0);" title={data.name + num} style={{ color: color == "dark" ? "black" : "white" }}>{more}{data.name}{num}{_moreBtn}</a>
        </div>
        <ul className="sub">
          {subTree}
        </ul>
      </li>
    )
  }

}

export function openMenu(e) {
  let main = e.currentTarget
  let status = main.getAttribute("data-status")

  let sub = main.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("sub")[0]

  if (status == "hide") {
    sub.style.display = "block"
    main.setAttribute("data-status", "show")

    let _deep = main.getAttribute("data-deep")

    //如果同级元素.Sub的li数量大于0,则表示该菜单已经存在子菜单
    if (sub.getElementsByTagName("li").length == 0) {
      //0 请求的数据是插在init这个数据里面
      //1 deep表示该节点所在对象的深度,格式1-2-3
      //2 更新组织机构的方法
      //3 样式缩进用的,1表示缩进一次,以此类推

      insertData(init, main.getAttribute("data-id").split("-"), _deep ? _deep : 0, this.props)
      main.style.display = "none"
      main.previousSibling.style.display = "block"
    }
    else {
      if (this.props.color == "dark") {
        main.setAttribute("src", minusDark)
      }
      else {
        main.setAttribute("src", minus)
      }
    }
  }
  else {
    sub.style.display = "none"
    main.setAttribute("data-status", "hide")
    if (this.props.color == "dark") {
      main.setAttribute("src", addDark)
    }
    else {
      main.setAttribute("src", add)
    }
  }

  setTimeout(function () {
    loadComplete()
  }, 10000)
}

//选中复选框方法
export function isCheck(e) {
  let obj = e.currentTarget
  let status = obj.getAttribute("data-status")
  if (status == "uncheck") {

    obj.setAttribute("src", check)
    obj.setAttribute("data-status", "check")
    if (obj.getAttribute("data-sid")) {
      isCheckNodes(obj, "check")
    }
    else {
      unCheckParents(obj, "uncheck")
      unCheckNodes(obj, "uncheck")
    }
  }
  else {
    obj.setAttribute("src", uncheck)
    obj.setAttribute("data-status", "uncheck")
    if (obj.getAttribute("data-sid")) {
      unCheckNodes(obj, "uncheck")
    }
  }
}

//取消父节点被选中状态
export function unCheckParents(obj, status) {
  if (obj.getAttribute("class") != "t-multyMenu_list_li") {
    if (obj.getAttribute("class") == "sub") {
      let $checkbox = obj.previousSibling.getElementsByClassName("menu_checkbox")[0]
      if ($checkbox) {
        $checkbox.setAttribute("src", uncheck)
        $checkbox.setAttribute("data-status", status)
      }
    }
    unCheckParents(obj.parentNode, status)
  }
}

//取消子节点被选中状态
export function unCheckNodes(obj, status) {
  let $checkbox = obj.parentNode.parentNode.nextSibling.getElementsByClassName("menu_checkbox")
  for (var index = 0; index < $checkbox.length; index++) {
    var $c = $checkbox[index];
    $c.setAttribute("src", uncheck)
    $c.setAttribute("data-status", status)
  }
}

//选择所有子节点
export function isCheckNodes(obj, status) {
  let $checkbox = obj.parentNode.parentNode.parentNode.getElementsByClassName("menu_checkbox")

  for (var index = 0; index < $checkbox.length; index++) {
    var $c = $checkbox[index];
    $c.setAttribute("src", check)
    $c.setAttribute("data-status", status)
  }
}


//将数据插入在指定位置
export function insertData(data, deep, _deep, props) {
  //deep的格式是1-2-3,拆成数组
  //如果deep的length==1的话,就说明已经钻到底层了
  if (deep.length == 1) {
    //openSubMenu是从外面传进来的,更新子节点的方法
    if (props.openSubMenu) {
      props.openSubMenu(data, deep[0], _deep, loadComplete)
    }
    return false
  }

  //钻到最底层 
  for (var index = 0; index < data.length; index++) {
    let d = data[index]
    if (d.id == deep[0] && deep.length > 1) {
      deep.splice(0, 1)
      insertData(d.children, deep, _deep, props)
    }
  }

}

export function loadComplete() {
  let loadings = document.getElementsByClassName("menu-loading")
  for (var i = 0; i < loadings.length; i++) {
    var $l = loadings[i]
    if ($l.style.display == "block") {
      $l.nextSibling.style.display = "inline"
      if (COLOR == "dark") {
        $l.nextSibling.setAttribute("src", minusDark)
      }
      else {
        $l.nextSibling.setAttribute("src", minus)
      }
    }
    else {

    }
    $l.style.display = "none"
  }
}

export function clearCheckBox() {
  let $checkbox = document.getElementsByClassName("menu_checkbox")
  for (var index = 0; index < $checkbox.length; index++) {
    var $c = $checkbox[index]
    $c.setAttribute("src", uncheck)
    $c.setAttribute("data-status", "uncheck")
  }
}

//将sdata的数据,标注为已选中
export function updateCheckBoxStatus(sdata) {
  if (sdata) {
    let $checkbox = document.getElementsByClassName("menu_checkbox")
    for (var i = 0; i < sdata.length; i++) {
      var s = sdata[i];
      for (var j = 0; j < $checkbox.length; j++) {
        var $c = $checkbox[j]
        let _s = $c.getAttribute("data-sid") ? $c.getAttribute("data-sid") : $c.getAttribute("data-mid")
        if (s == _s) {
          $c.setAttribute("src", check)
          $c.setAttribute("data-status", "check")
          $c.setAttribute("data-selected", "true")
        }
      }
    }
  }
  else {
    let $checkbox = document.getElementsByClassName("menu_checkbox")
    for (var j = 0; j < $checkbox.length; j++) {
      var $c = $checkbox[j];
      if ($c.getAttribute("data-selected") == "true") {
        $c.setAttribute("src", uncheck)
        $c.setAttribute("data-status", "uncheck")
        $c.setAttribute("data-selected", "false")
      }
    }
  }
}

//显示更多按钮
export function showMore(e) {
  var more = e.currentTarget
  var status = more.getAttribute("data-status")
  var moreList = more.parentNode.getElementsByClassName("t-multyMenu_list_more_list")[0]

  if (status == "hide") {
    moreList.style.display = "block"
    more.setAttribute("data-status", "show")
    let _mouseleave = function () {
      moreList.style.display = "none"
      more.setAttribute("data-status", "hide")
      moreList.parentNode.parentNode.removeEventListener("mouseleave", _mouseleave)
    }
    moreList.parentNode.parentNode.addEventListener("mouseleave", _mouseleave)

  }
  else {
    moreList.style.display = "none"
    more.setAttribute("data-status", "hide")

  }
}


//更多按钮-新增
export function addFn(params) {
  this.props.addMenu(params)
}

//更多按钮-编辑
export function editFn(params) {
  this.props.editMenu(params)
}

//更多按钮-删除
export function delFn(params) {
  this.props.delMenu(params)
}

//单击按钮
export function clickFn(e) {
  if (this.props.clickMenu) {
    var $m = e.currentTarget
    this.props.clickMenu($m)
    let $menuLi = document.getElementsByClassName("clickmenu")
    for (let j = 0; j < $menuLi.length; j++) {
      let $m1 = $menuLi[j];
      $m1.style.backgroundColor = ""
    }
    $m.style.backgroundColor = "rgba(250,250,250,0.5)"
    $m.style.borderRadius = "3px"
  }
}
