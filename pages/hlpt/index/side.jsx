import Side from 'Side'
import * as config from "config"

//图片
import other from "!url!./img/other.png" //虚拟组织
import others from "!url!./img/other-s.png" //虚拟组织
import zzjg from "!url!./img/zzjg.png"
import zzjgs from "!url!./img/zzjg-s.png"
import position from "!url!./img/position.png"
import positions from "!url!./img/position-s.png"
import rote from "!url!./img/rote.png"
import rotes from "!url!./img/rote-s.png"
import yhwf from "!url!./img/yhwf.png"
import yhwfs from "!url!./img/yhwf-s.png"

class _Side extends React.Component {
  render() {
    const {sideStatus, userId} = this.props

    let list = [{
      name: "组织管理",
      url: "#",
      icon: zzjg,
      sicon: zzjgs,
      sub: [{
        name: "组织架构维护",
        url: config.ROOTPATH + "orgnization"
      }, {
        name: "用户信息维护",
        url: config.ROOTPATH + "userMaintain"
      }]
    }, {
      name: "职位管理",
      url: "#",
      icon: position,
      sicon: positions,
      sub: [{
        name: "数据权限管理",
        url: config.ROOTPATH + "dataPrivileges"
      }]
    }, {
      name: "其它",
      url: "#",
      icon: other,
      sicon: others,
      sub: [{
        name: "虚拟组织管理",
        url: config.ROOTPATH + "vteam"
      }]
    }]

    return (
      <Side list={list} title="" />
    )
  }

  getImg(src) {
    switch (src) {
      case "other":
        return other
      case "others":
        return others
      case "zzjg":
        return zzjg
      case "zzjgs":
        return zzjgs
      case "position":
        return position
      case "positions":
        return positions
      case "rote":
        return rote
      case "rotes":
        return rotes
      case "yhwf":
        return yhwf
      case "yhwfs":
        return yhwfs
      default:
        return other
    }
  }
}

export default TUI._connect({
  sideStatus: "publicInfo.sideStatus",
  userId: "publicInfo.userInfo.id"
}, _Side)