import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import TUI from '../../utils'
import Actions from "../../actions/index"
import {openLoading} from "../../components/Loading/index"

//图片
import xnzz from "!url!./img/xnzz.png"
import xnzzs from "!url!./img/xnzz-s.png"
import zzjg from "!url!./img/zzjg.png"
import zzjgs from "!url!./img/zzjg-s.png"
import position from "!url!./img/position.png"
import positions from "!url!./img/position-s.png"
import zwwh from "!url!./img/zwwh.png"
import zwwhs from "!url!./img/zwwh-s.png"

class Side extends Component {
  render() {
    const {sideStatus, userId} = this.props

    return (
      <div className={"t-side " + (sideStatus == "0" ? "t-side--open" : "t-side--close") } ref="tSide">
        <div className="t-side_header">TUI</div>
        <ul className="t-side_list" ref="tSideList">
          <li className="tSubSide" data-status = {sideStatus == "0" ? "open" : "close"}>
            <div onClick={this.updateSubStatus} ><Link to={TUI.ROOTPATH}><img src={xnzz} data-src="xnzz"/><span style={{ display: sideStatus == "0" ? "inline" : "none" }}>页面内容布局</span></Link></div>
            <ul className="t-side_sub">
              <li><Link to={TUI.ROOTPATH+"layout1"}>布局1</Link></li>
              <li><Link to={TUI.ROOTPATH+"layout2"}>布局2</Link></li>
              <li><Link to={TUI.ROOTPATH+"layout3"}>布局3</Link></li>
            </ul>
          </li>
          <li className="tSubSide" data-status = {sideStatus == "0" ? "open" : "close"}>
            <div onClick={this.updateSubStatus}><a href="#" style={{ color: "#999" }}><img src={xnzzs} data-src="xnzz"/><span style={{ display: sideStatus == "0" ? "inline" : "none" }}>表单组件</span></a></div>
            <ul className="t-side_sub">
              <li><Link to={TUI.ROOTPATH+"table"}>表格</Link></li>
              <li><Link to={TUI.ROOTPATH+"btn"}>按钮</Link></li>
              <li><Link to={TUI.ROOTPATH+"input"}>输入框</Link></li>
              <li><Link to={TUI.ROOTPATH+"select"}>下拉框</Link></li>
              <li><Link to={TUI.ROOTPATH+"check"}>选择框</Link></li>
              <li><Link to={TUI.ROOTPATH+"tip"}>标签</Link></li>
            </ul>
          </li>
          <li className="tSubSide" data-status = {sideStatus == "0" ? "open" : "close"}>
            <div onClick={this.updateSubStatus}><a href="#" style={{ color: "#999" }}><img src={xnzzs} data-src="xnzz"/><span style={{ display: sideStatus == "0" ? "inline" : "none" }}>常用插件</span></a></div>
            <ul className="t-side_sub">
              <li><Link to={TUI.ROOTPATH+"sidePage"}>SidePage</Link></li>
              <li><Link to={TUI.ROOTPATH+"dialog"}>Dialog</Link></li>
              <li><Link to={TUI.ROOTPATH+"multyMenu"}>MultyMenu</Link></li>
              <li><Link to={TUI.ROOTPATH+"tipTool"}>TipTool</Link></li>
              <li><Link to={TUI.ROOTPATH+"pager"}>Pager</Link></li>
              <li><Link to={TUI.ROOTPATH+"loading"}>Loading</Link></li>
              <li><Link to={TUI.ROOTPATH+"modelDialog"}>ModelDialog</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  //展开/收缩 菜单
  updateSubStatus(e) {
    let subUl = e.currentTarget.nextSibling
    if (subUl) {
      let tSubSide = document.getElementsByClassName("tSubSide")
      for (var index = 0; index < tSubSide.length; index++) {
        var $e = tSubSide[index]

        if ($e.getElementsByTagName("ul").length > 0 && e.currentTarget.parentNode != $e) {
          $e.getElementsByTagName("ul")[0].style.display = "none"
        }
      }

      if (e.currentTarget.parentNode.getAttribute("data-status") == "open") {
        if (!subUl.style.display || subUl.style.display == "none") {
          subUl.style.display = "block"
        }
        else {
          subUl.style.display = "none"
        }
      }
    }
  }

  componentDidMount() {
    let _this = this
    ReactDOM.findDOMNode(this.refs.tSide).style.height = document.documentElement.clientHeight + "px"

    let tSubSide = document.getElementsByClassName("tSubSide")
    for (var index = 0; index < tSubSide.length; index++) {
      //一级菜单
      var s = tSubSide[index];
      s.addEventListener("mouseenter", function (e) {
        if (_this.props.sideStatus == "1") {
          this.parentNode.style.overflow = "visible"
          this.getElementsByTagName("span")[0].style.display = "inline"
          if (this.querySelector(".t-side_sub")) {
            this.querySelector(".t-side_sub").style.display = "block"
          }
          this.style.backgroundColor = "rgba(36,46,63,1)"
          for (let i = 0; i < tSubSide.length; i++) {
            let $s = tSubSide[i]
            if (this!=$s && $s.getAttribute("data-click") == "true") {
              $s.style.backgroundColor = "transparent"
            }
          }
        }
      })

      s.addEventListener("mouseleave", function (e) {
        if (_this.props.sideStatus == "1") {
          this.parentNode.style.overflow = "hidden"
          this.getElementsByTagName("span")[0].style.display = "none"
          if (this.querySelector(".t-side_sub")) {
            this.querySelector(".t-side_sub").style.display = "none"
          }
          this.style.backgroundColor = "transparent"

          //恢复被选中的状态

          for (let i = 0; i < tSubSide.length; i++) {
            let $s = tSubSide[i]
            if ($s.getAttribute("data-click") == "true") {
              $s.style.backgroundColor = "rgba(36,46,63,1)"
            }
          }
        }
      })

      s.addEventListener("click", function () {
        let _tSubSide = document.getElementsByClassName("tSubSide")
        //将菜单中所有的图片和文字都切换成灰色(为选中状态)
        for (let i = 0; i < _tSubSide.length; i++) {
          let img = _tSubSide[i].getElementsByTagName("img")[0].getAttribute("data-src")
          _tSubSide[i].getElementsByTagName("img")[0].setAttribute("src", _this.getImg(img + "s"))
          _tSubSide[i].getElementsByTagName("a")[0].style.color = "#999"
          _tSubSide[i].style.backgroundColor = "transparent"
          _tSubSide[i].setAttribute("data-click", "false")
        }

        let img = this.getElementsByTagName("img")[0].getAttribute("data-src")
        this.getElementsByTagName("img")[0].setAttribute("src", _this.getImg(img))
        this.getElementsByTagName("a")[0].style.color = "white"
        this.style.backgroundColor = "rgba(36,46,63,1)"
        this.setAttribute("data-click", "true")

        // let urlHref = window.location.href
        // let thisHref = this.getElementsByTagName("a")[0].getAttribute("href")
        // if (urlHref.indexOf(thisHref) < 0) {
        //   openLoading()
        // }
      })


      //二级菜单
      let twoSub = s.getElementsByTagName("li")
      for (var j = 0; j < twoSub.length; j++) {
        var $twoSub = twoSub[j]
        $twoSub.addEventListener("mouseenter", function (e) {
          this.style.borderRight = "3px solid #4C86DC"
        })

        $twoSub.addEventListener("mouseleave", function (e) {
          if (this.getAttribute("data-click") != "true") {
            this.style.borderRight = "3px solid transparent"
          }
        })
        $twoSub.addEventListener("click", function () {
          _this.removeSubMenuStatus(twoSub)
          _this.clearSubMenu()
          _this.addSubMenuStatus(this)
        })
      }
    }
  }


  clearSubMenu() {
    let sub_sub = document.getElementsByClassName("t-side_sub")
    for (let m = 0; m < sub_sub.length; m++) {
      let $m = sub_sub[m];
      for (let n = 0; n < $m.getElementsByTagName("li").length; n++) {
        let $n = $m.getElementsByTagName("li")[n];
        this.removeSubMenuStatus($n)
      }
    }
  }

  addSubMenuStatus($obj) {
    $obj.style.borderRight = "3px solid #4C86DC"
    $obj.setAttribute("data-click", "true")
    $obj.style.color = "white"
    if ($obj.getElementsByTagName("a").length > 0) {
      $obj.getElementsByTagName("a")[0].style.color = "white"
    }
  }

  removeSubMenuStatus($obj) {
    for (var k = 0; k < $obj.length; k++) {
      var $twoSub_ = $obj[k]
      $twoSub_.style.borderRight = "3px solid transparent" //二级菜单的右边框
      $twoSub_.setAttribute("data-click", "false")//鼠标移开此元素时,根据此属性判断是否同时移除元素上的其它效果
      $twoSub_.style.color = "#999"
      $twoSub_.getElementsByTagName("a")[0].style.color = "#999"
    }
  }

  getImg(src) {
    switch (src) {
      case "xnzz":
        return xnzz
      case "xnzzs":
        return xnzzs
      case "zzjg":
        return zzjg
      case "zzjgs":
        return zzjgs
      case "position":
        return position
      case "positions":
        return positions
      case "zwwh":
        return zwwh
      case "zwwhs":
        return zwwhs
      default:
        return xnzz
    }
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userId: "publicInfo.userInfo.id"
}, Side)


//菜单示例

// <li onClick={this.updateSubStatus} className="tSubSide" data-status = {sideStatus == "0" ? "open" : "close"}>
//   <img src={xnzz}/><span style={{display:sideStatus == "0" ? "inline" : "none"}}>虚拟组织管理1</span>
//   <ul className="t-side_sub">
//     <li>新增虚拟组织</li>
//     <li>删除虚拟组织</li>
//   </ul>
// </li>